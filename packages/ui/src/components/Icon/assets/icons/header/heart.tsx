import { SVGProps } from 'react'

export const Heart = ({
  width,
  height,
  color,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width ?? 26}
    height={height ?? 26}
    viewBox='0 0 27 27'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_76_1134)'>
      <path
        d='M11.8424 22.4952C12.5457 22.96 13.4538 22.96 14.1571 22.4952C16.3898 21.0197 21.2557 17.4954 23.3506 13.5506C26.1138 8.34665 22.869 3.1564 18.5809 3.1564C16.1363 3.1564 14.6654 4.43365 13.8522 5.5315C13.4239 6.11 12.5769 6.11 12.1479 5.5315C11.3348 4.43365 9.8638 3.1564 7.41915 3.1564C3.1311 3.1564 -0.113699 8.34665 2.64945 13.5506C4.74375 17.4948 9.60965 21.0197 11.8424 22.4952Z'
        fill={color || '#EF4452'}
      />
    </g>
    <defs>
      <clipPath id='clip0_76_1134'>
        <rect width='26' height='26' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
