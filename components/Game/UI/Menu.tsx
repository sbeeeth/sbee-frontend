import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useAccountEffect, useBalance } from 'wagmi'

import sounds from '../modules/sounds'
import { tokenAddresses } from '../modules/token-util'

import MenuIcon from './MenuIcon'
import MenuOption from './MenuOption'

import styles from '../gamestyle.module.css'

const Menu = ({
  showOptions,
  onStart,
  onRestart,
  onResume,
  onWalletConnect,
  onInfo,
  onLeaderboard,
  onSubmit
}: {
  showOptions: string[]
  onStart: () => void
  onRestart: () => void
  onResume: () => void
  onWalletConnect: () => void
  onInfo: () => void
  onLeaderboard: () => void
  onSubmit: () => void
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isSoundOn, setIsSoundOn] = useState(sounds.isOn)
  const [statusUpdate, setStatusUpdate] = useState(0)
  const { address, isConnected } = useAccount()
  const balances = useBalance({
    address,
    token: tokenAddresses.SBEE as `0x${string}`
  })
  let balance = '0'
  if (balances.data) {
    balance = formatUnits(balances.data.value, balances.data.decimals)
  }
  useAccountEffect({
    onConnect: () => {
      if (balances.data) {
        balance = formatUnits(balances.data.value, balances.data.decimals)
      }
      setStatusUpdate((x) => x + 1)
    },
    onDisconnect: () => {
      balance = '0'
      setStatusUpdate((x) => x + 1)
    }
  })

  const toggleSound = useCallback(() => {
    sounds.toggle()
    setIsSoundOn(sounds.isOn)
  }, [setIsSoundOn])

  const allOptions: any = useMemo(() => {
    return {
      start: {
        text: <div className={styles.button}>Start Game</div>,
        action: onStart
      },
      restart: {
        text: <div className={styles.button}>Restart Game</div>,
        action: onRestart
      },
      resume: {
        text: <div className={styles.button}>Resume Game</div>,
        action: onResume
      },
      connect: {
        text: !isConnected ? (
          <div className={styles.button}>
            <div>Connect Wallet</div>
            <div className={styles.subtext}>($SBEE holders +20% score!)</div>
          </div>
        ) : (
          <div>
            {displayAddress(address!)}
            <br />
            $SBEE: {balance}
          </div>
        ),
        action: !isConnected ? onWalletConnect : null
      },
      info: {
        icon: 'HelpIcon',
        action: onInfo
      },
      leaderboard: {
        icon: 'LeaderboardIcon',
        action: onLeaderboard
      },
      sound: {
        icon: isSoundOn ? 'SoundOnIcon' : 'SoundOffIcon',
        action: () => toggleSound()
      },
      submit: {
        text: <div className={styles.button}>Submit Score & Earn $SBEE</div>,
        action: onSubmit
      },
      submitdone: {
        text: <div>Submitted!</div>,
        action: null
      }
    }
  }, [
    onStart,
    onRestart,
    onResume,
    onInfo,
    onLeaderboard,
    onSubmit,
    isSoundOn,
    toggleSound,
    statusUpdate,
    balance
  ])

  const optionsBeingShown = useMemo(() => {
    const result = []
    for (let i = 0; i < showOptions.length; i++) {
      result.push(allOptions[showOptions[i]])
    }
    return result
  }, [showOptions, allOptions])

  const handleOptionClick = useCallback(
    (index: number) => {
      setSelectedIndex(0)
      optionsBeingShown[index].action()
    },
    [optionsBeingShown]
  )

  const handleMouseOver = (index: number) => {
    setSelectedIndex(index)
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent, options: any[]) => {
      const validOptions: any[] = []
      options.forEach((option, index) => {
        if (option.action) {
          validOptions.push(index)
        }
      })
      switch (event.key) {
        case 'ArrowUp':
          setSelectedIndex((i) => {
            const validIndex = validOptions.indexOf(i)
            if (validIndex <= 0) {
              return 0
            } else {
              return validOptions[validIndex - 1]
            }
          })
          break
        case 'ArrowDown':
          setSelectedIndex((i) => {
            const validIndex = validOptions.indexOf(i)
            if (validIndex >= validOptions.length - 1) {
              return validOptions[validOptions.length - 1]
            } else {
              return validOptions[validIndex + 1]
            }
          })
          break
        case 'Enter':
          // case ' ': // Space. See https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
          setSelectedIndex(0)
          options[selectedIndex].action()
          break
        default:
          break
      }
    },
    [selectedIndex]
  )

  useEffect(() => {
    const handler = (event: KeyboardEvent) =>
      handleKeyDown(event, optionsBeingShown)
    window.addEventListener('keydown', handler)
    // Clean up on unmount
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [optionsBeingShown, handleKeyDown])

  return (
    <div className={styles.menu}>
      {optionsBeingShown.map((option, index) =>
        option.text ? (
          <MenuOption
            key={index}
            text={option.text}
            isSelected={index === selectedIndex}
            onClick={option.action ? () => handleOptionClick(index) : undefined}
            onMouseOver={
              option.action ? () => handleMouseOver(index) : undefined
            }
          />
        ) : (
          <MenuIcon
            key={index}
            iconType={option.icon}
            isSelected={index === selectedIndex}
            onClick={option.action ? () => handleOptionClick(index) : undefined}
            onMouseOver={
              option.action ? () => handleMouseOver(index) : undefined
            }
          />
        )
      )}
    </div>
  )
}

function displayAddress(address: string) {
  if (!address) {
    return 'no account'
  }
  return `${address.slice(0, 7)}...${address.slice(address.length - 5)}`
}

export default Menu
