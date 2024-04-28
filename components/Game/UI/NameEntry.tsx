import { useCallback, useRef } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useBalance, useSignMessage } from 'wagmi'

import { post as postLeaderboard } from '../../../services/api/leaderboard'
import logger from '../modules/logger'
import screenCap from '../modules/screen-cap'
import { tokenAddresses } from '../modules/token-util'
import { finalScore } from '../modules/utils'

import styles from '../gamestyle.module.css'

const NameEntry = ({
  score,
  onSubmit,
  setNameEntryShown
}: {
  score: number
  onSubmit: (success: boolean, error: JSX.Element | null) => void
  setNameEntryShown: (b: boolean) => void
}) => {
  const nameRef = useRef<HTMLInputElement>(null)
  /** wagmi web3 hooks */
  const { address } = useAccount()
  const balances = useBalance({
    address,
    token: tokenAddresses.SBEE as `0x${string}`
  })
  // If wallet already connected when page loaded, these kick in
  let balance = '0'
  if (balances.data) {
    balance = formatUnits(balances.data.value, balances.data.decimals)
  }
  const { signMessage } = useSignMessage()

  const submitScore = useCallback(async () => {
    try {
      // Run signature
      const message = `SharkBee Game High Score Submission: ${finalScore(score, parseFloat(balance) > 0)}`
      const signature = await new Promise<string>((resolve, reject) =>
        signMessage({ message }, { onSuccess: resolve, onError: reject })
      )
      // Run screen cap
      const screen = await screenCap(document.body)
      // Post API call
      const apiBody = {
        score: finalScore(score, parseFloat(balance) > 0),
        address,
        signature,
        name: nameRef.current!.value,
        screen
      }
      logger.info('POST API', apiBody)
      const result = await postLeaderboard(apiBody)
      if (!result || !result.success) {
        onSubmit(false, <p>Error submitting score, please try again later!</p>)
      } else {
        onSubmit(true, null)
      }
    } catch (error) {
      logger.error('Error signing message:', error)
      onSubmit(
        false,
        <p>
          Error submitting score, please try again later!
          <br />
          <br />
          {JSON.stringify(error)}
        </p>
      )
    }
  }, [score, balance])

  return (
    <div className={styles.overlay} onClick={() => setNameEntryShown(false)}>
      <div
        className={`${styles.popup} ${styles.nameentry}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitScore()
          }}
        >
          <div style={{ float: 'left', marginRight: '10px' }}>
            <b>Discord username:</b>
            <input type='text' maxLength={100} ref={nameRef} />
            <div style={{ fontSize: '13px' }}>
              (not shown on leaderboard, only for verifying claims)
            </div>
          </div>
          <button className={styles.button} style={{ float: 'left' }}>
            Submit
          </button>
        </form>
        <div className={styles.close} onClick={() => setNameEntryShown(false)}>
          X
        </div>
      </div>
    </div>
  )
}

export default NameEntry
