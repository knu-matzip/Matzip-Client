import { SVGProps } from 'react'

export const Gift = ({ width, height, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={width ?? 0}
    height={height ?? 0}
    viewBox='0 0 25 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_845_640)'>
      <path
        d='M19.7142 6.03259H13.7142V23.0324H19.7142C20.8188 23.0324 21.714 22.1372 21.714 21.0326V8.03239C21.714 6.92779 20.8188 6.03259 19.7142 6.03259Z'
        fill='#EF4452'
      />
      <path
        d='M10.7142 6.03259H4.71419C3.60959 6.03259 2.71439 6.92779 2.71439 8.03239V21.0326C2.71439 22.1372 3.60959 23.0324 4.71419 23.0324H10.7142V6.03259Z'
        fill='#EF4452'
      />
      <path
        d='M17.8902 3.22943V6.03143H13.7142V23.0354H10.7142V6.03143H6.53819V3.22943C6.53819 2.52143 7.26419 2.03543 7.91819 2.30543L12.2142 4.06943L16.5102 2.30543C17.1642 2.03543 17.8902 2.52143 17.8902 3.22943Z'
        fill='#FFCD00'
      />
    </g>
    <defs>
      <clipPath id='clip0_845_640'>
        <rect
          width='24'
          height='24'
          fill='white'
          transform='translate(0.214195 0.63147)'
        />
      </clipPath>
    </defs>
  </svg>
)
