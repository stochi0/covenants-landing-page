import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  country: string
  company: string
  phone: string
  lookingFor: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, country, company, phone, lookingFor, message } = body

    // Validate required fields
    if (!name || !email || !country || !company || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; margin-bottom: 5px; display: block; }
            .value { color: #333; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid #667eea; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Partner Inquiry</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Covenants PharmaChem LLP</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">Company:</span>
                <div class="value">${company}</div>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <span class="label">Country:</span>
                <div class="value">${country}</div>
              </div>
              <div class="field">
                <span class="label">Looking For:</span>
                <div class="value">${lookingForLabel}</div>
              </div>
              ${message ? `
              <div class="field">
                <span class="label">Message:</span>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              ` : ''}
              <div class="footer">
                <p>This email was sent from the Partner With Us form on the Covenants PharmaChem website.</p>
                <p>Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const emailText = `
New Partner Inquiry - Covenants PharmaChem LLP

Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}
Country: ${country}
Looking For: ${lookingForLabel}
${message ? `Message: ${message}` : ''}

Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}
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
