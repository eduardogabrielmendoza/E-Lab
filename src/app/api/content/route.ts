import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { getSession } from '@/lib/auth'

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), 'src', 'content')
const PERSISTENT_DIR = path.join(process.cwd(), 'data', 'content')

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file || !ALLOWED_FILES.includes(file)) {
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

  if (!file || !ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: 'Archivo no válido' }, { status: 400 })
  }

  try {
    ensurePersistentDir()
    const body = await request.json()
    const filePath = path.join(PERSISTENT_DIR, file)
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }
}
