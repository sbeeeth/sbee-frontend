/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const MenuIcon = ({
  width = 40,
  height = 40,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_2162_74644)">
      <rect width="40" height="40" rx="12" fill="white" />
      <path d="M11.0101 11.0101C10.7475 11.2726 10.6 11.6287 10.6 12C10.6 12.3713 10.7475 12.7274 11.0101 12.9899C11.2726 13.2525 11.6287 13.4 12 13.4H28C28.3713 13.4 28.7274 13.2525 28.99 12.9899C29.2525 12.7274 29.4 12.3713 29.4 12C29.4 11.6287 29.2525 11.2726 28.99 11.0101C28.7274 10.7475 28.3713 10.6 28 10.6H12C11.6287 10.6 11.2726 10.7475 11.0101 11.0101ZM11.0101 23.01C10.7475 23.2726 10.6 23.6287 10.6 24C10.6 24.3713 10.7475 24.7274 11.0101 24.99C11.2726 25.2525 11.6287 25.4 12 25.4H28C28.3713 25.4 28.7274 25.2525 28.99 24.99C29.2525 24.7274 29.4 24.3713 29.4 24C29.4 23.6287 29.2525 23.2726 28.99 23.01C28.7274 22.7475 28.3713 22.6 28 22.6H12C11.6287 22.6 11.2726 22.7475 11.0101 23.01ZM11.0101 17.0101C10.7475 17.2726 10.6 17.6287 10.6 18C10.6 18.3713 10.7475 18.7274 11.0101 18.9899C11.2726 19.2525 11.6287 19.4 12 19.4H12.6318C12.7623 19.4 12.8893 19.4426 12.9934 19.5212L14.7712 20.864C15.2705 21.2411 15.9595 21.2411 16.4588 20.864L18.2366 19.5212C18.3407 19.4426 18.4677 19.4 18.5982 19.4H28C28.3713 19.4 28.7274 19.2525 28.99 18.9899C29.2525 18.7274 29.4 18.3713 29.4 18C29.4 17.6287 29.2525 17.2726 28.99 17.0101C28.7274 16.7475 28.3713 16.6 28 16.6H12C11.6287 16.6 11.2726 16.7475 11.0101 17.0101Z" fill="#FFC70F" stroke="black" strokeWidth="0.8" />
    </g>
    <defs>
      <filter id="filter0_i_2162_74644" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="-4" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.924251 0 0 0 0 0.924251 0 0 0 0 0.924251 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2162_74644" />
      </filter>
    </defs>
  </svg>

)
