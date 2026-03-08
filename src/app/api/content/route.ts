import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { getSession } from '@/lib/auth'

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), 'src', 'content')
const PERSISTENT_DIR = path.join(process.cwd(), 'data', 'content')

const MAX_BODY_SIZE = 512 * 1024 // 512KB max for content JSON

function ensurePersistentDir() {
  if (!existsSync(PERSISTENT_DIR)) {
    mkdirSync(PERSISTENT_DIR, { recursive: true })
  }
}

function ensureFile(file: string) {
  const persistentPath = path.join(PERSISTENT_DIR, file)
  if (!existsSync(persistentPath)) {
    const defaultPath = path.join(DEFAULT_CONTENT_DIR, file)
    if (existsSync(defaultPath)) {
      copyFileSync(defaultPath, persistentPath)
    }
  }
}

const ALLOWED_FILES = [
  'layout.json',
  'home.json',
  'categories.json',
  'contact.json',
  'order.json',
  'portfolio.json',
]

// Strict validation: only alphanumeric, dashes, dots, and must end in .json
function isValidFileName(file: string): boolean {
  return /^[a-zA-Z0-9_-]+\.json$/.test(file) && ALLOWED_FILES.includes(file)
}

// Verify resolved path is within the expected directory (prevent path traversal)
function isSafePath(file: string, baseDir: string): boolean {
  const resolved = path.resolve(baseDir, file)
  return resolved.startsWith(path.resolve(baseDir) + path.sep)
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file || !isValidFileName(file) || !isSafePath(file, PERSISTENT_DIR)) {
    return NextResponse.json({ error: 'Archivo no válido' }, { status: 400 })
  }

  try {
    ensurePersistentDir()
    ensureFile(file)
    const filePath = path.join(PERSISTENT_DIR, file)
    const content = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(content))
  } catch {
    return NextResponse.json({ error: 'Error al leer archivo' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file || !isValidFileName(file) || !isSafePath(file, PERSISTENT_DIR)) {
    return NextResponse.json({ error: 'Archivo no válido' }, { status: 400 })
  }

  try {
    // Check Content-Length before reading body
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Contenido demasiado grande' }, { status: 413 })
    }

    ensurePersistentDir()
    const body = await request.json()

    // Validate it's a plain object or array (not null, not primitive)
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Formato de datos inválido' }, { status: 400 })
    }

    const serialized = JSON.stringify(body, null, 2)

    // Double-check size after serialization
    if (Buffer.byteLength(serialized, 'utf-8') > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Contenido demasiado grande' }, { status: 413 })
    }

    const filePath = path.join(PERSISTENT_DIR, file)
    await fs.writeFile(filePath, serialized, 'utf-8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }
}
