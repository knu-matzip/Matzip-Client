import { getTimeParts } from './getTimeParts'

/** d일 hh시 mm분 ss초 형식 문자열 생성 */
export const formatRemainingTime = (remainingMs: number) => {
  if (remainingMs <= 0) return '종료되었습니다'

  const { days, hours, minutes, seconds } = getTimeParts(remainingMs)

  return `${days}일 ${hours.toString().padStart(2, '0')}시 ${minutes
    .toString()
    .padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`
}
