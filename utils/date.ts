export function diffDate(
  date1: Date,
  date2: Date
): { days: number; hours: number; minutes: number } {
  // calculate the total difference in milliseconds
  let diff = Math.abs(date2.getTime() - date1.getTime())

  // calculate the number of days
  const days = Math.floor(diff / (1000 * 3600 * 24))
  diff -= days * (1000 * 3600 * 24)

  // calculate the number of hours
  const hours = Math.floor(diff / (1000 * 3600))
  diff -= hours * (1000 * 3600)

  // calculate the number of minutes
  const minutes = Math.floor(diff / (1000 * 60))

  return {
    days,
    hours,
    minutes
  }
}
