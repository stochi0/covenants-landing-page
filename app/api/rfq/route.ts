import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ProductQuantity {
  productId: string
  quantity: string
  unit: string
}

interface RFQProduct {
  id: string
  name: string
  casNumber: string
  category: 'api' | 'impurity' | 'intermediate' | 'chemical'
  quantity?: string
  unit?: string
}

interface RFQFormData {
  name: string
  email: string
  company: string
  phone: string
  country: string
  message: string
  products: RFQProduct[]
}

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
    const body: RFQFormData = await request.json()
    const { name, email, company, phone, country, message = '', products } = body

    // Validate required fields
    if (!name || !email || !company || !phone || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'No products selected' },
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
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; border-right: 1px solid #e5e7eb;">
          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${escapeHtml(product.name)}</div>
          <div style="font-size: 12px; color: #6b7280; font-family: monospace;">CAS: ${escapeHtml(product.casNumber)}</div>
        </td>
        <td style="padding: 12px; border-right: 1px solid #e5e7eb; text-align: center;">
          <span style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #374151;">
            ${escapeHtml(categoryLabels[product.category] || product.category)}
          </span>
        </td>
        <td style="padding: 12px; text-align: center; color: #1f2937; font-weight: 500;">
          ${product.quantity && product.unit ? `${escapeHtml(product.quantity)} ${escapeHtml(product.unit)}` : 'Not specified'}
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #667eea; }
            .field { margin-bottom: 15px; }
            .label { font-weight: 600; color: #555; margin-bottom: 5px; display: block; font-size: 14px; }
            .value { color: #333; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #667eea; }
            .products-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .products-table th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #e5e7eb; }
            .footer { margin-top: 25px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
            .badge { display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; font-size: 24px;">New Quote Request</h2>
              <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Covenants PharmaChem LLP</p>
            </div>
            <div class="content">
              <!-- Contact Information -->
              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="field">
                  <span class="label">Name:</span>
                  <div class="value">${escapeHtml(name)}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${escapeHtml(email)}</div>
                </div>
                <div class="field">
                  <span class="label">Company:</span>
                  <div class="value">${escapeHtml(company)}</div>
                </div>
                <div class="field">
                  <span class="label">Phone:</span>
                  <div class="value">${escapeHtml(phone)}</div>
                </div>
                <div class="field">
                  <span class="label">Country:</span>
                  <div class="value">${escapeHtml(country)}</div>
                </div>
              </div>

              <!-- Products Requested -->
              <div class="section">
                <div class="section-title">
                  Products Requested 
                  <span class="badge">${products.length} ${products.length === 1 ? 'Product' : 'Products'}</span>
                </div>
                <table class="products-table">
                  <thead>
                    <tr>
                      <th style="width: 45%;">Product Name</th>
                      <th style="width: 25%; text-align: center;">Category</th>
                      <th style="width: 30%; text-align: center;">Quantity</th>
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
                <div class="value" style="white-space: pre-wrap;">${escapeHtml(message)}</div>
              </div>
              ` : ''}

              <div class="footer">
                <p>This email was sent from the Request for Quote form on the Covenants PharmaChem website.</p>
                <p>Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    // Plain text version
    const emailText = `
New Quote Request - Covenants PharmaChem LLP

CONTACT INFORMATION
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}
Country: ${country}

PRODUCTS REQUESTED (${products.length} ${products.length === 1 ? 'Product' : 'Products'})
${products
  .map(
    (p, idx) => `
${idx + 1}. ${p.name}
   CAS: ${p.casNumber}
   Category: ${categoryLabels[p.category] || p.category}
   Quantity: ${p.quantity && p.unit ? `${p.quantity} ${p.unit}` : 'Not specified'}
`
  )
  .join('')}
${message ? `\nADDITIONAL REQUIREMENTS\n${message}\n` : ''}

Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
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
