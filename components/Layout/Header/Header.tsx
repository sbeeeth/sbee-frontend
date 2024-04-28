'use client'

import React, { type ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle
} from '@nextui-org/react'
import numeral from 'numeral'
import { useAccount } from 'wagmi'

import Button from '@components/Button/Button'
import WalletButton from '@components/Button/WalletButton'
import { MenuIcon } from '@components/Icon/MenuIcon'
import { MenuXIcon } from '@components/Icon/MenuXIcon'
import { useGetAirdrop } from '@services/api/airdrop'
import { calcTotal } from '@utils/common'

type MenuItem = {
  href?: string
  label: string
  openNewTab?: boolean
  children?: MenuItem[]
  icon?: ReactNode
}

type SocialItem = {
  href: string
  icon: ReactNode
}

interface HeaderProps {
  menuItems: MenuItem[]
  socialItems: SocialItem[]
}

const Header = ({ menuItems, socialItems }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [totalAirdrop, setTotalAirdrop] = useState('0')
  const router = useRouter()

  const getNavMenuItem = (item: MenuItem) => {
    const { href, label, openNewTab, children, icon } = item

    if (children?.length) {
      return (
        <Dropdown
          key={label}
          className='bg-co-button-primary-bg p-0 overflow-hidden'
        >
          <NavbarItem>
            <DropdownTrigger>
              <div className='flex items-center justify-center text-co-text-1 font-normal cursor-pointer'>
                <span className='text-co-text-1 text-[16px]'>{item.label}</span>
                {item.icon}
              </div>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            className='px-0 flex flex-col items-start'
            itemClasses={{
              base: 'gap-4 px-4 font-normal data-[hover=true]:text-co-button-primary-bg data-[hover=true]:bg-co-button-primary-text '
            }}
          >
            {children.map((child) => {
              return (
                <DropdownItem key={child.label}>
                  <div className='flex items-center justify-start w-full'>
                    {child.href ? (
                      <Link
                        href={child.href}
                        target={openNewTab ? '_blank' : '_self'}
                        className='text-[16px] font-normal w-full'
                      >
                        {child.label}
                      </Link>
                    ) : (
                      <span className='text-[16px] font-normal'>
                        {child.label}
                      </span>
                    )}
                    {child.icon}
                  </div>
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      )
    }

    return (
      <NavbarItem key={label}>
        <div className='flex items-center justify-start w-full cursor-pointer'>
          {href ? (
            <Link
              href={href}
              target={openNewTab ? '_blank' : '_self'}
              className='text-co-text-1 text-[16px] font-normal w-full'
            >
              {label}
            </Link>
          ) : (
            <span className='text-co-text-1 text-[16px] font-normal'>
              {label}
            </span>
          )}
          {icon}
        </div>
      </NavbarItem>
    )
  }

  const { address } = useAccount()

  const { data: airdropData } = useGetAirdrop(address)

  useEffect(() => {
    if (airdropData?.data) {
      const total = calcTotal(airdropData.data)

      setTotalAirdrop(total.dividedBy(10 ** 18).toString())
    }
  }, [airdropData])

  return (
    <div className='bg-co-bg-1 flex items-center justify-center sticky top-0 z-50'>
      <Navbar
        maxWidth='full'
        isMenuOpen={isMenuOpen}
        className='bg-co-bg-1 h-[66px] mt-1 max-w-[1440px]'
        classNames={{
          base: 'px-6',
          wrapper: 'px-0'
        }}
      >
        <NavbarContent
          justify='start'
          className='data-[justify=start]:flex-grow-0 w-[200px]'
        >
          <NavbarBrand className=''>
            <Link href='/'>
              <Image
                src='/images/png/sbee-logo.png'
                className='max-w-[100px]'
                width={100}
                alt='token-id'
              />
            </Link>
          </NavbarBrand>
          {address && (
            <div className='flex items-center gap-4'>
              <div className='min-w-fit'>
                <span className='text-xs opacity-60'>Tokens to claim</span>
                <p className='text-sm'>
                  <span>{numeral(totalAirdrop).format('0,0')}</span> $SBEE
                </p>
              </div>
              <Button
                color='primary'
                className='rounded-lg shadow-button-ghost bg-transparent border border-co-gray-1 text-md
                  pt-2 pb-[10px]'
                onClick={() => router.push('/claim')}
              >
                Claim
              </Button>
            </div>
          )}
        </NavbarContent>

        <NavbarContent className='sm:hidden' justify='end'>
          <NavbarMenuToggle
            className='sm:hidden'
            onChange={setIsMenuOpen}
            icon={(isOpen) =>
              isOpen ? <MenuXIcon className='text-co-text-1' /> : <MenuIcon />
            }
          ></NavbarMenuToggle>
        </NavbarContent>

        <NavbarContent
          className='ml-[100px] hidden sm:flex gap-8'
          justify='end'
        >
          <div className='flex gap-2 items-center justify-center'>
            {socialItems.map((item) => {
              return (
                <NavbarItem key={item.href}>
                  <Link href={item.href} target='_blank'>
                    {item.icon}
                  </Link>
                </NavbarItem>
              )
            })}
          </div>

          {menuItems.map((item) => getNavMenuItem(item))}
          <WalletButton />
        </NavbarContent>

        <NavbarMenu className='bg-co-bg-1 pt-14 gap-4 font-comic h-fit'>
          <Accordion showDivider={false}>
            {menuItems.map((item) => {
              return (
                <AccordionItem
                  isCompact={true}
                  key={item.label}
                  aria-label={item.label}
                  title={
                    <div className='text-co-text-1 flex items-center gap-1'>
                      {item?.children?.length ? (
                        <>
                          {item.label} {item.icon}
                        </>
                      ) : (
                        <Link
                          href={item.href!}
                          target={item.openNewTab ? '_blank' : '_self'}
                          onClick={() => setIsMenuOpen(false)}
                          className='w-full flex gap-1 items-center'
                        >
                          {item.label} {item.icon}
                        </Link>
                      )}
                    </div>
                  }
                >
                  <div className='text-co-text-1 flex flex-col gap-2 pl-4'>
                    {item.children?.map((child) =>
                      child.href ? (
                        <Link
                          className='w-full'
                          href={child.href}
                          target={child.openNewTab ? '_blank' : '_self'}
                          onClick={() => setIsMenuOpen(false)}
                          key={child.label}
                        >
                          {child.label}
                        </Link>
                      ) : (
                        <span key={child.label}>{child.label}</span>
                      )
                    )}
                  </div>
                </AccordionItem>
              )
            })}
          </Accordion>
          <WalletButton onClick={() => setIsMenuOpen(false)} />
          <div className='flex gap-2 items-center'>
            {socialItems.map((item) => {
              return (
                <NavbarItem key={item.href}>
                  <Link
                    href={item.href}
                    target='_blank'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                  </Link>
                </NavbarItem>
              )
            })}
          </div>
        </NavbarMenu>
      </Navbar>
    </div>
  )
}

Header.displayName = 'Header'
export default Header
