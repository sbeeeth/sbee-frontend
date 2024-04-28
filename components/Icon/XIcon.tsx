/* eslint-disable max-len */
import React, { SVGAttributes } from 'react'

export const XIcon = ({
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
    <path d="M16.5227 19.3766L16.5228 19.3766C16.6174 19.4998 16.7639 19.572 16.9193 19.572H17.9783C18.3919 19.572 18.6267 19.0986 18.3763 18.7694L7.54842 4.52936C7.45387 4.40501 7.30663 4.332 7.15041 4.332H5.98289C5.56823 4.332 5.33377 4.80768 5.58634 5.13655L16.5227 19.3766ZM17.7074 3.65567C17.8502 3.49316 18.056 3.4 18.2723 3.4C18.9191 3.4 19.2641 4.16241 18.8372 4.64827L13.9254 10.2382C13.7371 10.4525 13.7258 10.7699 13.8984 10.9972L19.9745 18.9951C20.4747 19.6535 20.0051 20.6 19.1782 20.6H16.0252L11.4604 14.6563C11.2302 14.3565 10.7835 14.3418 10.5339 14.6257L5.50794 20.3441C5.36497 20.5068 5.1589 20.6 4.94234 20.6C4.2946 20.6 3.94912 19.8364 4.37672 19.3499L9.75294 13.2325C9.94212 13.0173 9.95267 12.6983 9.77811 12.471L4.04735 5.0091C3.54221 4.35137 4.01113 3.4 4.84044 3.4H7.63342C7.94599 3.4 8.24059 3.54616 8.42968 3.79505L12.2315 8.79915C12.461 9.1012 12.9096 9.11716 13.16 8.83217L17.7074 3.65567Z" fill="#FFC70F" stroke="black" strokeWidth="0.8" />
  </svg>
)