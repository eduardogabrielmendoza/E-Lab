import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado. Iniciá sesión de nuevo.' }, { status: 401 })
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Cloudinary env vars missing:', { cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret })
    return NextResponse.json({ error: 'Cloudinary no está configurado. Revisá las variables de entorno.' }, { status: 500 })
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'e-lab', resource_type: 'auto' },
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
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return NextResponse.json({ error: 'Error al subir imagen: ' + message }, { status: 500 })
  }
}
