import React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import Footer from '@components/Layout/Footer'

const RoadmapPage: NextPage = () => {
  return (
    <div
      className='flex pt-[16px] sm:pt-[106px] flex-1 justify-center flex-col items-center
        sm:px-[0px] overflow-hidden bg-roadmap-bg bg-no-repeat bg-top relative
        max-w-[1440px] mx-auto'
    >
      <NextSeo
        title='$SBEE Roadmap | Charting Our Blockchain Journey'
        description='Explore the roadmap of SharkBee Coin, from liquidity pools to community airdrops. Be part of our journey to a vibrant blockchain future!'
        canonical='https://sharkbeecoin.com'
        openGraph={{
          url: 'https://sharkbeecoin.com/roadmap',
          title: '$SBEE Roadmap | Charting Our Blockchain Journey',
          description:
            'Explore the roadmap of SharkBee Coin, from liquidity pools to community airdrops. Be part of our journey to a vibrant blockchain future!',
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
          mx-[16px] sm:mx-[16px] mb-[70px]'
        style={{ height: 'max-content', zIndex: 2 }}
      >
        <div className='text-black text-center font-comic sm:text-40 text-xl font-bold leading-normal'>
          Roadmap
        </div>
        <div
          className='text-black opacity-50 text-center font-comic text-base font-medium sm:leading-8
            leading-normal mt-4 text-md sm:text-lg'
        >
          {`We’re cultivating a thriving ecosystem where every bee can find their
          buzz. Join us in building a brighter future on the blockchain and get
          rewarded for your bee-generative efforts. Ready to BUIDL a buzz-worthy
          tomorrow and earn your reward?`}
          <div className='font-bold'>#BeeTheMovement 🦈🐝🚀✨</div>
        </div>
        <div className='flex mt-[48px] gap-[12px] flex-col sm:flex-row'>
          <div className='flex flex-col items-start sm:items-center justify-center'>
            <Image
              src='/images/svg/roadmap-parse-1.svg'
              alt=''
              width={85}
              height={73}
              className='w-[85px] h-[73px] tranform -rotate-90 -scale-x-100'
            ></Image>
            <Image
              src='/images/png/roadmap-parse-1-line.png'
              alt=''
              width={11}
              height={55}
              className='w-[11px] h-[55px] bg-cover hidden sm:flex'
            ></Image>
          </div>

          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div
              className='text-black font-comic text-base font-bold text-md sm:text-lg flex items-center
                gap-[26px]'
            >
              Phase 1: Let’s Get Liquid!
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal flex items-center gap-[26px] flex-row-reverse'
            >
              The $SBEE token splashed into the blockchain world, ready to make
              waves. Dive into our liquidity pool and watch as we create a buzz
              in the market.
            </div>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row'>
          <div className='flex flex-col items-start sm:items-center justify-center'>
            <Image
              src='/images/svg/roadmap-parse-4-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] flex sm:hidden'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-2.svg'
              alt=''
              width={85}
              height={73}
              className='w-[85px] h-[73px] -rotate-90 -scale-x-100'
            ></Image>
            <Image
              src='/images/png/roadmap-parse-2-line.png'
              alt=''
              width={22}
              height={111}
              className='w-[22px] h-[111px] hidden sm:flex'
            ></Image>
          </div>

          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div
              className='text-black font-comic text-base font-bold text-md sm:text-lg leading-normal
                sm:leading-5'
            >
              Phase 2: Claim Your Honey with Airdrop 1
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal'
            >
              We&apos;re rolling out the honey-red carpet for our early
              community members, developers, open-source contributors, NFT
              creators, NFT holders, memecoin shillers, do-gooders, and so many
              more vibrant bees of our hive. Our first airdrop shines a light on
              those who’ve buzzed alongside us, offering many paths to
              recognition and reward. Stay tuned for the sweet details on how to
              claim your nectar!`
            </div>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row'>
          <div className='flex flex-col items-start sm:items-center justify-center'>
            <Image
              src='/images/svg/roadmap-parse-4-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] flex sm:hidden'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-3.svg'
              alt=''
              width={85}
              height={73}
              className='w-[85px] h-[73px] -rotate-90 -scale-x-100'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-3-top-line.svg'
              alt=''
              width={22}
              height={111}
              className='w-[11px] h-[47px] hidden sm:flex'
            ></Image>
            <Image
              src='/images/png/roadmap-parse-3-bottom-line.png'
              alt=''
              width={22}
              height={98}
              className='w-[22px] h-[98px] hidden sm:flex'
            ></Image>
          </div>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Phase 3: Sweeten Your Stack with Staking
            </div>

            <div
              className='text-black font-comic text-base mt-[16px] text-sm sm:text-md font-normal
                leading-normal sm:leading-5'
            >
              Missed Airdrop 1? No problem—those unclaimed $SBEE enrich the pool
              for both stakers and liquidity providers. Let’s flourish together!
              <ul className='list-disc ml-6'>
                <li className='mt-[12px]'>
                  <label className='font-bold'> Stake $SBEE: </label>Lock in
                  your $SBEE to earn more $SBEE
                </li>
                <li className='mt-[12px]'>
                  <label className='font-bold'>Provide Liquidity:</label> Join
                  our Uniswap V2 liquidity pool to support the ecosystem and
                  earn $SBEE rewards based on your contribution.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row'>
          <div className='flex flex-col items-start sm:items-center justify-center'>
            <Image
              src='/images/svg/roadmap-parse-4-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] flex sm:hidden'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-4.svg'
              alt=''
              width={85}
              height={73}
              className='w-[85px] h-[73px] -rotate-90 -scale-x-100'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-4-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] hidden sm:flex'
            ></Image>
          </div>
          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Phase 4: Hive Nominations for Airdrop 2
            </div>
            <div
              className='text-black font-comic text-base mt-[16px] text-sm sm:text-md font-normal
                leading-normal sm:leading-5'
            >
              Missed the first wave of airdrops? No worries, frens! 🎈🚀 Your
              chance for glory hasn’t flown away. The hive will vote in the next
              airdrop phase, and the top 10 buzzworthy projects will win
              rewards! We’re excited to venture into interoperability and weave
              our essence across multiple chains to celebrate the diversity of
              our bees.
            </div>
          </div>
        </div>
        <div className='flex gap-[12px] flex-col sm:flex-row'>
          <div className='flex flex-col items-start sm:items-center justify-center'>
            <Image
              src='/images/svg/roadmap-parse-4-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] flex sm:hidden'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-4.svg'
              alt=''
              width={85}
              height={73}
              className='w-[85px] h-[73px] -rotate-90 -scale-x-100'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-5-top-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] hidden sm:flex'
            ></Image>
            <Image
              src='/images/svg/roadmap-parse-5-line.svg'
              alt=''
              width={22}
              height={94}
              className='w-[22px] h-[94px] hidden sm:flex'
            ></Image>
          </div>

          <div className='flex flex-col flex-1 mt-[12px] sm:mt-[0px]'>
            <div className='text-black font-comic text-base font-bold text-md sm:text-lg'>
              Phase 5: Ecosystem BUIDLing with Airdrop 3
            </div>
            <div
              className='text-black font-comic text-base leading-normal mt-[16px] text-sm sm:text-md
                font-normal sm:leading-5'
            >
              Let’s get BUIDLing! We’re gearing up to nurture the ecosystem with
              our third airdrop focused on ecosystem projects. It’s about
              growing our hive with meaningful contributions:
              <ul className='list-disc ml-6'>
                <li className='mt-[16px]'>
                  <label className='font-bold'>
                    BUILDing / Bounties: Think Gitcoin, but sweeter. We’re
                    allocating resources to projects that promise to enrich our
                    ecosystem.
                  </label>
                </li>
                <li className='mt-[16px]'>
                  <label className='font-bold'> Ordinals for Holders: </label>
                  We’re exploring the realms of interoperability, rewarding our
                  loyal bees with ordinals that carry our essence across
                  platforms.
                </li>
                <li className='mt-[16px]'>
                  <label className='font-bold'>. Propose and Prosper:</label>{' '}
                  Have a project that can benefit from a little $SBEE pollen?
                  Pitch it to us, and the hive may fund it in $SBEE tokens.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Image
          src='/images/svg/roadmap-left-icon.svg'
          alt=''
          height={219}
          width={200}
          className='absolute sm:bottom-[-50px] sm:left-[-40px] w-[74px] sm:h-[166px] sm:w-[228px]
            hidden sm:flex'
        ></Image>
      </div>
      <Footer></Footer>
      <Image
        src='/images/svg/roadmap-right-icon.svg'
        alt=''
        height={430}
        width={760}
        className='absolute bottom-[307px] right-[-35px] sm:bottom-[360px] sm:right-[-60px]
          w-[232px] h-[134px] sm:h-[430px] sm:w-[760px]'
        style={{ zIndex: 1 }}
      ></Image>
    </div>
  )
}

export default RoadmapPage
