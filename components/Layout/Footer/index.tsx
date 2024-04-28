'use client'

import React from 'react'
import Link from 'next/link'
import { Image } from '@nextui-org/react'

import { DiscordURL, TelegramURL, TwitterURL } from '@constants/config'

export default function Footer() {
  return (
    <div className='mt-[110px] relative w-full px-[-16px] sm:px-0 max-w-[1440px] mx-auto'>
      <Image
        src='/images/svg/footer-bg.svg'
        alt=''
        className='w-full hidden sm:block'
      ></Image>
      <Image
        src='/images/svg/footer-bg-small.svg'
        alt=''
        width={600}
        className='w-full max-w-full block sm:hidden'
      ></Image>
      <div
        className='absolute sm:bottom-[40px] sm:left-[40px] sm:right-[40px] flex flex-col
          bottom-[16px] left-[16px] right-[16px] items-center sm:justify-between
          sm:flex-row-reverse gap-[16px] z-10'
      >
        <div className='footer-link-content flex gap-[16px]'>
          <Link
            href={DiscordURL}
            target='_blank'
          >
            <Image
              src='/images/svg/discord.svg'
              alt='discord'
              width={24}
              height={24}
              style={{ width: '24px', height: '24px' }}
            ></Image>
          </Link>
          <Link
            href={TwitterURL}
            target='_blank'
          >
            <Image
              src='/images/svg/xtwitter.svg'
              alt='x'
              width={24}
              height={24}
              style={{ width: '24px', height: '24px' }}
            ></Image>

          </Link>
          <Link
            href={TelegramURL}
            target='_blank'
          >
            <Image
              src='/images/svg/telegram.svg'
              alt='telegram'
              width={24}
              height={24}
              style={{ width: '24px', height: '24px' }}
            ></Image>
          </Link>
        </div>
        <div className='text-black text-center font-comic-sans text-base font-bold'>
          © 2024 SharkBee Coin. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}
