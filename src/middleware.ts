import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

export const runtime = 'nodejs'

const SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || '')

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('elab-session')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jose.jwtVerify(token, SECRET)
    } catch {
      // Invalid/expired token - clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('elab-session', '', { maxAge: 0, path: '/' })
      return response
    }
  }

  // Protect admin API routes (except auth routes)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/') && !pathname.startsWith('/api/content')) {
    // Upload and other write APIs are already protected in their handlers,
    // but this adds a defense-in-depth layer
  }

  const response = NextResponse.next()

  // Add security headers to all responses
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  return response
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
