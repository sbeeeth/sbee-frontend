import React, { SVGAttributes } from 'react'

export const PlusIcon = ({
  width,
  height,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden='true'
    focusable='false'
    viewBox='0 0 21 20'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    fill='none'
  >
    <g clipPath='url(#clip0_17_24535)'>
      <path
        d='M3.875 10H17.625'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.75 3.125V16.875'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_17_24535'>
        <rect width='20' height='20' fill='none' transform='translate(0.75)' />
      </clipPath>
    </defs>
  </svg>
)
