export const CAMPUS = {
  singwan: '신관',
  cheonan: '천안',
  yesan: '예산',
} as const

export const CAMPUS_LOCATION = {
  singwan: { latitude: 36.469483428385914, longitude: 127.14059828594706 },
  cheonan: { latitude: 36.85101236046876, longitude: 127.15093333537096 },
  yesan: { latitude: 36.66990298154316, longitude: 126.85937468290652 },
} as const

export const CAMPUS_COLOR = {
  singwan: {
    text: 'text-red',
    background: 'bg-red-light',
    border: {
      default: 'border-red-light',
      active: 'border-red',
    },
  },
  cheonan: {
    text: 'text-blue',
    background: 'bg-blue-light',
    border: {
      default: 'border-blue-light',
      active: 'border-blue',
    },
  },
  yesan: {
    text: 'text-yellow',
    background: 'bg-yellow-light',
    border: {
      default: 'border-yellow-light',
      active: 'border-yellow',
    },
  },
} as const
export type CampusType = keyof typeof CAMPUS
export const CAMPUS_LIST = Object.keys(CAMPUS) as CampusType[]
