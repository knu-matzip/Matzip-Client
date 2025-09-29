const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const addBaseUrl = (path: string) => {
  return `${BASE_URL}${path}`
}
