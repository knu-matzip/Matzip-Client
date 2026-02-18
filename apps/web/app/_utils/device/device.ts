/**
 * 모바일 디바이스 감지 정규식
 */
const MOBILE_REGEX = /iPhone|iPad|iPod|Android/i
const IOS_REGEX = /iPhone|iPad|iPod/i

/**
 * 현재 디바이스가 모바일인지 확인
 */
export const isMobileDevice = (): boolean =>
  MOBILE_REGEX.test(navigator.userAgent)

/**
 * 현재 디바이스가 iOS인지 확인
 */
export const isIOSDevice = (): boolean => IOS_REGEX.test(navigator.userAgent)
