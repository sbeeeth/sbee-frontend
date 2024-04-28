import { useAccount, useDisconnect } from 'wagmi'

import styles from '../gamestyle.module.css'

const Disconnect = () => {
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()
  if (!isConnected) {
    return <></>
  }
  return (
    <div className={styles.disconnect}>
      <div
        className={`${styles.button} ${styles.buttonmouse}`}
        onClick={() => disconnect()}
      >
        Disconnect
      </div>
    </div>
  )
}

export default Disconnect
