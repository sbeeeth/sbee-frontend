import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Image } from '@nextui-org/react'

import Button from '@components/Button/Button'
import Footer from '@components/Layout/Footer'
import { GitbookURL } from '@constants/config'

const TokenomicsPage: NextPage = () => {
  return (
    <div className='w-full bg-co-bg-1'>
      <NextSeo
        title='$SBEE Tokenomics | Empowering the Community'
        description='Unveil the tokenomics of $SBEE, dedicated to community growth and innovation. Dive into our distribution strategy and join us!'
        canonical='https://sharkbeecoin.com'
        openGraph={{
          url: 'https://sharkbeecoin.com/tokennomics',
          title: '$SBEE Tokenomics | Empowering the Community',
          description:
            'Unveil the tokenomics of $SBEE, dedicated to community growth and innovation. Dive into our distribution strategy and join us!',
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
        className='bg-tokenomics-bg h-fit bg-[length:100%_auto] max-w-[1440px] mx-auto bg-no-repeat
          bg-top px-4 bg-co-bg-1 overflow-hidden'
      >
        <div
          className='flex flex-col items-center bg-co-bg-white max-w-[1070px] mx-auto rounded-lg
            relative mt-10 sm:mt-20 py-6 sm:py-16 px-4 sm:px-32 text-center
            text-co-text-black font-normal text-md sm:text-lg'
        >
          <Image
            src='/images/svg/tokenomics-header.svg'
            alt='tokenomics header'
            className='w-[264px] sm:w-[342px]'
          />
          <h2 className='font-xl font-bold mt-12 sm:text-[40px]'>
            $SBEE: Tokenomics
          </h2>
          <p className='font-md font-normal opacity-50 mt-4 sm:px-8'>
            At the dawn of our launch, we buzzed into the blockchain with a
            sweet stash of  88.88 billion $SBEE tokens. Here’s how the honey is
            spread:
          </p>
          <Image
            src='/images/svg/tokenomics-chart.svg'
            alt='tokenomics chart'
            className='w-[329px] sm:w-[813px] mt-4'
          />
          <p className='text-bold text-left mt-12'>
            60% of our tokens buzz to the Beegen Community, 25% boosts liquidity
            and ecosystem growth, and 15% rewards our contributors, powering our
            hive&apos;s vitality:
          </p>

          <ul className='list-disc text-left pl-4 mt-6'>
            <li className='w-full text-bold text-left'>
              60% to the Beegen Community:
            </li>
            <li className='ml-4'>
              <p>
                <span className='text-bold'>(20%) Airdrop 1:</span> Rewarding
                the early bees who believed in our buzz from the start.
                Unclaimed $SBEEs flows into staking rewards, sweetening the pot.
              </p>
            </li>
            <li className='ml-4'>
              <p>
                <span className='text-bold'>(15%) Airdrop 2:</span> The hive
                will vote on 10 buzzworthy projects to reward. Unclaimed $SBEEs
                will be repurposed for ecosystem BUIDLing.
              </p>
            </li>
            <li className='ml-4'>
              <p>
                <span className='text-bold'>(25%) Airdrop 3:</span> Let’s get
                BUIDLing! We’ll grow our hive and allocate resources to projects
                that enrich the blockchain ecosystem.
              </p>
            </li>
          </ul>
          <ul className='list-disc text-left pl-4 mt-6'>
            <li className='text-bold'>
              <p>25% for Ongoing Hive Growth and Ecosystem Development:</p>
            </li>
            <li className='ml-4'>
              <p>
                <span className='text-bold'>(10%) Liquidity Pool:</span>{' '}
                Reserves to launch $SBEE on the open market.
              </p>
            </li>
            <li className='ml-4'>
              <p>
                <span className='text-bold'>(15%) Treasury:</span> Reserves to
                nurture future ecosystem blossoms and listing on CEXs.
              </p>
            </li>
          </ul>
          <ul className='list-disc text-left pl-4'>
            <li>
              <p>
                <span className='text-bold'>
                  15% to Core Contributors (locked for 6 months):
                </span>{' '}
                A thank you to the worker bees behind the scenes, locked for six
                moons.
              </p>
            </li>
          </ul>
          <p className='text-left mt-12'>
            Join us in building a brighter future on the blockchain and get
            rewarded for your bee-generative efforts.{' '}
          </p>
          <Button
            color='primary'
            className='rounded-lg shadow-button mt-12'
            onClick={() => {
              window.open(GitbookURL, '_blank')
            }}
          >
            GITBOOK
          </Button>

          <div className='absolute -right-10 bottom-6 sm:bottom-[140px] z-20'>
            <Image
              src='/images/svg/tokenomics-bee.svg'
              className='w-[84px] sm:w-[188px]'
              alt='tokenomics bee'
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default TokenomicsPage
