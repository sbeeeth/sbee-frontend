/**
 * Assets Provider
 */

import imagesUrl from './images-url'
import sounds from './sounds'
import soundsUrl from './sounds-url'

export const assets: any = {}

// Take every UPPERCASE_SNAKECASE key in images-b64.js
// Create an assets object with camelCase keys.
// e.g. PLAYER -> player, PLATFORM_LEFT -> platformLeft

// Detect for iOS Safari to work around an issue
const isIOSSafari =
  typeof navigator !== 'undefined' && typeof window !== 'undefined'
    ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    : false

// Uncomment below if helpful for debugging and getting a comprehensive list of keys for image assets.
// console.log(JSON.stringify(imagesKeys));

export async function loadImageAssets() {
  const promises: Promise<any>[] = []

  // Load images assets
  Object.keys(imagesUrl).forEach((key) => {
    const camelCaseKey = key
      .toLowerCase()
      .replace(/_(\w)/g, (_, c) => c.toUpperCase())
    assets[camelCaseKey] = new Image()
    assets[camelCaseKey].src = imagesUrl[key]
    promises.push(
      new Promise((resolve) => {
        assets[camelCaseKey].onload = resolve
      })
    )
  })

  await Promise.all(promises)
}

export async function loadSoundAssets() {
  const promises: Promise<any>[] = []

  // Load sounds
  Object.keys(soundsUrl).forEach((key) => {
    const camelCaseKey = key
      .toLowerCase()
      .replace(/_(\w)/g, (_, c) => c.toUpperCase())
    const promise = sounds.loadAudio(soundsUrl[key], camelCaseKey)
    if (!isIOSSafari) {
      promises.push(promise)
    }
  })

  await Promise.all(promises)
}
