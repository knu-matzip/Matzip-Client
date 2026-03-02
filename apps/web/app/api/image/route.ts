import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

/**
 * 이미지 최적화 API Route
 * - 긴 URL (255자 초과) 처리 - Cloudinary public_id 제한 우회
 * - WebP 변환 및 리사이징 제공
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')
    const width = searchParams.get('w')
    const quality = searchParams.get('q')

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Missing url parameter' },
        { status: 400 },
      )
    }

    const decodedUrl = decodeURIComponent(imageUrl)

    // 적절한 헤더로 이미지 가져오기
    const imageResponse = await fetch(decodedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
    })

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.statusText}` },
        { status: imageResponse.status },
      )
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())

    // Sharp 변환
    let transformer = sharp(imageBuffer)

    // width가 지정된 경우 리사이즈
    if (width) {
      const widthNum = parseInt(width, 10)
      if (!isNaN(widthNum) && widthNum > 0) {
        transformer = transformer.resize(widthNum, null, {
          withoutEnlargement: true, // 확대 안 함
          fit: 'inside',
        })
      }
    }

    // WebP로 변환 (quality 적용)
    const qualityNum = quality ? parseInt(quality, 10) : 75
    const optimizedBuffer = await transformer
      .webp({
        quality: qualityNum,
        effort: 4, // 0-6, 높을수록 압축률 좋지만 느림
      })
      .toBuffer()

    // 최적화된 이미지 반환
    return new NextResponse(optimizedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Image optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 },
    )
  }
}
