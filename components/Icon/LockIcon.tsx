/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const LockIcon = ({
  width = 24,
  height = 25,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.60768 10.7279C6.47857 7.49237 8.98704 3.88866 11.9149 3.80013C14.8679 3.71086 18.0168 7.84688 17.2023 10.8283H15.7119C15.7119 10.8283 16.2885 7.9059 14.8945 6.67712C14.212 6.07583 12.956 4.91713 11.7073 5.09383C10.8654 5.21299 9.17406 6.36688 8.78341 7.09323C8.02164 8.50867 8.14707 10.7146 8.14707 10.7146L6.60768 10.7279Z" fill="#D0CFCE" stroke="#D0CFCE" strokeWidth="0.737785" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.274 11.1418H18.9657V21.0558H4.94775V11.1418H5.63943H18.274Z" fill="#FFC70F" />
    <path d="M18.8016 11.2142L11.8774 20.9903H19L18.8016 11.2142Z" fill="#F59F00" />
    <path d="M6.60777 9.89403C6.60777 6.80308 8.97422 3.8903 11.8899 3.79882C14.83 3.70623 17.5746 6.48583 17.3278 9.89403M18.274 11.1243H18.9657V21.0383H4.94775V11.1243H5.63943H18.274Z" stroke="black" strokeWidth="0.737785" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.14722 9.89452C8.14722 7.55722 9.8349 5.35493 11.9143 5.28558C14.0111 5.21549 15.9685 7.31744 15.7929 9.89452" stroke="black" strokeWidth="0.737785" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
