import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, getContactFormEmail } from '@/lib/email'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Generate email content
    const emailContent = getContactFormEmail(validatedData)

    // Send email to business
    const result = await sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'dvir@synergyx.pro',
      subject: emailContent.subject,
      html: emailContent.html,
    })

    if (!result.success) {
      throw new Error('Failed to send email')
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.'
      },
      { status: 500 }
    )
  }
}
