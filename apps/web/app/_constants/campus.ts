export const CAMPUS = {
  singwan: '신관',
  cheonan: '천안',
  yesan: '예산',
} as const

export type CampusType = keyof typeof CAMPUS
export const CAMPUS_LIST = Object.keys(CAMPUS) as CampusType[]
