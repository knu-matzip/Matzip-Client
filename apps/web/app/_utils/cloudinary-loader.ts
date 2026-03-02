import type { ImageLoaderProps } from 'next/image'

/**
 * Cloudinary Image Loader for Next.js
 * @see https://cloudinary.com/documentation/transformation_reference
 */
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

  // 외부 URL인 경우 Cloudinary fetch를 통해 최적화
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const params = [
      'f_auto', // 자동 포맷 선택 (WebP, AVIF 등)
      'c_limit', // 비율 유지하며 리사이즈
      `w_${width}`,
      `q_${quality || 'auto'}`,
    ]

    return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${encodeURIComponent(src)}`
  }

  // public 폴더의 로컬 이미지는 원본 URL 반환 (Vercel 이미지 최적화 사용 안 함)
  return src
}
