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
  const safe = String(text ?? '')
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return safe.replace(/[&<>"']/g, (m) => map[m])
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

    // Compact phone display: prefix with +<countryCode>- if provided, else show raw phone
    const normalizedCountryCode = countryCode ? String(countryCode).replace(/^\+?/, '') : ''
    const phoneDisplay = normalizedCountryCode ? `+${normalizedCountryCode}-${String(phone)}` : String(phone)

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

    // Build products table HTML (compact rows)
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
        <td style="text-align:right;">
          <span class="quantity">${product.quantity && product.unit ? `${escapeHtml(product.quantity)} ${escapeHtml(product.unit)}` : '—'}</span>
        </td>
      </tr>
    `
      )
      .join('')

    // Email content - compact and minimal CSS so more info fits in less space
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            /* Compact / minimal email styling */
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 13px; margin: 0; padding: 0; background: #fff; color: #111827; }
            .container { max-width: 680px; margin: 8px auto; border: 1px solid #e6e6e6; border-radius: 6px; overflow: hidden; }
            .header { background: #2D7A6B; color: #fff; padding: 8px 12px; }
            .header h2 { margin: 0; font-size: 14px; font-weight: 600; }
            .header p { margin: 2px 0 0; font-size: 12px; opacity: 0.85; }
            .content { padding: 10px 12px; }

            .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; align-items: start; }
            .contact-item { display: flex; flex-direction: column; }
            .contact-label { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; font-weight: 600; }
            .contact-value { font-size: 13px; color: #111827; font-weight: 600; }

            .section { margin-top: 10px; }
            .section-title { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 8px; }

            .products-table { width: 100%; border-collapse: collapse; font-size: 12px; }
            .products-table th { text-align: left; font-size: 11px; color: #374151; padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-transform: uppercase; }
            .products-table td { padding: 8px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
            .product-name { font-weight: 700; font-size: 13px; }
            .product-cas { font-size: 11px; color: #6b7280; font-family: 'Monaco', 'Courier New', monospace; }
            .category-badge { display: inline-block; background: #f3f4f6; padding: 3px 6px; border-radius: 4px; font-size: 11px; color: #374151; font-weight: 600; }
            .quantity { font-weight: 600; }

            .message-box { background: #fafafa; padding: 8px; border-left: 3px solid #2D7A6B; border-radius: 4px; font-size: 13px; white-space: pre-wrap; margin-top: 6px; }

            .footer { margin-top: 10px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; }

            /* Responsive fallback for narrow email clients */
            @media (max-width: 480px) {
              .contact-grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>RFQ</h2>
              <p>${escapeHtml(company)}</p>
            </div>

            <div class="content">
              <!-- Contact Information (compact) - city comes before country -->
              <div class="section">
                <div class="section-title">Contact • <span style="font-weight:600">${products.length} ${products.length === 1 ? 'Product' : 'Products'}</span></div>
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
                    <span class="contact-label">City</span>
                    <span class="contact-value">${escapeHtml(city)}</span>
                  </div>

                  <div class="contact-item">
                    <span class="contact-label">Country</span>
                    <span class="contact-value">${escapeHtml(country)}</span>
                  </div>

                  <div class="contact-item">
                    <span class="contact-label">Phone</span>
                    <span class="contact-value">${escapeHtml(phoneDisplay)}</span>
                  </div>
                </div>
              </div>

              <!-- Products Requested -->
              <div class="section">
                <div class="section-title">Products</div>
                <table class="products-table">
                  <thead>
                    <tr>
                      <th style="width:55%">Product</th>
                      <th style="width:25%">Category</th>
                      <th style="width:20%; text-align:right">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productsTableRows}
                  </tbody>
                </table>
              </div>

              ${message ? `
              <div class="section">
                <div class="section-title">Additional Requirements</div>
                <div class="message-box">${escapeHtml(message)}</div>
              </div>
              ` : ''}

              <div class="footer">
                <p>Request for Quote • ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Plain text version (compact)
    const emailText = `New Quote Request - Covenants PharmaChem LLP\n\nCONTACT\nName: ${name} | Email: ${email} | Company: ${company}\nPhone: ${phoneDisplay} | City: ${city} | Country: ${country}\n\nPRODUCTS (${products.length})\n${products
      .map(
        (p, idx) => `${idx + 1}. ${p.name} (CAS: ${p.casNumber}) - ${categoryLabels[p.category] || p.category} - ${p.quantity && p.unit ? `${p.quantity} ${p.unit}` : 'Qty: —'}`
      )
      .join('\n')}
${message ? `\nREQUIREMENTS\n${message}\n` : ''}\n${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}`

    // Send email
    const mailOptions = {
      from: `"Covenants Website" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL,
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
