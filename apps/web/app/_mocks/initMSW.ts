export const initServerMSW = () => {
  // 서버에서만 실행되는 MSW 초기화
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    import('./server').then(({ server }) => {
      server.listen({
        onUnhandledRequest: 'warn',
      })
      console.log('✅ MSW 서버 시작됨')
    })
  }
}

export const initBrowserMSW = async () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const { worker } = await import('./worker')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
    console.log('✅ MSW 브라우저 시작됨')
  }
}
