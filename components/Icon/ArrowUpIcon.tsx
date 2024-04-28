/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const ArrowUpIcon = ({
  width = 24,
  height = 24,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.0012 8.28984L18.0112 14.2998L16.5982 15.7148L12.0012 11.1148L7.40521 15.7148L5.99121 14.3008L12.0012 8.28984Z" fill="black" fillOpacity="0.4" />
  </svg>
)
