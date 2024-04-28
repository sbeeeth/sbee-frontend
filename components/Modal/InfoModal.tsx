import { useRouter } from 'next/navigation'
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import numeral from 'numeral'
import { BigNumber } from 'bignumber.js'

import Button from '@components/Button/Button'
import { DiscordURL } from '@constants/config'
import { useStore } from '@store/store'
import { ApiAirdropKeys } from '@type/api'

export enum InfoTypeEnum {
  GAMER_GUILD = 'gamer_guild',
  BUIDLERS_BOROUGH = 'buidlers_borough',
  CONTRIBUTER_COVE = 'contributer_cove',
  CREATOR_CANVAS = 'creator_canvas',
  PIXEL_PALZA = 'pixel_plaza',
  MEME_MAGIC_MEADOW = 'meme_magic_meadow',
  REGEN_RETREAT = 'regen_retreat',
  PROFILE_POINT = 'profile_point',
  SHILLERS_SQUARE = 'shillers_square'
}

export interface InfoModalProps {
  infoType: InfoTypeEnum
  onClose: () => void
  isClaimed: boolean
}

export type InfoProps = {
  img: string
  imgColor: string
  title: string
  text: string
  text2?: string
  buttonText: string
  action: string
  key: ApiAirdropKeys | 'bee'
  target?: '_blank' | '_self'
}

export const HOUSES: Record<InfoTypeEnum, InfoProps> = {
  [InfoTypeEnum.GAMER_GUILD]: {
    img: '/images/svg/gamer-gray.svg',
    imgColor: '/images/svg/gamer-color.svg',
    title: `Gamer's Guild`,
    text: 'Welcome to the heart of GameFi with Flappy Sharkbee, the ultimate Play2Earn experience! Compete in leaderboard challenges for a chance to win $SBEE tokens!',
    buttonText: 'Play',
    action: '/play',
    key: 'bee'
  },
  [InfoTypeEnum.BUIDLERS_BOROUGH]: {
    img: '/images/svg/red-flower-gray.svg',
    imgColor: '/images/svg/red-flower-color.svg',
    title: 'BUIDLers Borough',
    text: "Calling all smart contract wizards! Let's BUIDL the future, one line of code at a time. If you’ve deployed code to GitHub, you're in for an airdrop!",
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'developerAmount'
  },
  [InfoTypeEnum.CONTRIBUTER_COVE]: {
    img: '/images/svg/honey-gray.svg',
    imgColor: '/images/svg/honey-color.svg',
    title: 'Contributor’s Cove',
    text: 'Your open-source contributions are the backbone of innovation. We’re celebrating the top 5000 open source projects contributors with an airdrop.',
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'openSourceContributorAmount'
  },
  [InfoTypeEnum.CREATOR_CANVAS]: {
    img: '/images/svg/bee-2-gray.svg',
    imgColor: '/images/svg/bee-2-color.svg',
    title: "Creator's Canvas",
    text: "Step into the vibrant Creator's Canvas, where your imagination knows no bounds. If you've created NFTs on SuperRare, Zora, OpenSea, Rarible, Manifold, or MakersPlace, you're in line for an airdrop!",
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'nftContractCreatorAmount'
  },
  [InfoTypeEnum.PIXEL_PALZA]: {
    img: '/images/svg/house1-gray.svg',
    imgColor: '/images/svg/house1-color.svg',
    title: 'Pixel Plaza',
    text: "Welcome to Pixel Plaza, where your prized digital assets take center stage. If you hold NFTs from the projects listed below, you're eligible for an airdrop!",
    text2:
      'Cryptokitties, Cryptopunks, Mutant Ape Yacht Club, Bored Ape Yacht Club, Pudgy Penguins, Milady Maker, The Memes by Punk6529, Mfers, Sappy Seals, Opepen, Azuki, Cool Cats, Meebits, DeGods, Kanpai Pandas, Forgotten Runes Wizards Cult, Sproto Gremlins, Treeverse Plots, World of Women, Wassies by Wassies, Checks - VV Edition, Memeland Captainz, 0N1 Force, Mavia Land, rektguy, Artblocks, Women and Weapons',
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'nftHolderAmount'
  },
  [InfoTypeEnum.MEME_MAGIC_MEADOW]: {
    img: '/images/svg/flower-gray.svg',
    imgColor: '/images/svg/flower-color.svg',
    title: 'Meme Magic Meadow',
    text: "Join the festivities at Meme Magic Meadow, where laughter and good vibes are always in bloom. You're in for an airdrop if you hold: $BONK, $PORK, $POND, $MOG, and $PEPE on ETH!",
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'memeHolderAmount'
  },
  [InfoTypeEnum.REGEN_RETREAT]: {
    img: '/images/svg/honey-2-gray.svg',
    imgColor: '/images/svg/honey-2-color.svg',
    title: 'Regen Retreat',
    text: "Embrace the spirit of giving at Regen Retreat, where every contribution makes a difference. Have a Gitcoin Passport? You're eligible for an airdrop!",
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'gitcoinDonorAmount'
  },
  [InfoTypeEnum.PROFILE_POINT]: {
    img: '/images/svg/fan-gray.svg',
    imgColor: '/images/svg/fan-color.svg',
    title: 'Profile Point',
    text: "Dive into decentralized identity at Profile Point, where privacy and self-sovereignty reign supreme. If you own an ENS username, you're on the list for an airdrop!",
    buttonText: 'Keep Exploring',
    action: '/claim',
    key: 'ensHolderAmount'
  },
  [InfoTypeEnum.SHILLERS_SQUARE]: {
    img: '/images/svg/bee-gray.svg',
    imgColor: '/images/svg/bee-color.svg',
    title: 'Shillers Square',
    text: "If you love engaging with the $SBEE community on Discord / X / TG, you're eligible for an airdrop! Share your crypto journey, tweet with #SBEE, and join Discord to claim $SBEE!",
    buttonText: 'Join Discord & Claim $SBEE',
    action: DiscordURL,
    key: 'bee',
    target: '_blank'
  }
}

