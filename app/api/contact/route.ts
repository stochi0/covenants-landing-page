import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactFormSchema } from '@/lib/validation'

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
    const validationResult = contactFormSchema.safeParse(body)

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

    const { name, email, country, countryCode, city, company, phone, lookingFor, message } = validationResult.data

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
      console.error('Missing SMTP configuration')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport(smtpConfig)

    // Email content
    const lookingForLabel = lookingFor
      ? lookingFor
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : 'Not specified'

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 13px; margin: 0; padding: 0; background: #fff; color: #111827; }
            .container { max-width: 680px; margin: 8px auto; border: 1px solid #e6e6e6; border-radius: 6px; overflow: hidden; }
            .header { background: #2D7A6B; color: #fff; padding: 8px 12px; }
            .header h2 { margin: 0; font-size: 14px; font-weight: 600; }
            .header p { margin: 2px 0 0; font-size: 12px; opacity: 0.85; }
            .content { padding: 10px 12px; }
            .section { margin-top: 10px; }
            .section-title { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 8px; }
            .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; align-items: start; }
            .contact-item { display: flex; flex-direction: column; }
            .contact-label { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; font-weight: 600; }
            .contact-value { font-size: 13px; color: #111827; font-weight: 600; }
            .message-box { background: #fafafa; padding: 8px; border-left: 3px solid #2D7A6B; border-radius: 4px; font-size: 13px; white-space: pre-wrap; margin-top: 6px; }
            .footer { margin-top: 10px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Partner Inquiry</h2>
              <p>Covenants PharmaChem LLP</p>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Contact</div>
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
                  <div class="contact-item">
                    <span class="contact-label">Looking For</span>
                    <span class="contact-value">${escapeHtml(lookingForLabel)}</span>
                  </div>
                </div>
              </div>
              ${message ? `
              <div class="section">
                <div class="section-title">Message</div>
                <div class="message-box">${escapeHtml(message)}</div>
              </div>
              ` : ''}
              <div class="footer">
                <p>Connect With Us form • ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const emailText = `
New Partner Inquiry - Covenants PharmaChem LLP

CONTACT
Name: ${name} | Email: ${email} | Company: ${company}
Phone: ${phoneDisplay} | City: ${city} | Country: ${country} | Looking For: ${lookingForLabel}
${message ? `\nMESSAGE\n${message}\n` : ''}

${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'short', timeStyle: 'short' })}
    `.trim()

    // Send email
    const mailOptions = {
      from: `"Covenants Website" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL, // Send to the same email (or configure a different recipient)
      replyTo: email,
      subject: `New Partner Inquiry from ${name} - ${company}`,
      text: emailText,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
