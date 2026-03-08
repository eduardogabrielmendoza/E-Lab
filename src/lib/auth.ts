import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

function getSecret() {
  const key = process.env.NEXTAUTH_SECRET
  if (!key) throw new Error('NEXTAUTH_SECRET environment variable is required')
  return new TextEncoder().encode(key)
}

// Pre-hashed passwords. To add/change users, generate hash with:
//   node -e "require('bcryptjs').hash('yourpassword',12).then(h=>console.log(h))"
// Then set in env: ADMIN_USERS=email1:hash1,email2:hash2
const DEFAULT_USERS = [
  { email: 'eduardogabrielm3ndoza@gmail.com', hash: '$2b$12$dcadAhDbO9R1Rk2tVqx.pOFOn6.L7I8cZP3pFdlcy9LJL3vjABCtG' },
  { email: 'admin@e-lab.design', hash: '$2b$12$QcU4CzdpDm33F8zKBk/Coe/vmWVCV18wBLmENi32s7jjBCk23TZCu' },
  { email: 'manager@e-lab.design', hash: '$2b$12$RCYoDwg.bNWcyOrXKTzYA..t8QXMuT6og97YKlyymdg1l71slBw5S' },
]

function getUsers() {
  const envUsers = process.env.ADMIN_USERS
  if (envUsers) {
    return envUsers.split(',').map((entry) => {
      const [email, hash] = entry.split(':')
      return { email: email.trim(), hash: hash.trim() }
    })
  }
  return DEFAULT_USERS
}

export async function validateCredentials(email: string, password: string) {
  const users = getUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  // Always run bcrypt.compare even if user not found (prevents timing attacks)
  const hashToCheck = user?.hash || '$2a$12$invalid.hash.to.prevent.timing.attacks.placeholder'
  const valid = await bcrypt.compare(password, hashToCheck)

  if (!user || !valid) return null
  return { email: user.email }
}

export async function createToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('4h')
    .setIssuedAt()
    .sign(getSecret())
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret())
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
