import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'
import { BackgroundBeams } from '@/components/aceternity/background-beams'

export const metadata = {
  title: 'Sign Up',
  description: 'Create your Agency account to get started with premium digital marketing services.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundBeams className="opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-6 py-12">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="font-bold text-white text-lg">A</span>
          </div>
          <span className="font-bold text-2xl text-gradient">Agency</span>
        </Link>

        {/* Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <AuthForm mode="signup" />
        </div>
      </div>
    </div>
  )
}
