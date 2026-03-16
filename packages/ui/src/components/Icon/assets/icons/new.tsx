import { SVGProps } from 'react'

export const New = ({ width, height, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={width ?? 24}
    height={height ?? 24}
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_2018_834)'>
      <path
        d='M28.5 3.5H11.5C7.08172 3.5 3.5 7.08172 3.5 11.5V28.5C3.5 32.9183 7.08172 36.5 11.5 36.5H28.5C32.9183 36.5 36.5 32.9183 36.5 28.5V11.5C36.5 7.08172 32.9183 3.5 28.5 3.5Z'
        fill='#007FF2'
      />
      <path
        d='M14.455 24.3962H12.739L8.505 18.0522V24.3962H6.529V14.6982H8.246L12.492 21.0682V14.6982H14.455V24.3962Z'
        fill='white'
      />
      <path
        d='M15.866 24.3962V14.6982H21.755V16.4272H17.841V18.7012H21.31V20.4432H17.841V22.6672H21.964V24.3962H15.866Z'
        fill='white'
      />
      <path
        d='M31.893 24.3962H30.09L28.337 17.7792L26.572 24.3962H24.758L22.153 14.6982H24.19L25.758 21.0942L27.437 14.6982H29.214L30.893 21.0942L32.46 14.6982H34.51L31.893 24.3962Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_2018_834'>
        <rect width='40' height='40' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
