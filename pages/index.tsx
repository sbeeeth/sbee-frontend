import React, {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
  type WheelEvent
} from 'react'
import Carousel from 'react-multi-carousel'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextSeo } from 'next-seo'
import clsx from 'clsx'
import { Address } from 'viem'
import { BigNumber } from 'bignumber.js'
import { motion } from 'framer-motion'
import { throttle } from 'lodash'
import { useAccount, useReadContract } from 'wagmi'

import ClaimABI from '@abis/SbeeTokenClaim.json'
import Button from '@components/Button/Button'
import { LockIcon } from '@components/Icon/LockIcon'
import { InfoTypeEnum } from '@components/Modal'
import { HOUSES, InfoProps } from '@components/Modal/InfoModal'
import { DiscordURL } from '@constants/config'
import { ModalType, useModal } from '@contexts/modal'
import { useGetAirdrop } from '@services/api/airdrop'
import { useStore } from '@store/store'
import { ApiAirdropKeys } from '@type/api'

import 'react-multi-carousel/lib/styles.css'

type Building = {
  img: string
  imgColor: string
  name: string
  locked: boolean
  key: ApiAirdropKeys | 'bee' | 'gamer'
  width: number
  height: number
  left: number
  top: number
  type: InfoTypeEnum
}

const BUILDINGS: Array<Building> = [
  {
    img: '/images/svg/gamer-gray.svg',
    imgColor: '/images/svg/gamer-color.svg',
    name: "Gamer's Build",
    locked: true,
    key: 'gamer',
    width: 290,
    height: 288,
    left: 560,
    top: 158,
    type: InfoTypeEnum.GAMER_GUILD
  },
  {
    img: '/images/svg/bee-2-gray.svg',
    imgColor: '/images/svg/bee-2-color.svg',
    name: "Creator's Canvas",
    locked: true,
    key: 'nftContractCreatorAmount',
    width: 355,
    height: 288,
    left: 900,
    top: 968,
    type: InfoTypeEnum.CREATOR_CANVAS
  },
  {
    img: '/images/svg/flower-gray.svg',
    imgColor: '/images/svg/flower-color.svg',
    name: 'Meme Magic Meadow',
    locked: true,
    key: 'memeHolderAmount',
    width: 335,
    height: 329,
    left: 652,
    top: 1384,
    type: InfoTypeEnum.MEME_MAGIC_MEADOW
  },
  {
    img: '/images/svg/bee-gray.svg',
    imgColor: '/images/svg/bee-color.svg',
    name: 'Shillers Square',
    locked: false,
    key: 'bee',
    width: 270,
    height: 252,
    left: 298,
    top: 1127,
    type: InfoTypeEnum.SHILLERS_SQUARE
  },
  {
    img: '/images/svg/fan-gray.svg',
    imgColor: '/images/svg/fan-color.svg',
    name: 'Profile Point',
    locked: true,
    key: 'ensHolderAmount',
    width: 294,
    height: 322,
    left: 900,
    top: 1900,
    type: InfoTypeEnum.PROFILE_POINT
  },
  {
    img: '/images/svg/honey-2-gray.svg',
    imgColor: '/images/svg/honey-2-color.svg',
    name: 'Regen Retreat',
    locked: true,
    key: 'gitcoinDonorAmount',
    width: 270,
    height: 422,
    left: 1138,
    top: 1465,
    type: InfoTypeEnum.REGEN_RETREAT
  },
  {
    img: '/images/svg/honey-gray.svg',
    imgColor: '/images/svg/honey-color.svg',
    name: 'Contributor’s Cove',
    locked: true,
    key: 'openSourceContributorAmount',
    width: 320,
    height: 326,
    left: 1120,
    top: 600,
    type: InfoTypeEnum.CONTRIBUTER_COVE
  },
  {
    img: '/images/svg/house1-gray.svg',
    imgColor: '/images/svg/house1-color.svg',
    name: 'Pixel Plaza',
    locked: true,
    key: 'nftHolderAmount',
    width: 329,
    height: 300,
    left: 43,
    top: 848,
    type: InfoTypeEnum.PIXEL_PALZA
  },
  {
    img: '/images/svg/red-flower-gray.svg',
    imgColor: '/images/svg/red-flower-color.svg',
    name: 'BUIDLers Borough',
    locked: true,
    key: 'developerAmount',
    width: 258,
    height: 324,
    left: 862,
    top: 373,
    type: InfoTypeEnum.BUIDLERS_BOROUGH
  }
]

