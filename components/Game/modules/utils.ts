export function pickByChance(chances: any) {
  const roll = Math.random()
  let cumulativeProbability = 0
  let chosenKey = ''
  for (const [key, probability] of Object.entries(chances)) {
    cumulativeProbability += probability as number
    if (roll < cumulativeProbability) {
      chosenKey = key
      break
    }
  }
  return chosenKey
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }
  return array
}

// Roll a random number within a given range
export function randomInRange(low: number, high: number) {
  const roll = Math.random()
  const diff = high - low
  return roll * diff + low
}

// Pseudo-unique random id
export function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9) // Generate a random string of 9 characters
}

export function finalScore(score: number, hasTokens: boolean) {
  return hasTokens ? Math.floor(score * 1.2) : score
}
