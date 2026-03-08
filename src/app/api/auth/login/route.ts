import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 })
  }

  const user = validateCredentials(email, password)
  if (!user) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
  }

  const token = await createToken(user.email)

  const response = NextResponse.json({ success: true, email: user.email })
  response.cookies.set('elab-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/',
  })

  return response
}
