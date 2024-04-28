import React from 'react'

const SoundOnIcon = ({ size, color }: { size: string; color: string }) => {
  return (
    <svg
      fill={color}
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 512 512'
      enableBackground='new 0 0 512 512'
    >
      <g>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256
		S397.391,0,256,0z M256,472c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z'
        />
        <path
          d='M331.141,148.297L232.156,208H168c-4.422,0-8,3.578-8,8v80c0,4.422,3.578,8,8,8h67.5l95.641,59.719
		c17.031,9.969,20.859,1.938,20.859-17.844V166.109C352,146.359,348.172,138.312,331.141,148.297z'
        />
      </g>
    </svg>
  )
}

export default SoundOnIcon
