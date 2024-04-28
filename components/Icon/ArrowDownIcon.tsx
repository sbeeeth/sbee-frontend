/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const ArrowDownIcon = ({
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
    <path d="M12.0002 15.7147L18.0102 9.70473L16.5972 8.28973L12.0002 12.8897L7.40423 8.28973L5.99023 9.70373L12.0002 15.7147Z" fill="black" fillOpacity="0.4" />

  </svg>
)