const IndexPage: NextPage = () => {
  const leftRef = useRef(0)
  const topRef = useRef(0)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const isEntered = useStore((store) => store.isEntered)
  const router = useRouter()

  const { address } = useAccount()
  const { showModal, hideModal } = useModal()
  const setAirdrop = useStore((store) => store.setAirdrop)
  const [isClaimed, setIsClaimed] = useState(false)

  const { data: airdropData } = useGetAirdrop(address, {
    enabled: !!address
  })
  const { data: isClaimedData } = useReadContract({
    abi: ClaimABI,
    address: process.env.NEXT_PUBLIC_CLAIM_ADDRESS as Address,
    functionName: 'isClaimed',
    args: [address],
    query: { enabled: !!address }
  })

  useEffect(() => {
    setAirdrop(airdropData?.data)
  }, [setAirdrop, airdropData])

  useEffect(() => {
    if (isClaimedData) setIsClaimed(!!isClaimedData)
  }, [isClaimedData])

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (!canvasRef.current) {
      return
    }
    const currentTop = topRef.current
    const targetY = currentTop - e.deltaY

    topRef.current = Math.max(
      Math.min(targetY, 0),
      Math.min(window.innerHeight - 2504, 0)
    )

    canvasRef.current.style.top = `${topRef.current}px`
  }

  const handleCanvasMousedown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    let startX = e.pageX
    let startY = e.pageY

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (!canvasRef.current) {
        return
      }

      const x = e.pageX
      const y = e.pageY

      const disX = x - startX
      const disY = y - startY

      const currentLeft = leftRef.current
      const targetX = currentLeft + disX
      leftRef.current = Math.max(
        Math.min(targetX, 0),
        Math.min(window.innerWidth - 1440, 0)
      )

      const currentTop = topRef.current
      const targetY = currentTop + disY
      topRef.current = Math.max(
        Math.min(targetY, 0),
        Math.min(window.innerHeight - 2504, 0)
      )

      canvasRef.current.style.left = `${leftRef.current}px`
      canvasRef.current.style.top = `${topRef.current}px`

      startX = x
      startY = y
    }, 20)

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleBuildingClick = (infoType: InfoTypeEnum) => {
    showModal(ModalType.INFO_MODAL, {
      infoType,
      isClaimed,
      onClose: () => {
        hideModal()
      }
    })
  }

  const getImageUrl = (building: Building | InfoProps) => {
    if (building.key === 'bee') {
      return building.imgColor
    }

    if (!airdropData?.data) {
      return building.img
    }

    const amount = airdropData?.data[building.key as ApiAirdropKeys]

    if (amount && BigNumber(amount).isGreaterThan(0)) {
      return building.imgColor
    }

    return building.img
  }

  return (
    <div
      className='max-w-[1440px] w-full mx-auto relative overflow-hidden h-[calc(100vh-70px)]
        touch-none'
    >
      <NextSeo
        title='SharkBee Coin | Experience the Buzz of $SBEE'
        description='Dive into the world of SharkBee Coin and explore $SBEE, the token fueling a regenerative blockchain ecosystem. #BeeTheMovement'
        canonical='https://sharkbeecoin.com'
        openGraph={{
          url: 'https://sharkbeecoin.com',
          title: 'SharkBee Coin | Experience the Buzz of $SBEE',
          description:
            'Dive into the world of SharkBee Coin and explore $SBEE, the token fueling a regenerative blockchain ecosystem. #BeeTheMovement',
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
        style={{ left: `${leftRef.current}px`, top: `${topRef.current}px` }}
        onMouseDown={handleCanvasMousedown}
        onWheel={handleWheel}
        ref={canvasRef}
        className='absolute bg-[url(/images/svg/layer.svg)] bg-center bg-no-repeat
          bg-[length:100%_100%] w-[1440px] h-[2444px]'
      >
        {BUILDINGS.map((building) => {
          return (
            <div
              key={building.key}
              style={{ left: `${building.left}px`, top: `${building.top}px` }}
              className={
                'absolute flex justify-center hover:-mt-2 cursor-pointer select-none'
              }
              onClick={() => handleBuildingClick(building.type)}
            >
              {building.name && (
                <span
                  className='absolute z-20 flex items-center justify-center gap-2 bg-co-bg-2 text-co-text-2
                    px-4 py-1 rounded-md -top-12'
                >
                  {building.name}
                  {building.locked && <LockIcon />}
                </span>
              )}
              <Image
                src={getImageUrl(building)}
                alt={building.name}
                width={building.width}
                height={building.height}
                style={{
                  minWidth: `${building.width}px`,
                  height: `${building.height}px`
                }}
              />
            </div>
          )
        })}
      </div>

      <div
        className='bg-[url(/images/svg/layer.svg)] block sm:hidden bg-center bg-no-repeat
          bg-[length:100%_100%] w-full h-[calc(100vh-70px)]'
      >
        <motion.div
          className='w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: isEntered ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Carousel
            responsive={{
              superLargeDesktop: {
                items: 1,
                breakpoint: { max: 300000, min: 3000 },
                partialVisibilityGutter: 60
              },
              desktop: {
                items: 1,
                breakpoint: { max: 3000, min: 1024 },
                partialVisibilityGutter: 60
              },
              tablet: {
                items: 1,
                breakpoint: { max: 1024, min: 464 },
                partialVisibilityGutter: 60
              },
              mobile: {
                items: 1,
                breakpoint: { max: 464, min: 0 },
                partialVisibilityGutter: 60
              }
            }}
            draggable
            swipeable
            ssr
            infinite
            containerClass={clsx(
              'mt-[6vh] h-[75vh]',
              isEntered ? 'opacity-100' : 'opacity-0'
            )}
            itemClass='translate-x-[30px]'
            partialVisible={true}
            arrows={false}
          >
            {Object.entries(HOUSES).map(([key, info]) => {
              const amount =
                info.key === 'bee' || !airdropData?.data
                  ? 0
                  : airdropData?.data[info.key as ApiAirdropKeys]

              const amountGreaterThan0 =
                !!amount && BigNumber(amount).isGreaterThan(0)

              return (
                <div className='px-1 h-[75vh]' key={key}>
                  <div
                    className='border h-full bg-white w-full rounded-xl flex flex-col items-center
                      justify-center'
                  >
                    <Image
                      className={'max-w-[220px] sm:h-[324px] w-auto h-[220px]'}
                      src={getImageUrl(info)}
                      height={324}
                      width={324}
                      alt={info.title}
                    />
                    {!amountGreaterThan0 && (
                      <>
                        <span className='text-co-text-black text-[20px] sm:text-2xl font-bold mt-5'>
                          {info.title}
                        </span>
                        <div className='max-h-[180px] h-fit overflow-y-auto mt-2'>
                          <p
                            className='text-co-text-black opacity-50 font-bold text-base sm:text-lg mt-2 text-center
                              px-4'
                          >
                            {info.text}
                          </p>
                          {info.text2 && (
                            <p
                              className='text-co-text-black opacity-50 font-bold text-base sm:text-lg px-4 mt-4
                                text-center'
                            >
                              {info.text2}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                    {amountGreaterThan0 && (
                      <>
                        <p className='text-co-text-black text-md px-4 mt-8 text-center'>
                          HOORAY! YOU&apos;RE ELIGIBLE FOR NFT HOLDERS AIRDROP
                        </p>
                        <div className='text-xl text-co-text-black mt-4 text-center'>
                          89,375 $SBEE
                        </div>
                      </>
                    )}
                    <Button
                      color='primary'
                      className='rounded-lg shadow-button mt-4 text-base py-2 select-none'
                      disabled={isClaimed}
                      onClick={() => {
                        const { target, action } = info

                        if (amountGreaterThan0 || info.key === 'bee') {
                          if (target === '_blank') {
                            setTimeout(() => {
                              window.open(action, target)
                            }, 100)
                          } else {
                            router.push(action)
                          }
                        }
                      }}
                    >
                      {amountGreaterThan0 ? 'Claimed' : info.buttonText}
                    </Button>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </motion.div>
      </div>

      <div
        className='flex absolute top-0 left-0 bg-co-bg-5 w-full gap-4 py-3 items-center
          justify-center text-sm px-2'
      >
        <span className='text-wrap text-co-text-white'>
          Share a tweet with #SBEE & Join Discord to get 20,000 $SBEE!
        </span>
        <Link
          href={DiscordURL}
          className='text-co-text-yellow underline text-nowrap'
          target='_blank'
        >
          Earn now
        </Link>
      </div>

      <div
        className='absolute bottom-0 z-30 left-0 w-full h-fit py-2 sm:py-0 sm:h-[104px] flex
          items-center justify-center bg-co-bg-4'
      >
        <div className='text-xs sm:text-md flex flex-col items-center sm:items-start'>
          <span className='text-co-text-8 px-4 hidden sm:block'>
            Smart contract
          </span>
          <div className='flex gap-x-4 gap-y-1 items-center mt-1 sm:mt-3 flex-wrap px-4 justify-center'>
            <div className='flex items-center gap-2'>
              <span className='inline-block sm:hidden'>CA:</span>
              <span className='border-none sm:border-b-2 border-co-border-primary'>
                0x7Ae0f19D2aE2f490e710579284A58000d4E8C85f
              </span>
              <Link
                href='https://etherscan.io/address/0x7Ae0f19D2aE2f490e710579284A58000d4E8C85f'
                className='hidden sm:inline-block'
                target='_blank'
              >
                <Image
                  src='/images/svg/open-contract.svg'
                  alt='open contract'
                  className='w-2 sm:w-3'
                  width={12}
                  height={12}
                />
              </Link>
            </div>
            <Link
              target='_blank'
              href='https://etherscan.io/address/0x7Ae0f19D2aE2f490e710579284A58000d4E8C85f'
            >
              <Image
                src='/images/svg/etherscan.svg'
                alt='etherscan'
                className='w-3 sm:w-6'
                width={24}
                height={24}
              />
            </Link>
            <Link
              href='https://app.uniswap.org/swap?inputCurrency=0x7ae0f19d2ae2f490e710579284a58000d4e8c85f&outputCurrency=ETH'
              className='hidden sm:inline-block'
              target='_blank'
            >
              <Image
                src='/images/svg/uniswap.svg'
                alt='uniswap'
                className='w-3 sm:w-6'
                width={24}
                height={24}
              />
            </Link>
            <Link
              href='https://www.coingecko.com/en/coins/sharkbee'
              className='hidden sm:inline-block'
              target='_blank'
            >
              <Image
                src='/images/svg/coingeico.svg'
                alt='uniswap'
                className='w-3 sm:w-6'
                width={24}
                height={24}
              />
            </Link>
            <Link
              href='https://dexscreener.com/ethereum/0xb74ee901c2b0a04d75d38f7f4722e8a848e613b9'
              className='hidden sm:inline-block'
              target='_blank'
            >
              <Image
                src='/images/svg/dex.svg'
                alt='uniswap'
                className='w-3 sm:w-6'
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
