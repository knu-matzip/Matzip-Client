export const formatPrice = (price: number): string => {
  if (price === 0) return '미등록'
  return `${price.toLocaleString()}원`
}
