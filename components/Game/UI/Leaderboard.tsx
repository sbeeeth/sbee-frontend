import { useEffect, useState } from 'react'

import { get as getLeaderboard } from '../../../services/api/leaderboard'

import styles from '../gamestyle.module.css'

const DISPLAY_SIZE = 10

const Leaderboard = ({
  setIsLeaderboardShown
}: {
  setIsLeaderboardShown: (b: boolean) => void
}) => {
  const [date, setDate] = useState(null)
  const [leaderboard, setLeaderboard] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getData() {
      const data = await getLeaderboard()
      if (!data || !data.leaderboard || !data.date) {
        setError('Could not load daily leaderboard, please try again later!')
      } else {
        setDate(data.date)
        // Fill up the board with "-" entries up 10 if less than 10
        const list = []
        for (let i = 0; i < DISPLAY_SIZE; i++) {
          if (data.leaderboard[i]) {
            list.push(data.leaderboard[i])
          } else {
            list.push({ address: '-', score: '-' })
          }
        }
        setLeaderboard(list)
      }
    }
    getData()
  }, [])

  return (
    <div
      className={styles.overlay}
      onClick={() => setIsLeaderboardShown(false)}
    >
      <div
        className={`${styles.popup} ${styles.leaderboard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.date}>{date ? formatDate(date) : ''}</div>
        <div className={styles.title}>
          <b>Daily Leaderboard</b>
        </div>
        <div className={styles.tablediv}>
          {leaderboard ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Address</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, index) => (
                  <tr key={`lbtable_${index}`}>
                    <td className={styles.rank}>{index + 1}.</td>
                    <td className={styles.address}>
                      {displayAddress(item.address)}
                    </td>
                    <td className={styles.score}>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {error && <p>{error}</p>}
        <div
          className={styles.close}
          onClick={() => setIsLeaderboardShown(false)}
        >
          X
        </div>
      </div>
    </div>
  )
}

function displayAddress(address: string) {
  if (address.length < 30 || window.innerWidth >= 500) {
    return address
  }
  return `${address.slice(0, 7)}...${address.slice(address.length - 5)}`
}

function formatDate(dateString: string) {
  // Parse the date string into a Date object in UTC
  const date = new Date(dateString + 'T00:00:00Z')

  // Define an array of suffixes for the day
  const suffixes = ['th', 'st', 'nd', 'rd']

  // Extract month, day, and year components in UTC
  const month = date.toLocaleString('default', {
    month: 'long',
    timeZone: 'UTC'
  }) // Get full month name
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()

  // Determine the suffix for the day
  let daySuffix
  if (day >= 11 && day <= 13) {
    daySuffix = 'th' // For 11th, 12th, and 13th
  } else {
    daySuffix = suffixes[day % 10] || 'th' // For other days
  }

  // Format the date string
  return `${month} ${day}${daySuffix}, ${year}`
}

export default Leaderboard
