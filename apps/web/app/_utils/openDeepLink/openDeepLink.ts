interface OpenDeepLinkParams {
  appScheme: string
  fallbackUrl: string
}

/**
 * 딥링크 실행 유틸 함수
 * - 앱이 설치되어 있으면 앱 실행
 * - 앱이 없으면 2.5초 후 fallbackUrl로 이동
 * - 앱 실행 시 페이지가 백그라운드로 가면 fallback 취소
 */
export const openDeepLink = ({
  appScheme,
  fallbackUrl,
}: OpenDeepLinkParams): void => {
  const startTime = Date.now()

  // 페이지가 백그라운드로 가면 앱이 실행된 것으로 간주
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // 앱이 실행되어 페이지가 숨겨짐
      clearTimeout(fallbackTimeout)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)

  // 앱이 설치되지 않은 경우를 대비한 타임아웃
  const fallbackTimeout = setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    // 페이지가 포그라운드 상태로 유지되었다면 앱이 없는 것으로 간주
    if (!document.hidden && Date.now() - startTime >= 2500) {
      window.location.href = fallbackUrl
    }
  }, 2500)

  window.location.href = appScheme
}
