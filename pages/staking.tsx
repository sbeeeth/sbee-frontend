import { useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { Accordion, AccordionItem } from '@nextui-org/react'
import clsx from 'clsx'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import Button from '@components/Button/Button'
import { ArrowDownIcon } from '@components/Icon/ArrowDownIcon'
import Footer from '@components/Layout/Footer'
import LpStaking from '@components/Staking/LpStaking'
import SbeeStaking from '@components/Staking/SbeeStaking'

const StakingPage: NextPage = () => {
  const { isConnected } = useAccount()

  const [currentStakeType, setCurrentStakeType] = useState<'sbee' | 'uni'>(
    'sbee'
  )
  const { openConnectModal } = useConnectModal()

  const handleSbeeButtonClick = () => {
    setCurrentStakeType('sbee')
  }

  const handleUniButtonClick = () => {
    setCurrentStakeType('uni')
  }

  const handleCollectButtonClick = () => {
    openConnectModal?.()
  }

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
        className='h-fit bg-[length:100%_auto] max-w-[1440px] mx-auto px-4 bg-co-bg-1
          overflow-hidden relative'
      >
        <Image
          className='absolute left-0 bottom-40'
          src='/images/svg/staking-bg-3.svg'
          width={1440}
          height={1332}
          alt='bg'
        />
        <Image
          className='absolute right-20 bottom-[300px]'
          src='/images/svg/staking-bg-1.svg'
          width={231}
          height={203}
          alt='bg'
        />
        <Image
          className='absolute left-10 top-[400px] hidden md:block'
          src='/images/svg/staking-bg-2.svg'
          width={249}
          height={287}
          alt='bg'
        />
        <div
          className='flex flex-col items-center max-w-[544px] mx-auto rounded-lg relative mt-2
            sm:mt-4 py-6 sm:py-16 text-center text-co-text-black font-normal text-md
            sm:text-lg'
        >
          <h2 className='font-xl font-bold mt-12 sm:text-[40px]'>
            $SBEE Staking Rewards
          </h2>
          <p className='font-md font-normal opacity-50 mt-2 sm:px-8'>
            Stake $SBEE or Liquidity LPs to Earn More $SBEE
          </p>
          <div className='flex gap-2 mt-10 mb-16'>
            {isConnected && (
              <>
                <Button
                  onClick={handleSbeeButtonClick}
                  className={clsx(
                    'rounded-lg border text-lg md:text-xl h-[50px]',
                    currentStakeType === 'sbee'
                      ? 'shadow-button-light bg-co-bg-white'
                      : 'shadow-button-dark text-co-text-white bg-co-gray-7'
                  )}
                >
                  Stake $SBEE
                </Button>
                <Button
                  onClick={handleUniButtonClick}
                  className={clsx(
                    'rounded-lg border text-lg md:text-xl h-[50px]',
                    currentStakeType === 'uni'
                      ? 'shadow-button-light bg-co-bg-white'
                      : 'shadow-button-dark text-co-text-white bg-co-gray-7'
                  )}
                >
                  Stake UNI V2
                </Button>
              </>
            )}

            {!isConnected && (
              <Button
                onClick={handleCollectButtonClick}
                className='rounded-lg border px-20 text-lg h-[50px]'
              >
                Connect Wallet
              </Button>
            )}
          </div>
          {currentStakeType === 'sbee' && isConnected && <SbeeStaking />}

          {currentStakeType === 'uni' && isConnected && <LpStaking />}

          <div className='w-full text-left text-lg mt-4'>FAQ</div>

          <div className='rounded-2xl border bg-co-bg-white w-full px-6 py-2 mt-4'>
            <Accordion>
              <AccordionItem
                title={
                  <span className='text-sm font-bold'>
                    What is $SBEE Staking and why is it incentivized?
                  </span>
                }
                indicator={({ isOpen }) => {
                  return (
                    <ArrowDownIcon
                      className={clsx(isOpen ? '-rotate-90' : 'rotate-0')}
                    />
                  )
                }}
                isCompact={true}
              >
                <div className='text-xs opacity-80 text-left'>
                  $SBEE Staking allows you to lock up your $SBEE holdings in a
                  staking pool to earn additional tokens. Incentives encourage
                  long-term holding and align holder interests with ecosystem
                  success.
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='rounded-2xl border bg-co-bg-white w-full px-6 py-2 mt-4'>
            <Accordion>
              <AccordionItem
                title={
                  <span className='text-sm font-bold'>
                    How are rewards calculated in the $SBEE Staking Pool?
                  </span>
                }
                indicator={({ isOpen }) => {
                  return (
                    <ArrowDownIcon
                      className={clsx(isOpen ? '-rotate-90' : 'rotate-0')}
                    />
                  )
                }}
                isCompact={true}
              >
                <div className='text-xs opacity-80 text-left'>
                  Rewards are distributed every minute based on the amount and
                  duration of your stake, proportional to your share of the
                  total staked $SBEE.
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='rounded-2xl border bg-co-bg-white w-full px-6 py-2 mt-4'>
            <Accordion>
              <AccordionItem
                title={
                  <span className='text-sm font-bold'>
                    Can I unstake anytime?
                  </span>
                }
                indicator={({ isOpen }) => {
                  return (
                    <ArrowDownIcon
                      className={clsx(isOpen ? '-rotate-90' : 'rotate-0')}
                    />
                  )
                }}
                isCompact={true}
              >
                <div className='text-xs opacity-80 text-left'>
                  Yes, you can unstake at any time without any lock-up period,
                  with immediate access to your tokens and unclaimed rewards.
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='rounded-2xl border bg-co-bg-white w-full px-6 py-2 mt-4'>
            <Accordion>
              <AccordionItem
                title={
                  <span className='text-sm font-bold'>
                    What is the Liquidity Provider Pool and how do I earn
                    rewards?
                  </span>
                }
                indicator={({ isOpen }) => {
                  return (
                    <ArrowDownIcon
                      className={clsx(isOpen ? '-rotate-90' : 'rotate-0')}
                    />
                  )
                }}
                isCompact={true}
              >
                <div className='text-xs opacity-80 text-left'>
                  The Liquidity Provider Pool rewards users for providing
                  liquidity to the $SBEE token pair on Uniswap v2. Earn $SBEE
                  rewards and an ordinal airdrop by staking your LP tokens in
                  the pool.
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div className='rounded-2xl border bg-co-bg-white w-full px-6 py-2 mt-4'>
            <Accordion>
              <AccordionItem
                title={
                  <span className='text-sm font-bold'>
                    Are there any risks involved in staking or providing
                    liquidity?
                  </span>
                }
                indicator={({ isOpen }) => {
                  return (
                    <ArrowDownIcon
                      className={clsx(isOpen ? '-rotate-90' : 'rotate-0')}
                    />
                  )
                }}
                isCompact={true}
              >
                <div className='text-xs opacity-80 text-left'>
                  Staking and providing liquidity offer rewards but come with
                  risks such as impermanent loss and value fluctuations of
                  $SBEE. Understand these risks before participating.
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default StakingPage
