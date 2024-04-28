/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const EthIcon = ({
  width = 16,
  height = 16,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2460_5332)">
      <circle cx="8" cy="8" r="8" fill="#627EEA" />
      <path d="M7.9777 3.19922L7.91406 3.41539V9.68762L7.9777 9.75111L10.8891 8.03013L7.9777 3.19922Z" fill="#C0CBF6" />
      <path d="M7.97792 3.19922L5.06641 8.03013L7.97792 9.75111V6.70674V3.19922Z" fill="white" />
      <path d="M7.97727 10.3021L7.94141 10.3459V12.5801L7.97727 12.6848L10.8905 8.58203L7.97727 10.3021Z" fill="#C0CBF6" />
      <path d="M7.97792 12.685V10.3023L5.06641 8.58224L7.97792 12.685Z" fill="white" />
      <path d="M7.97656 9.7514L10.888 8.03042L7.97656 6.70703V9.7514Z" fill="#8197EE" />
      <path d="M5.06641 8.03042L7.97792 9.7514V6.70703L5.06641 8.03042Z" fill="#C0CBF6" />
    </g>
    <defs>
      <clipPath id="clip0_2460_5332">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
