/** 남은 시간(밀리초) → d/h/m/s 객체 변환 */
export const getTimeParts = (remainingMs: number) => {
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60)
  const seconds = Math.floor((remainingMs / 1000) % 60)

  return { days, hours, minutes, seconds }
}
