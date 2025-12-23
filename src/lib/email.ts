import nodemailer from 'nodemailer'

// Create reusable transporter using Hostinger SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Agency" <noreply@agency.com>',
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      html,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}

// Email templates
export function getPaymentConfirmationEmail(data: {
  customerName: string
  productName: string
  amount: number
  orderId: string
}) {
  const { customerName, productName, amount, orderId } = data

  return {
    subject: `Payment Confirmed - ${productName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Confirmed</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #fafafa; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #171717; border-radius: 12px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: #fafafa; font-size: 24px; margin-bottom: 20px;">Payment Confirmed! 🎉</h1>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
              Hi ${customerName},
            </p>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
              Thank you for your purchase! Your payment has been successfully processed.
            </p>

            <div style="background-color: #262626; border-radius: 8px; padding: 20px; margin: 30px 0;">
              <h2 style="color: #fafafa; font-size: 18px; margin-bottom: 15px;">Order Details</h2>
              <p style="color: #a1a1aa; margin: 8px 0;"><strong>Product:</strong> ${productName}</p>
              <p style="color: #a1a1aa; margin: 8px 0;"><strong>Amount:</strong> $${amount.toLocaleString()} USD</p>
              <p style="color: #a1a1aa; margin: 8px 0;"><strong>Order ID:</strong> ${orderId}</p>
            </div>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
              <strong>Next Step:</strong> Please complete the intake form so we can get started on your project.
            </p>

            <a href="${process.env.NEXT_PUBLIC_APP_URL}/intake/${orderId}"
               style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px;">
              Complete Intake Form
            </a>

            <p style="color: #71717a; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
              If you have any questions, please don't hesitate to reach out to our team.
            </p>
          </div>
        </body>
      </html>
    `,
  }
}

export function getProjectUpdateEmail(data: {
  customerName: string
  projectName: string
  updateTitle: string
  updateDescription: string
}) {
  const { customerName, projectName, updateTitle, updateDescription } = data

  return {
    subject: `Project Update - ${projectName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #fafafa; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #171717; border-radius: 12px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: #fafafa; font-size: 24px; margin-bottom: 20px;">Project Update</h1>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
              Hi ${customerName},
            </p>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
              There's an update on your project: <strong>${projectName}</strong>
            </p>

            <div style="background-color: #262626; border-radius: 8px; padding: 20px; margin: 30px 0;">
              <h2 style="color: #fafafa; font-size: 18px; margin-bottom: 15px;">${updateTitle}</h2>
              <p style="color: #a1a1aa; line-height: 1.6;">${updateDescription}</p>
            </div>

            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
               style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px;">
              View in Dashboard
            </a>
          </div>
        </body>
      </html>
    `,
  }
}
