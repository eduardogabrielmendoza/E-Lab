/**
 * In-memory rate limiter for login attempts.
 * Tracks failed attempts by IP and locks out after threshold.
 */

interface RateLimitEntry {
  attempts: number
  lastAttempt: number
  lockedUntil: number
}

const store = new Map<string, RateLimitEntry>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000     // 15 minutes window
const LOCKOUT_MS = 15 * 60 * 1000    // 15 minutes lockout after max attempts

// Clean up old entries every 30 minutes
setInterval(() => {
  const now = Date.now()
  store.forEach((entry, key) => {
    if (now - entry.lastAttempt > WINDOW_MS && now > entry.lockedUntil) {
      store.delete(key)
    }
  })
}, 30 * 60 * 1000)

export function isRateLimited(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const entry = store.get(ip)
  if (!entry) return { limited: false, retryAfterSeconds: 0 }

  const now = Date.now()

  // Check if currently locked out
  if (entry.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.lockedUntil - now) / 1000)
    return { limited: true, retryAfterSeconds }
  }

  // Reset if window expired
  if (now - entry.lastAttempt > WINDOW_MS) {
    store.delete(ip)
    return { limited: false, retryAfterSeconds: 0 }
  }

  return { limited: false, retryAfterSeconds: 0 }
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now()
  const entry = store.get(ip) || { attempts: 0, lastAttempt: now, lockedUntil: 0 }

  // Reset if window expired
  if (now - entry.lastAttempt > WINDOW_MS) {
    entry.attempts = 0
  }

  entry.attempts++
  entry.lastAttempt = now

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_MS
  }

  store.set(ip, entry)
}

export function resetAttempts(ip: string): void {
  store.delete(ip)
}
