/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const MenuItemIcon = ({
  width = 20,
  height = 14,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden='true'
    focusable='false'
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    fill='none'
    viewBox="0 0 20 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="2" rx="1" fill="white" />
    <rect y="6" width="20" height="2" rx="1" fill="white" />
    <rect y="12" width="20" height="2" rx="1" fill="white" />
  </svg>
)
