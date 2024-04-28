import { FC } from 'react'
import dynamic from 'next/dynamic'

import { DiscordIcon } from '@components/Icon/DiscordIcon'
import { NewIcon } from '@components/Icon/NewIcon'
import { TelegramIcon } from '@components/Icon/TelegramIcon'
import { XIcon } from '@components/Icon/XIcon'
import { DiscordURL, TelegramURL, TwitterURL } from '@constants/config'

import Header from './Header/Header'

const NoSSRIntro = dynamic(() => import('./Intro/Intro'), { ssr: false })

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const menuItems = [
    {
      label: 'Airdrop',
      href: '/airdrop'
    },
    {
      label: 'Staking',
      href: '/staking',
      icon: <NewIcon />
    },
    {
      label: 'About',
      children: [
        {
          label: '$SBEE',
          href: '/about'
        },
        {
          label: 'Roadmap',
          href: '/roadmap'
        },
        {
          label: 'Tokenomics',
          href: '/tokenomics'
        }
      ]
    },
    {
      label: 'Game Guild',
      href: '/play'
    }
  ]

  const socialItems = [
    {
      href: DiscordURL,
      icon: <DiscordIcon />
    },
    {
      href: TwitterURL,
      icon: <XIcon />
    },
    {
      href: TelegramURL,
      icon: <TelegramIcon />
    }
  ]

  return (
    <div className='flex bg-co-bg-1 font-comic'>
      <main className='flex-1 max-w-full mx-auto'>
        {/* Margin Wrapper */}
        <div className='flex min-h-screen flex-col'>
          {/* Header */}
          <Header menuItems={menuItems} socialItems={socialItems} />
          {/* Page Wrapper */}
          <div className='flex flex-grow flex-1 flex-col text-co-text-1 bg-co-bg-1'>
            {children}
          </div>
        </div>
      </main>
      <NoSSRIntro />
    </div>
  )
}

export default Layout
