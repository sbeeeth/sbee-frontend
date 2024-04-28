/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const InfoIcon = ({
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
    <path fillRule="evenodd" clipRule="evenodd" d="M0.833008 7.99998C0.833008 4.05717 4.05687 0.833313 7.99967 0.833313C11.9425 0.833313 15.1663 4.05717 15.1663 7.99998C15.1663 11.9428 11.9425 15.1666 7.99967 15.1666C4.05687 15.1666 0.833008 11.9428 0.833008 7.99998ZM7.99967 1.83331C4.60915 1.83331 1.83301 4.60946 1.83301 7.99998C1.83301 11.3905 4.60915 14.1666 7.99967 14.1666C11.3902 14.1666 14.1663 11.3905 14.1663 7.99998C14.1663 4.60946 11.3902 1.83331 7.99967 1.83331Z" fill="black" fillOpacity="0.8" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8 6.83331C8.27614 6.83331 8.5 7.05717 8.5 7.33331V10.6666C8.5 10.9428 8.27614 11.1666 8 11.1666C7.72386 11.1666 7.5 10.9428 7.5 10.6666V7.33331C7.5 7.05717 7.72386 6.83331 8 6.83331Z" fill="black" fillOpacity="0.8" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.33008 5.49998C7.33008 5.13179 7.62855 4.83331 7.99674 4.83331H8.00273C8.37092 4.83331 8.6694 5.13179 8.6694 5.49998C8.6694 5.86817 8.37092 6.16665 8.00273 6.16665H7.99674C7.62855 6.16665 7.33008 5.86817 7.33008 5.49998Z" fill="black" fillOpacity="0.8" />
  </svg>
)
