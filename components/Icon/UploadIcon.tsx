import React, { SVGAttributes } from 'react'

export const UploadIcon = ({
  width = 32,
  height = 32,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <path
      d="M5.33332 29.3317C4.86182 29.3317 4.40964 29.1444 4.07624 28.811C3.74284 28.4776 3.55554 28.0254 3.55554 27.5539V22.7068C3.55554 22.2353 3.74284 21.7831 4.07624 21.4497C4.40964 21.1163 4.86182 20.929 5.33332 20.929H11.1289C11.321 21.698 11.7651 22.3806 12.3902 22.8679C13.0153 23.3552 13.7856 23.6192 14.5782 23.6179H16.9698C17.7624 23.6191 18.5326 23.3551 19.1577 22.8678C19.7828 22.3805 20.2269 21.698 20.4191 20.929H26.6667C27.1381 20.929 27.5903 21.1163 27.9237 21.4497C28.2571 21.7831 28.4444 22.2353 28.4444 22.7068V27.5535C28.4444 28.025 28.2571 28.4771 27.9237 28.8105C27.5903 29.1439 27.1381 29.3312 26.6667 29.3312H5.33332V29.3317ZM24.5982 26.6428C24.5962 26.8446 24.6542 27.0425 24.7648 27.2113C24.8755 27.38 25.0338 27.5121 25.2196 27.5908C25.4055 27.6694 25.6106 27.691 25.8087 27.6529C26.0069 27.6148 26.1893 27.5186 26.3327 27.3766C26.4762 27.2347 26.5742 27.0532 26.6143 26.8555C26.6544 26.6577 26.6348 26.4524 26.5581 26.2658C26.4813 26.0791 26.3508 25.9195 26.1832 25.8071C26.0155 25.6948 25.8182 25.6348 25.6164 25.6348C25.3478 25.6339 25.0897 25.7395 24.8988 25.9285C24.708 26.1176 24.5999 26.3746 24.5982 26.6432V26.6428ZM20.5253 26.6428C20.5233 26.8446 20.5813 27.0425 20.6919 27.2113C20.8026 27.38 20.9609 27.5121 21.1467 27.5908C21.3326 27.6694 21.5377 27.691 21.7358 27.6529C21.934 27.6148 22.1164 27.5186 22.2598 27.3766C22.4033 27.2347 22.5013 27.0532 22.5414 26.8555C22.5815 26.6577 22.562 26.4524 22.4852 26.2658C22.4084 26.0791 22.2779 25.9195 22.1103 25.8071C21.9426 25.6948 21.7454 25.6348 21.5435 25.6348C21.2749 25.6339 21.0168 25.7395 20.826 25.9285C20.6351 26.1176 20.527 26.3746 20.5253 26.6432V26.6428ZM13.7698 21.9361C13.633 21.9377 13.4973 21.9113 13.371 21.8586C13.2448 21.8058 13.1306 21.7279 13.0355 21.6295C12.9363 21.5363 12.8574 21.4236 12.8039 21.2985C12.7503 21.1733 12.7233 21.0385 12.7244 20.9024V12.0681H8.42132C8.21429 12.0789 8.00921 12.0235 7.83569 11.9101C7.66218 11.7966 7.52921 11.631 7.45599 11.437C7.36089 11.2504 7.33188 11.037 7.3737 10.8317C7.41551 10.6264 7.52568 10.4414 7.68621 10.3068L15.0058 2.97347C15.1019 2.87637 15.2163 2.79929 15.3424 2.74668C15.4685 2.69408 15.6038 2.66699 15.7404 2.66699C15.8771 2.66699 16.0123 2.69408 16.1384 2.74668C16.2645 2.79929 16.379 2.87637 16.4751 2.97347L23.7947 10.313C23.9561 10.4469 24.067 10.632 24.1089 10.8376C24.1507 11.0431 24.1211 11.2568 24.0249 11.4432C23.9509 11.6375 23.8172 11.8033 23.643 11.9167C23.4688 12.0301 23.2631 12.0853 23.0555 12.0744H18.8262V20.9041C18.8274 21.0403 18.8004 21.1753 18.7469 21.3005C18.6933 21.4257 18.6144 21.5385 18.5151 21.6317C18.4199 21.7301 18.3057 21.808 18.1794 21.8608C18.0531 21.9135 17.9173 21.9399 17.7804 21.9384L13.7698 21.9366V21.9361Z"
      fill="#7C7C7C"
    />
  </svg>
)

export const ColorfulUploadIcon = ({
  width = 32,
  height = 32,
  className,
  ...props
}: SVGAttributes<SVGElement>) => (
  < svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    {...props}
    className={className ?? ''}
  >
    <path d="M5.33344 29.3317C4.86195 29.3317 4.40976 29.1444 4.07636 28.811C3.74297 28.4776 3.55566 28.0254 3.55566 27.5539V22.7068C3.55566 22.2353 3.74297 21.7831 4.07636 21.4497C4.40976 21.1163 4.86195 20.929 5.33344 20.929H11.129C11.3211 21.698 11.7652 22.3806 12.3903 22.8679C13.0154 23.3552 13.7857 23.6192 14.5783 23.6179H16.9699C17.7625 23.6191 18.5327 23.3551 19.1578 22.8678C19.783 22.3805 20.227 21.698 20.4192 20.929H26.6668C27.1383 20.929 27.5905 21.1163 27.9239 21.4497C28.2573 21.7831 28.4446 22.2353 28.4446 22.7068V27.5535C28.4446 28.025 28.2573 28.4771 27.9239 28.8105C27.5905 29.1439 27.1383 29.3312 26.6668 29.3312H5.33344V29.3317ZM24.5983 26.6428C24.5963 26.8446 24.6543 27.0425 24.7649 27.2113C24.8756 27.38 25.0339 27.5121 25.2198 27.5908C25.4056 27.6694 25.6107 27.691 25.8089 27.6529C26.007 27.6148 26.1894 27.5186 26.3329 27.3766C26.4763 27.2347 26.5743 27.0532 26.6144 26.8555C26.6545 26.6577 26.635 26.4524 26.5582 26.2658C26.4814 26.0791 26.351 25.9195 26.1833 25.8071C26.0156 25.6948 25.8184 25.6348 25.6166 25.6348C25.3479 25.6339 25.0898 25.7395 24.899 25.9285C24.7081 26.1176 24.6 26.3746 24.5983 26.6432V26.6428ZM20.5254 26.6428C20.5234 26.8446 20.5814 27.0425 20.6921 27.2113C20.8027 27.38 20.961 27.5121 21.1469 27.5908C21.3327 27.6694 21.5378 27.691 21.736 27.6529C21.9342 27.6148 22.1165 27.5186 22.26 27.3766C22.4034 27.2347 22.5014 27.0532 22.5415 26.8555C22.5816 26.6577 22.5621 26.4524 22.4853 26.2658C22.4086 26.0791 22.2781 25.9195 22.1104 25.8071C21.9427 25.6948 21.7455 25.6348 21.5437 25.6348C21.275 25.6339 21.017 25.7395 20.8261 25.9285C20.6352 26.1176 20.5271 26.3746 20.5254 26.6432V26.6428ZM13.7699 21.9361C13.6331 21.9377 13.4974 21.9113 13.3711 21.8586C13.2449 21.8058 13.1307 21.7279 13.0357 21.6295C12.9364 21.5363 12.8575 21.4236 12.804 21.2985C12.7505 21.1733 12.7234 21.0385 12.7246 20.9024V12.0681H8.42144C8.21441 12.0789 8.00933 12.0235 7.83582 11.9101C7.6623 11.7966 7.52933 11.631 7.45611 11.437C7.36101 11.2504 7.332 11.037 7.37382 10.8317C7.41563 10.6264 7.5258 10.4414 7.68633 10.3068L15.0059 2.97347C15.102 2.87637 15.2164 2.79929 15.3425 2.74668C15.4686 2.69408 15.6039 2.66699 15.7406 2.66699C15.8772 2.66699 16.0125 2.69408 16.1386 2.74668C16.2647 2.79929 16.3791 2.87637 16.4752 2.97347L23.7948 10.313C23.9563 10.4469 24.0671 10.632 24.109 10.8376C24.1509 11.0431 24.1212 11.2568 24.025 11.4432C23.951 11.6375 23.8173 11.8033 23.6431 11.9167C23.4689 12.0301 23.2632 12.0853 23.0557 12.0744H18.8263V20.9041C18.8275 21.0403 18.8005 21.1753 18.747 21.3005C18.6934 21.4257 18.6145 21.5385 18.5152 21.6317C18.4201 21.7301 18.3058 21.808 18.1795 21.8608C18.0532 21.9135 17.9174 21.9399 17.7806 21.9384L13.7699 21.9366V21.9361Z" fill="url(#paint0_linear_254_893)" />
    <defs>
      <linearGradient id="paint0_linear_254_893" x1="3.55566" y1="15.9993" x2="28.4446" y2="15.9993" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C4F360" />
        <stop offset="1" stopColor="#75F3B9" />
      </linearGradient>
    </defs>
  </svg >
)
