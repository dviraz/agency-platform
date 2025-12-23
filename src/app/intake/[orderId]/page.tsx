import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { IntakeForm } from '@/components/intake/intake-form'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

export const metadata = {
  title: 'Complete Your Intake Form',
  description: 'Fill out the intake form to get started with your project',
}

export default async function IntakePage({
  params,
}: {
  params: { orderId: string }
}) {
  const supabase = await createClient()

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/auth/login?redirectTo=/intake/${params.orderId}`)
  }

  // Get intake form data
  const { data: intakeForm, error } = await supabase
    .from('intake_forms')
    .select('*')
    .eq('order_id', params.orderId)
    .eq('user_id', user.id)
    .single()

  if (error || !intakeForm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Intake form not found</h1>
          <p className="text-muted-foreground mb-4">
            This order may not exist or you don't have access to it.
          </p>
          <Link
            href="/dashboard"
            className="text-primary hover:underline"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // If already completed, redirect to dashboard
  if (intakeForm.is_completed) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      <BackgroundBeams className="opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="font-bold text-white text-lg">A</span>
          </div>
          <span className="font-bold text-2xl text-gradient">Agency</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Complete Your Intake Form</h1>
          <p className="text-muted-foreground mt-2">
            Help us understand your project by filling out the form below
          </p>
        </div>

        <IntakeForm
          orderId={params.orderId}
          initialData={intakeForm}
          initialStep={intakeForm.current_step || 1}
        />
      </div>
    </div>
  )
}