export const InfoModal = ({ onClose, infoType, isClaimed }: InfoModalProps) => {
  const airdrop = useStore((store) => store.airdrop)
  const router = useRouter()

  const getImageUrl = (info: InfoProps) => {
    if (info.key === 'bee') {
      return info.imgColor
    }

    const amount = airdrop?.[info.key]

    if (amount && BigNumber(amount).isGreaterThan(0)) {
      return info.imgColor
    }

    return info.img
  }

  const getText = (info: InfoProps) => {
    const amount = info.key === 'bee' ? 0 : airdrop?.[info.key]

    if (amount && BigNumber(amount).isGreaterThan(0)) {
      return (
        <>
          <p className='text-co-text-black text-md px-4 mt-8 text-center'>
            HOORAY! YOU&apos;RE ELIGIBLE FOR NFT HOLDERS AIRDROP
          </p>
          <div className='text-xl text-co-text-black mt-4 text-center'>
            {numeral(BigNumber(amount).dividedBy(10 ** 18)).format('0,0')} $SBEE
          </div>
        </>
      )
    }

    return (
      <>
        <span className='text-co-text-black text-[20px] sm:text-2xl font-bold mt-5'>
          {info.title}
        </span>
        <p className='text-co-text-black opacity-50 font-bold text-base sm:text-lg mt-2 text-center'>
          {info.text}
        </p>
        {info.text2 && (
          <p className='text-co-text-black opacity-50 font-bold text-base sm:text-lg mt-4 text-center'>
            {info.text2}
          </p>
        )}
      </>
    )
  }

  const getButton = (info: InfoProps) => {
    const amount = info.key === 'bee' ? 0 : airdrop?.[info.key]
    const amountGreaterThan0 = amount && BigNumber(amount).isGreaterThan(0)

    if (amountGreaterThan0 && isClaimed) {
      return (
        <Button
          color='primary'
          disabled
          className='rounded-lg shadow-button mt-10 text-base py-2 select-none'
        >
          Claimed
        </Button>
      )
    }

    return (
      <Button
        color='primary'
        className='rounded-lg shadow-button mt-10 text-base py-2 select-none'
        onClick={() => {
          onClose()
          const { target, action } = info

          if (amountGreaterThan0 || info.key === 'bee') {
            if (target === '_blank') {
              window.open(action, target)
            } else {
              router.push(action)
            }
          }
        }}
      >
        {info.buttonText}
      </Button>
    )
  }

  const getContent = () => {
    const info = HOUSES[infoType]

    return (
      <div
        className='w-full flex flex-col items-center pt-4 sm:pt-12 px-0 sm:px-20 justify-center
          font-comic'
      >
        <Image
          className={'h-[260px] sm:h-[324px] w-[260px]'}
          src={getImageUrl(info)}
          height={324}
          width={324}
          alt={info.title}
        />
        {getText(info)}
        {getButton(info)}
      </div>
    )
  }

  return (
    <Modal
      className='mt-8'
      size='3xl'
      placement='top'
      isOpen={true}
      onClose={onClose}
      hideCloseButton
    >
      <ModalContent className='py-8 bg-co-bg-white'>
        <ModalBody>{getContent()}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
