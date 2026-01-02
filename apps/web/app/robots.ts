import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = new URL(process.env.NEXT_PUBLIC_CLIENT_URL || '')

  return {
    rules: {
      userAgent: '*', // 모든 검색 엔진 로봇 대상
      allow: '/', // 기본적으로 모든 페이지 접근 허용
      disallow: [
        '/api/', // API 라우트 제외
        '/_next/', // Next.js 빌드 파일 제외
        '/login/', // 로그인 페이지 제외
        '/my-gifticon/', // 개인 기프티콘 페이지 제외
        '/likes/', // 찜 목록 제외
        '/profile/', // 프로필 페이지 제외
        '/requests/', // 맛집 신청 내역 등 제외
        '/events/gifticon/', // 이벤트 개인 응모 내역 제외
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
