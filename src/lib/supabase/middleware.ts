import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type RateLimitEntry = {
  count: number
  resetAt: number
}

const AUTH_RATE_LIMIT = {
  windowMs: 10 * 60 * 1000,
  max: 30,
}

const authRateLimitMap =
  (globalThis as { __authRateLimitMap?: Map<string, RateLimitEntry> })
    .__authRateLimitMap ?? new Map<string, RateLimitEntry>()

;(globalThis as { __authRateLimitMap?: Map<string, RateLimitEntry> })
  .__authRateLimitMap = authRateLimitMap

function checkAuthRateLimit(key: string) {
  const now = Date.now()
  const entry = authRateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    authRateLimitMap.set(key, { count: 1, resetAt: now + AUTH_RATE_LIMIT.windowMs })
    return { limited: false }
  }

  if (entry.count >= AUTH_RATE_LIMIT.max) {
    return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count += 1
  authRateLimitMap.set(key, entry)
  return { limited: false }
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith('/auth') &&
    !pathname.startsWith('/auth/callback') &&
    !pathname.startsWith('/auth/signout')
  ) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.ip ||
      'unknown'
    const key = `${ip}:${pathname}`
    const { limited, retryAfter } = checkAuthRateLimit(key)

    if (limited) {
      return new NextResponse('Too many requests. Please try again later.', {
        status: 429,
        headers: retryAfter ? { 'Retry-After': String(retryAfter) } : undefined,
      })
    }
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make your application
  // vulnerable to security issues.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/dashboard', '/checkout', '/intake', '/admin']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    // Redirect to login with return URL
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect logged-in users away from auth pages
  const authPaths = ['/auth/login', '/auth/signup']
  const isAuthPath = authPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
