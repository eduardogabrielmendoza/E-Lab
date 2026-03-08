import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'elab-s3cr3t-k3y-pr0duct10n-2026-r4ilw4y'
)

const USERS = [
  { email: 'eduardogabrielm3ndoza@gmail.com', password: '295944599-afacultad' },
  { email: 'admin@e-lab.design', password: 'EL4b-s3cur3!Adm1n' },
  { email: 'manager@e-lab.design', password: 'M4nag3r-EL4b#2026' },
]

export function validateCredentials(email: string, password: string) {
  return USERS.find((u) => u.email === email && u.password === password) ?? null
}

export async function createToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { email: string }
  } catch {
    return null
  }
}

export async function getSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('elab-session')?.value
  if (!token) return null
  return verifyToken(token)
}
