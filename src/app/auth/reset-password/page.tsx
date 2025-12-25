import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your Agency account.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
