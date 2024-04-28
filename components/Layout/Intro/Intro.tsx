import { FC, useState } from 'react'
import Lottie from 'react-lottie'
import { Image } from '@nextui-org/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import Clouds from '@assets/json/Clouds.json'
import Button from '@components/Button/Button'
import { useStore } from '@store/store'

export interface IntroProps {}

const Intro: FC<IntroProps> = () => {
  const [isStopped, setIsStopped] = useState(true)
  const [frensVisible, setFrensVisible] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [exploreVisible, setExploreVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hidden, setHidden] = useState(false)

  const { isEntered, setIsEntered } = useStore((store) => ({
    isEntered: store.isEntered,
    setIsEntered: store.setIsEntered
  }))

  const width =
    typeof global.window === 'undefined' ? 800 : global.window.innerWidth
  const height =
    typeof global.window === 'undefined' ? 800 : global.window.innerHeight

  const handleVisitVillage = () => {
    setIsStopped(false)
    setLoading(true)
    setTimeout(() => {
      setIntroVisible(false)
      setFrensVisible(true)
    }, 1500)
  }

  const handleExplore = () => {
    setHidden(true)
    setTimeout(() => {
      setIsEntered(true)
      setLoading(false)
      setFrensVisible(false)
    }, 2000)
  }

  return (
    <motion.div
      className={clsx(
        'fixed w-screen h-screen top-0 left-0 z-[999]',
        isEntered && 'hidden'
      )}
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {introVisible && (
        <div
          className={clsx(
            `bg-gradient-to-b sm:bg-intro-bg bg-center bg-no-repeat bg-contain w-full z-10
              flex flex-col h-full`,
            `gap-8 absolute top-0 left-0 items-center justify-center bg-co-bg-1 from-co-bg-1
              to-co-bg-3`
          )}
        >
          <Image
            className='sm:hidden w-full h-auto'
            alt='intro'
            src='/images/svg/intro-mobile.svg'
            width={396}
          />
          <Button
            className={clsx(
              'px-[18px] pt-[10px] py-[12px] font-xl text-co-text-1 cursor-pointer hover:mb-1',
              'rounded-lg shadow-button select-none'
            )}
            onClick={handleVisitVillage}
          >
            Visit Village
          </Button>
        </div>
      )}

      <div
        className={clsx(
          'absolute w-full h-full z-20 top-0 left-0 pointer-events-none',
          loading ? 'block' : 'hidden'
        )}
      >
        <Lottie
          options={{
            loop: false,
            autoplay: false,
            animationData: Clouds,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          width={width}
          height={height}
          isStopped={isStopped}
          isPaused={false}
        />
      </div>

      {frensVisible && (
        <div className='absolute flex items-center w-full h-full justify-center left-0 top-0 z-10 px-4'>
          <div
            className='bg-co-bg-white rounded-[32px] w-full h-fit max-w-[519px] py-8 px-6 sm:px-12 flex
              flex-col items-center'
          >
            <div className='text-center text-xs sm:text-sm flex flex-col gap-3 font-bold'>
              <h2 className='text-xl'>✨GM Frens✨</h2>
              <p>Welcome to $SBEE Village</p>
              <p>
                {`GM Degens 🎲 - Luck's awake, let's roll and spin, in the game
                where the best win.`}
              </p>
              <p>
                {`GM Regens 🌿 - Plant a seed, watch growth begin, in progress's
                garden we all win.`}
              </p>
              <p>
                {`GM Punks 🤘 - Charge the future, never stop, with rebellion's
                power we'll reach the top.`}
              </p>
              <p>
                {`GM Creators 🎨 - Paint the world, find your muse, in dreams'
                canvas, innovation fuse.`}
              </p>
              <p>
                {`GM BUILDlers 🔨 - Constructing dreams, block by block, in
                success's blueprint, we firmly lock.`}
              </p>
              <p>
                {`GM Explorers 🌍 - Discover paths, minds expand, in curiosity's
                journey, new lands we command.`}
              </p>
              <p>
                {`GM N00bs 🐣 - Welcome to your quest's start, in learning's
                realm, you'll play your part.`}
              </p>
              <p>
                {`GM Anons 😎 - Hidden heroes, vast impact, in anonymity's
                shadows, your legend's intact.`}
              </p>
              <p>We shill, we craft, we build, we thrive 🦈🐝🚀✨</p>
            </div>
            <Button
              color='primary'
              className='mx-auto mt-4 rounded-lg shadow-button text-md font-bold py-[14px]'
              type='button'
              onClick={() => {
                setExploreVisible(true)
                setFrensVisible(false)
              }}
            >
              Continue ➡️
            </Button>
          </div>
        </div>
      )}
      {exploreVisible && (
        <div className='absolute flex items-center w-full h-full justify-center left-0 top-0 z-30 px-4'>
          <div
            className='bg-co-bg-white rounded-[32px] w-full h-fit max-w-[519px] py-8 px-6 flex flex-col
              items-center'
          >
            <div className='text-center text-xs flex flex-col gap-3 font-bold'>
              <h2 className='text-xl'>Airdrop Map</h2>
              <p>
                From degens to regens, your unique buzz strengthens our
                collective hive.
              </p>
              <p>
                There are many ways to qualify for Airdrop! Consider $SBEE your
                blockchain high-five, acknowledging your contributions to our
                vibrant ecosystem. 🙌✨ Click on each village and learn more
                about qualification.
              </p>
              <p>
                After your wallet is connected, we automatically calculate how
                many $SBEE you qualify for!
              </p>
              <p className='font-normal'>
                Don’t forget to post about $SBEE + join our Discord to claim
                $SBEE, get recognition for your participation!{' '}
              </p>
            </div>
            <Button
              color='primary'
              className='mx-auto mt-4 rounded-lg shadow-button text-md font-bold py-[14px]'
              type='button'
              onClick={handleExplore}
            >
              Explore
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Intro
