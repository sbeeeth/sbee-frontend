const API_HOST =
  process.env.NEXT_PUBLIC_LEADERBOARD_API_HOST || 'http://localhost:5000'

export const post = async function (body: any) {
  try {
    const data = await fetch(`${API_HOST}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return data.json()
  } catch (e) {
    return null
  }
}

export const get = async function () {
  try {
    const data = await fetch(`${API_HOST}/leaderboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data.json()
  } catch (e) {
    return null
  }
}
