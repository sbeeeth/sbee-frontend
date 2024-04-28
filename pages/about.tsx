import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import Footer from '@components/Layout/Footer'

const AboutPage: NextPage = () => {
  return (
    <div
      className='flex pt-[82px] sm:pt-[172px] flex-1 justify-center flex-col items-center
        sm:px-[0px] overflow-hidden bg-about-bg bg-no-repeat mt-[-66px] bg-top
        bg-co-bg-1'
    >
      <NextSeo
        title='$SBEE About | Heart of SharkBee Coin'
        description='Discover $SBEE, the core of SharkBee Coin, blending regenerative principles with blockchain for a positive impact. '
        canonical='https://sharkbeecoin.com'
        openGraph={{
          url: 'https://sharkbeecoin.com',
          title: '$SBEE About | Heart of SharkBee Coin',
          description:
            'Discover $SBEE, the core of SharkBee Coin, blending regenerative principles with blockchain for a positive impact. ',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'SharkBee',
              type: 'image/jpeg'
            }
          ],
          siteName: 'SharkBee Coin'
        }}
        twitter={{
          handle: '@sbeecoineth',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />
      <div
        className='max-w-[1068px] bg-white sm:pt-[64px] sm:px-[128px] justify-center relative
          sm:pb-[108px] pb-[40px] px-[16px] py-[24px] rounded-lg border border-gray-300
          mx-[16px] sm:mx-[16px]'
        style={{ height: 'max-content' }}
      >
        <div className='text-black text-center font-comic sm:text-40 text-xl font-bold leading-normal'>
          $SBEE: Rewarding Every Bee in the Hive
        </div>
        <div
          className='text-black opacity-50 text-center font-comic text-base font-medium
            leading-normal sm:leading-5 mt-4 text-md sm:text-lg'
        >
          {`Dropping into the Ethereum hive, $SBEE, an ERC-20 token on Mainnet,
          rewards the planet's builders, dreamers, and doers. Consider $SBEE
          your blockchain high-five, acknowledging your contributions to our
          vibrant community. 🙌✨`}
        </div>
        <div className='text-black font-comic text-base font-bold mt-[48px] text-lg sm:text-xl'>
          Our Mission
        </div>
        <div
          className='text-black font-comic text-base font-bold leading-normal mt-[16px] text-md
            sm:text-lg'
        >
          {`From Ethereum to beyond, we're saluting degens, BUILDlers, regens,
          creators, HODLRs and all who enrich the tapestry of interoperable
          ecosystems. Your unique vibes supercharge our hive. We're buzzing to
          celebrate YOU, rallying the hive with the $SBEE token for an epic
          community glow-up! `}
        </div>
        <div
          className='text-black font-comic text-base leading-normal mt-[16px] text-md sm:text-lg
            font-normal'
        >
          Join us in building a brighter future on the blockchain and get
          rewarded for your bee-generative efforts.{' '}
        </div>
        <div
          className='text-black font-comic text-base font-bold leading-normal text-lg sm:text-xl
            mt-[48px]'
        >
          Cashtag/Hashtag: #BeeTheMovement, #SharkBee, $SBEE 🦈🐝🚀✨
        </div>
        <div
          className='mt-[48px] text-black font-comic text-base font-bold leading-normal text-md
            sm:text-lg'
        >
          Village Vibes
        </div>
        <div
          className='text-black font-comic text-base leading-normal mt-[16px] text-md sm:text-lg
            font-normal'
        >
          {`Welcome to $SBEE Village - the ultimate crypto carnival! Here, degens
          gamble on possibilities, regens plant the future, and creators splash
          color on the blockchain canvas. Every bee plays a pivotal role,
          enriching our collective hive. Whether you're pioneering, exploring,
          or just starting, $SBEE is your ticket to where the buzz is. Every bee
          is key to our hive's vibe. We’re excited to swarm Ethereum and beyond,
          making blockchain a buzzworthy place for all!`}
        </div>
        <div className='text-black font-comic font-normal leading-normal mt-[48px] text-md'>
          Disclaimer: $SBEE is a meme coin. It has no functions, no utility, and
          no intrinsic value. It does not promise or offer any financial return,
          profit, interest, or dividend.
        </div>
        <Image
          src='/images/svg/about-right-icon.svg'
          alt=''
          height={219}
          width={200}
          className='absolute sm:top-[158px] top-[250px] right-[-30px] sm:right-[-100px] h-[81px]
            w-[74px] sm:h-[219px] sm:w-[200px]'
        ></Image>
        <Image
          src='/images/svg/about-left-icon.svg'
          alt=''
          height={214}
          width={186}
          className='absolute bottom-[-70px] left-[-45px] sm:bottom-[-106px] sm:left-[-50px]
            h-[95spx] w-[83px] sm:h-[214px] sm:w-[186px]'
        ></Image>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default AboutPage
