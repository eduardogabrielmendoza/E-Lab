import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado. Iniciá sesión de nuevo.' }, { status: 401 })
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Cloudinary env vars missing')
    return NextResponse.json({ error: 'Cloudinary no está configurado.' }, { status: 500 })
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, WebP, SVG, GIF).' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 10MB.' },
        { status: 413 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'e-lab', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result as Record<string, unknown>)
          }
        )
        .end(buffer)
    })

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 })
  }
}
