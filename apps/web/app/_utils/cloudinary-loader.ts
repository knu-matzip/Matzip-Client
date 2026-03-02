import type { ImageLoaderProps } from 'next/image'

/**
 * Cloudinary Image Loader for Next.js
 * @see https://cloudinary.com/documentation/transformation_reference
 */

// Cloudinary public_id 길이 제한
const MAX_PUBLIC_ID_LENGTH = 255

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set')
    return src
  }

  // 외부 URL인 경우
  if (src.startsWith('http://') || src.startsWith('https://')) {
    // URL 길이 체크 (Cloudinary public_id 제한)
    const urlLength = src.length
    const isTooLong = urlLength > MAX_PUBLIC_ID_LENGTH

    // URL이 너무 긴 경우 → API 프록시 사용
    if (isTooLong) {
      const encodedUrl = encodeURIComponent(src)
      return `/api/image?url=${encodedUrl}&w=${width}&q=${quality || 75}`
    }

    // 짧은 URL → Cloudinary fetch 사용
    const params = [
      'f_webp', // WebP 포맷 강제
      'c_limit', // 비율 유지하며 리사이즈
      `w_${width}`,
      `q_${quality || 'auto'}`,
    ]

    return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${encodeURIComponent(src)}`
  }

  // public 폴더의 로컬 이미지는 원본 URL 반환 (Vercel 이미지 최적화 사용 안 함)
  return src
}
