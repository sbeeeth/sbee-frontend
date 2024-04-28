import styles from '../gamestyle.module.css'

const Info = ({
  setIsPopupShown
}: {
  setIsPopupShown: (b: boolean) => void
}) => {
  return (
    <div className={styles.overlay} onClick={() => setIsPopupShown(false)}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <p>
          <b>How to play</b>
        </p>
        <p>
          To flap your wings, press Space on the keyboard, or click with mouse,
          or tap on screen on mobile.
        </p>
        <p>Get through as many tree branches and stumps as you can.</p>
        <p>
          If you own $SBEE tokens, connect your wallet before playing for a +20%
          bonus score!
        </p>
        <p>
          <b>
            Submit your score by signing it via your wallet to get on the Daily
            Leaderboard! Then join{' '}
            <a href='https://discord.gg/bNMbgEbwTr' target='_blank'>
              Discord
            </a>{' '}
            to claim your $SBEE.
          </b>
        </p>
        <img
          className={styles.img}
          src='/game/buildings/honeycomb_house.png'
          alt=''
        />
        <div className={styles.close} onClick={() => setIsPopupShown(false)}>
          X
        </div>
      </div>
    </div>
  )
}

export default Info
