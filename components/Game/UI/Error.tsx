import styles from '../gamestyle.module.css'

const Error = ({
  errorMsg,
  setIsErrorShown
}: {
  errorMsg: JSX.Element
  setIsErrorShown: (b: boolean) => void
}) => {
  return (
    <div className={styles.overlay} onClick={() => setIsErrorShown(false)}>
      <div className={styles.popup} style={{ backgroundColor: 'orange' }}>
        {errorMsg}
        <div className={styles.close} onClick={() => setIsErrorShown(false)}>
          X
        </div>
      </div>
    </div>
  )
}

export default Error
