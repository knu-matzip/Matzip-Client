interface Window {
  Kakao: {
    init: (appKey: string) => void
    isInitialized: () => boolean
    Auth: {
      authorize: (params: Record<string, unknown>) => Promise<void>
    }
    [key: string]: unknown
  }
}
