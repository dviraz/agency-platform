'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthFormProps {
  mode: 'login' | 'signup'
  redirectTo?: string
}

/**
 * Validate that a redirect URL is safe (internal only)
 * Prevents open redirect vulnerabilities
 */
function getSafeRedirectUrl(url?: string): string {
  const defaultUrl = '/dashboard'

  if (!url) return defaultUrl

  // Must start with single forward slash and not be protocol-relative
  if (!url.startsWith('/') || url.startsWith('//')) {
    return defaultUrl
  }

  // Additional check: ensure no protocol in the URL
  if (url.includes('://')) {
    return defaultUrl
  }

  return url
}

export function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  // Validate redirectTo to prevent open redirect attacks
  const safeRedirectTo = getSafeRedirectUrl(redirectTo)

  const isLogin = mode === 'login'
  const schema = isLogin ? loginSchema : signupSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    setIsLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) throw error

        toast.success('Welcome back!')
        router.push(safeRedirectTo)
        router.refresh()
      } else {
        const signupData = data as SignupFormData
        const { error } = await supabase.auth.signUp({
          email: signupData.email,
          password: signupData.password,
          options: {
            data: {
              full_name: signupData.fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        toast.success('Check your email to confirm your account!')
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isLogin
            ? 'Enter your credentials to access your dashboard'
            : 'Start your journey with us today'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="John Doe"
                className="pl-10"
                aria-describedby={(errors as any).fullName ? 'fullName-error' : undefined}
                aria-invalid={!!(errors as any).fullName}
                {...register('fullName' as keyof (LoginFormData | SignupFormData))}
              />
            </div>
            {(errors as any).fullName && (
              <p id="fullName-error" className="text-sm text-destructive">
                {(errors as any).fullName.message}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p id="password-error" className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>
        {isLogin && (
          <div className="text-right text-sm">
            <Link href="/auth/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        )}

        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="pl-10"
                aria-describedby={(errors as any).confirmPassword ? 'confirmPassword-error' : undefined}
                aria-invalid={!!(errors as any).confirmPassword}
                {...register('confirmPassword' as keyof (LoginFormData | SignupFormData))}
              />
            </div>
            {(errors as any).confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-destructive">
                {(errors as any).confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

