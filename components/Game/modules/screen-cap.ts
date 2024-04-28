import html2canvas from 'html2canvas'

import logger from './logger'

export default async function screenCap(element: HTMLElement) {
  let result = null
  try {
    const canvas = await html2canvas(element)
    // Scale it down to 20% only, we only need to verify realness, not quality
    const scaledCanvas = document.createElement('canvas')
    const scaleFactor = 0.2 // 20%: retina display are super high res, even this is 100kb
    scaledCanvas.width = canvas.width * scaleFactor
    scaledCanvas.height = canvas.height * scaleFactor
    const ctx = scaledCanvas.getContext('2d')
    ctx!.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height)
    result = scaledCanvas.toDataURL('image/png')
  } catch (err) {
    logger.error('Could not screen cap', err)
  }
  return result
}
