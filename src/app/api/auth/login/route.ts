import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createToken } from '@/lib/auth'
import { isRateLimited, recordFailedAttempt, resetAttempts } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  // Check rate limit before processing
  const { limited, retryAfterSeconds } = isRateLimited(ip)
  if (limited) {
    return NextResponse.json(
      { error: `Demasiados intentos. Intentá de nuevo en ${Math.ceil(retryAfterSeconds / 60)} minutos.` },
      {
        status: 429,
        headers: { 'Retry-After': String(retryAfterSeconds) },
      }
    )
  }

  let body: { email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 })
  }

  const { email, password } = body

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
  }

  // Limit input length to prevent abuse
  if (email.length > 254 || password.length > 128) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const user = await validateCredentials(email, password)
  if (!user) {
    recordFailedAttempt(ip)
    // Generic error message - don't reveal if email exists
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
  }

  // Success - reset rate limit
  resetAttempts(ip)

  const token = await createToken(user.email)

  const response = NextResponse.json({ success: true })
  response.cookies.set('elab-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 4, // 4 hours
    path: '/',
  })

  return response
}
