/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const MenuXIcon = ({
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
    <g filter="url(#filter0_i_2162_74646)">
      <rect width="40" height="40" rx="12" fill="#F4F1D4" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="#603309" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.1161 12.1161C14.6043 11.628 15.3957 11.628 15.8839 12.1161L20 16.2322L24.1161 12.1161C24.6043 11.628 25.3957 11.628 25.8839 12.1161C26.372 12.6043 26.372 13.3957 25.8839 13.8839L21.7678 18L25.8839 22.1161C26.372 22.6043 26.372 23.3957 25.8839 23.8839C25.3957 24.372 24.6043 24.372 24.1161 23.8839L20 19.7678L15.8839 23.8839C15.3957 24.372 14.6043 24.372 14.1161 23.8839C13.628 23.3957 13.628 22.6043 14.1161 22.1161L18.2322 18L14.1161 13.8839C13.628 13.3957 13.628 12.6043 14.1161 12.1161Z" fill="#FFC70F" stroke="black" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_i_2162_74646" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="-4" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.376471 0 0 0 0 0.2 0 0 0 0 0.0352941 0 0 0 1 0" />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2162_74646" />
      </filter>
    </defs>
  </svg>

)
