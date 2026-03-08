import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getSession } from '@/lib/auth'

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content')

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
    const filePath = path.join(CONTENT_DIR, file)
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
    const body = await request.json()
    const filePath = path.join(CONTENT_DIR, file)
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }
}
