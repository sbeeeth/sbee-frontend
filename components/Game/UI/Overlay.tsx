import { useCallback, useEffect, useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useBalance, useConnect } from 'wagmi'

import { GameLoop } from 'kontra'

import logger from '../modules/logger'
import { tokenAddresses } from '../modules/token-util'
import { finalScore } from '../modules/utils'

import Disconnect from './Disconnect'
import Error from './Error'
import Info from './Info'
import Leaderboard from './Leaderboard'
import Menu from './Menu'
import NameEntry from './NameEntry'

import styles from '../gamestyle.module.css'

const optsSecondary = ['info', 'leaderboard', 'sound']
const optsList = {
  title: ['start', 'connect', ...optsSecondary],
  pause: ['resume', 'sound'],
  death: ['restart']
}

const Overlay = ({
  loop,
  gameStarts,
  resetGame,
  onHidden,
  score
}: {
  loop: GameLoop | undefined
  gameStarts: () => void
  resetGame: () => void
  onHidden: () => void
  score: number | null
}) => {
  const [isShown, setIsShown] = useState<boolean>(true)
  const [showOptions, setShowOptions] = useState<string[]>(optsList.title)
  const [subjectType, setSubjectType] = useState<string>('title')
  const [isMenuShown, setIsMenuShown] = useState<boolean>(true)
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false)
  const [isLeaderboardShown, setIsLeaderboardShown] = useState<boolean>(false)
  const [nameEntryShown, setNameEntryShown] = useState<boolean>(false)
  const [isErrorShown, setIsErrorShown] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<JSX.Element>(<></>)

  /** wagmi web3 hooks */
  const { connectors, connect } = useConnect()
  const { isConnected, address } = useAccount()
  const balances = useBalance({
    address,
    token: tokenAddresses.SBEE as `0x${string}`
  })
  // If wallet already connected when page loaded, these kick in
  let balance = '0'
  if (balances.data) {
    balance = formatUnits(balances.data.value, balances.data.decimals)
  }
  const connector = connectors.find((x) => x.type === 'injected')

  const allSubjectTypes: any = useMemo(() => {
    return {
      title: {
        text: (
          <div style={{ textAlign: 'center' }}>
            <img
              src='/game/logo.png'
              style={{ maxHeight: '50vh' }}
              alt='SBEE'
            />
          </div>
        )
      },
      pause: {
        text: (
          <h1
            style={{
              fontSize: '80px',
              margin: '12px 0',
              color: '#e0ff00',
              textAlign: 'center'
            }}
          >
            Paused
          </h1>
        )
      },
      death: {
        text: (
          <h1
            style={{
              fontSize: '80px',
              margin: '12px 0',
              color: '#e0ff00',
              textAlign: 'center'
            }}
          >
            Game over
          </h1>
        )
      }
    }
  }, [])

  // This is how GameRoot trigger Death menu.
  useEffect(() => {
    if (score !== null) {
      // on death call, score got set to non null
      setIsShown(true)
      setIsMenuShown(true)
      setSubjectType('death')
      setShowOptions([
        ...optsList.death,
        ...(score > 0 ? ['submit'] : []),
        ...optsSecondary
      ])
    }
  }, [score])

  const onStart = useCallback(() => {
    gameStarts()
    loop?.start()
    setIsMenuShown(false)
    setIsShown(false)
    onHidden()
    // sounds.playMusic();
  }, [loop, gameStarts, onHidden])

  const onRestart = useCallback(() => {
    resetGame()
    loop?.start()
    setIsMenuShown(false)
    setIsShown(false)
    onHidden()
    // sounds.playMusic();
  }, [loop, resetGame, onHidden])

  const onResume = useCallback(() => {
    loop?.start()
    setIsMenuShown(false)
    setIsShown(false)
    onHidden()
    // sounds.normalMusic();
  }, [loop, onHidden])

  const onInfo = useCallback(() => {
    setIsPopupShown(true)
  }, [])

  const onLeaderboard = useCallback(() => {
    setIsLeaderboardShown(true)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (loop && event.key === 'Escape' && !loop.isStopped) {
        loop.stop()
        setIsShown(true)
        setIsMenuShown(true)
        setSubjectType('pause')
        setShowOptions(optsList.pause)
        // sounds.lowerMusic();
      }
    },
    [loop]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    // Clean up on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const doWalletConnect = useCallback(async () => {
    if (connector) {
      return new Promise<string[]>((resolve, reject) => {
        connect(
          { connector },
          {
            onSuccess: (data) => {
              resolve(data.accounts.map((x) => x as string))
            },
            onError: (error) => {
              logger.error(error)
              setErrorMsg(
                <p>
                  Could not connect with wallet: <br />
                  <br />
                  {JSON.stringify(error)}
                </p>
              )
              reject()
            }
          }
        )
      })
    } else {
      setErrorMsg(
        <p>
          No web3 wallet extension found on your browser. Please install
          Metamask or another wallet!
        </p>
      )
      return new Promise<string[]>((resolve, reject) => {
        reject()
      })
    }
  }, [])

  const onWalletConnect = useCallback(async () => {
    await doWalletConnect()
  }, [])

  const onSubmit = useCallback(async () => {
    if (!isConnected) {
      await doWalletConnect()
    }
    setNameEntryShown(true)
  }, [score, doWalletConnect])

  const onPostSubmit = useCallback(
    (success: boolean, error: JSX.Element | null) => {
      setNameEntryShown(false)
      if (success) {
        setShowOptions([...optsList.death, 'submitdone', ...optsSecondary])
      } else {
        setErrorMsg(error!)
        setIsErrorShown(true)
      }
    },
    []
  )

  if (!isShown) {
    return <></>
  }

  return (
    <div className={styles.overlay}>
      {isMenuShown && (
        <>
          {subjectType ? allSubjectTypes[subjectType].text : null}
          {score !== null ? (
            <>
              <h2>Your score: {finalScore(score, parseFloat(balance) > 0)}</h2>
              {parseFloat(balance) > 0 ? (
                <h3 style={{ margin: '0 0 10px' }}>(+20% Bonus!)</h3>
              ) : null}
            </>
          ) : null}
          <Menu
            showOptions={showOptions}
            onStart={onStart}
            onRestart={onRestart}
            onResume={onResume}
            onWalletConnect={onWalletConnect}
            onInfo={onInfo}
            onLeaderboard={onLeaderboard}
            onSubmit={onSubmit}
          />
        </>
      )}
      {isPopupShown && <Info setIsPopupShown={setIsPopupShown} />}
      {isLeaderboardShown && (
        <Leaderboard setIsLeaderboardShown={setIsLeaderboardShown} />
      )}
      {nameEntryShown && (
        <NameEntry
          score={score || 0}
          onSubmit={onPostSubmit}
          setNameEntryShown={setNameEntryShown}
        />
      )}
      {isErrorShown && (
        <Error errorMsg={errorMsg} setIsErrorShown={setIsErrorShown} />
      )}
      <Disconnect />
    </div>
  )
}

export default Overlay
