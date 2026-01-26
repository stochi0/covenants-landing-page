import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { rfqFormSchema, rfqProductSchema } from '@/lib/validation'

const categoryLabels: Record<string, string> = {
  api: 'API',
  impurity: 'Impurity',
  intermediate: 'Intermediate',
  chemical: 'Chemical',
}

// HTML escape function to prevent XSS and formatting issues
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the entire request body with Zod
    const validationResult = rfqFormSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))

      // Format error message for better UX
      const fieldErrors = errors.map((e) => e.field).join(', ')
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: `The following fields have errors: ${fieldErrors}`,
          errors,
        },
        { status: 400 }
      )
    }

    const { name, email, company, phone, country, countryCode, city, message = '', products } = validationResult.data

    // Validate each product individually
    const productValidationErrors: string[] = []
    products.forEach((product, index) => {
      const productResult = rfqProductSchema.safeParse(product)
      if (!productResult.success) {
        productValidationErrors.push(
          `Product ${index + 1} (${product.name || 'Unknown'}): ${productResult.error.issues[0]?.message || 'Invalid product data'}`
        )
      }
    })

    if (productValidationErrors.length > 0) {
      return NextResponse.json(
        {
          error: 'Invalid product data',
          details: productValidationErrors.join('; '),
        },
        { status: 400 }
      )
    }

    // Get SMTP configuration from environment variables
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
    const smtpConfig = {
      host: process.env.SMTP_SERVER,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      requireTLS: smtpPort === 587, // Office 365 requires TLS on port 587
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    }

    if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport(smtpConfig)

    // Build products table HTML with proper escaping
    const productsTableRows = products
      .map(
        (product) => `
      <tr>
        <td>
          <div class="product-name">${escapeHtml(product.name)}</div>
          <div class="product-cas">CAS: ${escapeHtml(product.casNumber)}</div>
        </td>
        <td>
          <span class="category-badge">${escapeHtml(categoryLabels[product.category] || product.category)}</span>
        </td>
        <td>
          <span class="quantity">${product.quantity && product.unit ? `${escapeHtml(product.quantity)} ${escapeHtml(product.unit)}` : '—'}</span>
        </td>
      </tr>
    `
      )
      .join('')

    // Email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.5; color: #1f2937; margin: 0; padding: 0; background: #f3f4f6; }
            .container { max-width: 600px; margin: 16px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 20px; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 600; }
            .header p { margin: 4px 0 0 0; opacity: 0.95; font-size: 13px; }
            .content { padding: 16px 20px; }
            .section { margin-bottom: 16px; }
            .section-title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; }
            .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; margin-bottom: 12px; }
            .contact-item { display: flex; flex-direction: column; }
            .contact-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; font-weight: 600; }
            .contact-value { font-size: 14px; color: #1f2937; font-weight: 500; }
            .products-table { width: 100%; border-collapse: collapse; background: white; font-size: 13px; margin-top: 8px; }
            .products-table th { background: #f9fafb; padding: 8px 10px; text-align: left; font-weight: 600; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e5e7eb; }
            .products-table td { padding: 10px; border-bottom: 1px solid #f3f4f6; }
            .products-table tr:last-child td { border-bottom: none; }
            .product-name { font-weight: 600; color: #1f2937; margin-bottom: 3px; }
            .product-cas { font-size: 11px; color: #6b7280; font-family: 'Monaco', 'Courier New', monospace; }
            .category-badge { display: inline-block; background: #f3f4f6; padding: 3px 8px; border-radius: 4px; font-size: 11px; color: #374151; font-weight: 500; }
            .quantity { color: #1f2937; font-weight: 500; }
            .message-box { background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 3px solid #667eea; font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: #374151; margin-top: 8px; }
            .footer { margin-top: 16px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; }
            .badge { display: inline-block; background: #667eea; color: white; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 500; margin-left: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>RFQ</h2>
              <p>${company}</p>
            </div>
            <div class="content">
              <!-- Contact Information -->
              <div class="section">
                <div class="section-title">Contact<span class="badge">${products.length} ${products.length === 1 ? 'Product' : 'Products'}</span></div>
                <div class="contact-grid">
                  <div class="contact-item">
                    <span class="contact-label">Name</span>
                    <span class="contact-value">${escapeHtml(name)}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">Email</span>
                    <span class="contact-value">${escapeHtml(email)}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">Company</span>
                    <span class="contact-value">${escapeHtml(company)}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">Phone</span>
                    <span class="contact-value">${countryCode ? `${escapeHtml(countryCode)} ` : ''}${escapeHtml(phone)}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">Country</span>
                    <span class="contact-value">${escapeHtml(country)}</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">City</span>
                    <span class="contact-value">${escapeHtml(city)}</span>
                  </div>
                  ${countryCode ? `
                  <div class="contact-item">
                    <span class="contact-label">Country Code</span>
                    <span class="contact-value">${escapeHtml(countryCode)}</span>
                  </div>
                  ` : ''}
                </div>
              </div>

              <!-- Products Requested -->
              <div class="section">
                <div class="section-title">Products</div>
                <table class="products-table">
                  <thead>
                    <tr>
                      <th style="width: 50%;">Product</th>
                      <th style="width: 25%;">Category</th>
                      <th style="width: 25%;">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productsTableRows}
                  </tbody>
                </table>
              </div>

              ${message ? `
              <!-- Additional Requirements -->
              <div class="section">
                <div class="section-title">Additional Requirements</div>
                <div class="message-box">${escapeHtml(message)}</div>
              </div>
              ` : ''}

              <div class="footer">
                <p>Request for Quote form • ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Plain text version
    const emailText = `
New Quote Request - Covenants PharmaChem LLP

CONTACT
Name: ${name} | Email: ${email} | Company: ${company}
Phone: ${countryCode ? `${countryCode} ` : ''}${phone} | Country: ${country} | City: ${city}
${countryCode ? `Country Code: ${countryCode}` : ''}

PRODUCTS (${products.length})
${products
  .map(
    (p, idx) => `${idx + 1}. ${p.name} (CAS: ${p.casNumber}) - ${categoryLabels[p.category] || p.category} - ${p.quantity && p.unit ? `${p.quantity} ${p.unit}` : 'Qty: —'}`
  )
  .join('\n')}
${message ? `\nREQUIREMENTS\n${message}\n` : ''}

${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}
    `.trim()

    // Send email
    const mailOptions = {
      from: `"Covenants Website" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL, // Send to the same email (or configure a different recipient)
      replyTo: email,
      subject: `New Quote Request from ${name} - ${company} (${products.length} ${products.length === 1 ? 'Product' : 'Products'})`,
      text: emailText,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'RFQ email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to send RFQ email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
