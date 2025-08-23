import { SVGProps } from 'react'

export const MapMarker = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width || 56}
    height={height || 56}
    viewBox='0 0 56 56'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M46.5 22C46.5 30.1938 35.5312 44.7813 30.7219 50.8C29.5687 52.2344 27.4313 52.2344 26.2781 50.8C21.4688 44.7813 10.5 30.1938 10.5 22C10.5 12.0625 18.5625 4 28.5 4C38.4375 4 46.5 12.0625 46.5 22Z'
      fill={color || '#FEFCF9'}
      style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))' }}
    />
  </svg>
)
