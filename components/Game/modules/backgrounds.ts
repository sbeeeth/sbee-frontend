/**
 * Background art parallax layers
 * These are sprites in the game, that scroll with the game, but have no collision checks.
 * They render underneath the main sprites in the game.
 */

import kontra, { Sprite } from 'kontra'

import ScaledImageSprite from '../kontra/ScaledImageSprite'

import { assets } from './assets'
import { randomInRange, shuffle } from './utils'

export const backgroundObjects: any = {
  layerBg: null,
  layerBuildings: null,
  layerWashout: null,
  layerHoney: null,
  layerGround: null
}

const backgrounds = {
  create: function (canvas: HTMLCanvasElement) {
    const fullScreenProps = {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height
    }
    // Bg/Honey/Ground are simple loops, we create two sprites for each image, so on scroll they appear
    // continuous. After scrolling past one, we move that one to the right.
    backgroundObjects.layerBg = [
      ScaledImageSprite({ ...fullScreenProps, image: assets.bgNight }),
      ScaledImageSprite({
        ...fullScreenProps,
        x: canvas.width - 1,
        image: assets.bgNight
      })
    ]
    // Buildings are dynamically randomly generated.
    backgroundObjects.layerBuildings = [...createBuildingsLayer(canvas, 0)]
    backgroundObjects.layerWashout = kontra.Sprite({
      ...fullScreenProps,
      color: 'white',
      opacity: 0.6
    })
    backgroundObjects.layerHoney = [
      ScaledImageSprite({ ...fullScreenProps, image: assets.bgTopHoney }),
      ScaledImageSprite({
        ...fullScreenProps,
        x: canvas.width - 1,
        image: assets.bgTopHoney
      })
    ]
    backgroundObjects.layerGround = [
      ScaledImageSprite({
        ...fullScreenProps,
        image: assets.bgBottomGround
      }),
      ScaledImageSprite({
        ...fullScreenProps,
        x: canvas.width - 1,
        image: assets.bgBottomGround
      })
    ]
  },

  resize: function (canvas: HTMLCanvasElement) {
    // Simple loop layers
    for (const layer of ['layerBg', 'layerHoney', 'layerGround']) {
      // First sprite
      backgroundObjects[layer][0].width = canvas.width
      backgroundObjects[layer][0].height = canvas.height
      // Second sprite (off screen to the right)
      backgroundObjects[layer][1].x = canvas.width - 1
      backgroundObjects[layer][1].width = canvas.width
      backgroundObjects[layer][1].height = canvas.height
    }
    // Dynamic buildings layer
    backgroundObjects.layerBuildings = [...createBuildingsLayer(canvas, 0)]
    // Static
    backgroundObjects.layerWashout.width = canvas.width
    backgroundObjects.layerWashout.height = canvas.height
  },

  render: function () {
    backgroundObjects.layerBg.forEach((sprite: Sprite) => sprite.render())
    backgroundObjects.layerBuildings.forEach((sprite: Sprite) =>
      sprite.render()
    )
    backgroundObjects.layerWashout.render()
    backgroundObjects.layerHoney.forEach((sprite: Sprite) => sprite.render())
    backgroundObjects.layerGround.forEach((sprite: Sprite) => sprite.render())
  },

  scroll: function (canvas: HTMLCanvasElement, gameScrollSpeed: number) {
    if (gameScrollSpeed === 0) {
      return
    }
    // Calculate scroll speeds for each layer based on the base scroll speed of the game currently
    const scrollSpeeds = distributeNumbers(gameScrollSpeed)
    // First, scroll the simple looping layers  that are not dynamic
    let layerSpeedIndices: object = {
      layerBg: 0,
      layerHoney: 2,
      layerGround: 3
    }
    for (const [layer, index] of Object.entries(layerSpeedIndices)) {
      backgroundObjects[layer].forEach((sprite: Sprite) => {
        sprite.x -= scrollSpeeds[index]
        if (sprite.x + sprite.width <= 0) {
          sprite.x += sprite.width * 2 - 1
        }
      })
    }
    // Then, scroll dynamically generated ones. No sprite moving logic for these
    layerSpeedIndices = { layerBuildings: 3 }
    for (const [layer, index] of Object.entries(layerSpeedIndices)) {
      backgroundObjects[layer].forEach((sprite: Sprite) => {
        sprite.x -= scrollSpeeds[index]
      })
    }
    // Requires (a) cleaning up scrolled-past buildings and (b) create new ones to the right
    backgroundObjects.layerBuildings = backgroundObjects.layerBuildings.filter(
      (spr: Sprite) => spr.x + spr.width > 0
    )
    backgroundObjects.layerBuildings.push(
      ...createBuildingsLayer(
        canvas,
        backgroundObjects.layerBuildings[
          backgroundObjects.layerBuildings.length - 1
        ].x +
          backgroundObjects.layerBuildings[
            backgroundObjects.layerBuildings.length - 1
          ].width
      )
    )
  }
}
export default backgrounds

/**
 * Radomly pick from list of assets,and place them continuously infinitely.
 * We need to 1) scale the asset to a height we want and determine the widths,
 * then need to 2) randomly pick buildings with some logic.
 * We also need to 3) continuously populate this as scroll happens to ensure
 * there are buildings to scroll to.
 */
const allBuildings = [
  'castle',
  'forest',
  'hiveHouse',
  'honeyHouse',
  'honeycombHouse',
  'mushroomComb',
  'treehouse',
  'windmillCone',
  'windmillStick'
]
const buildingsList = shuffle(allBuildings)
let buildingIndex = 0
function createBuildingsLayer(canvas: HTMLCanvasElement, startX: number) {
  const GROUND_OFFSET = canvas.height * (60 / 1081) // half of ground, of bg_ground
  const HEIGHT_SCALE = Math.min(canvas.height, 1000) / 1000
  let height
  let width = 0
  let y = canvas.height
  let x = startX
  const result = []
  while (x + width < canvas.width * 2) {
    const buildingType = buildingsList[buildingIndex]
    buildingIndex++
    if (buildingIndex >= buildingsList.length) {
      buildingIndex = 0
      shuffle(buildingsList)
    }
    x += randomInRange(canvas.width * 0.1, canvas.width * 0.2) // Add randomized gap space
    height = assets[buildingType].height * HEIGHT_SCALE
    y = canvas.height - height - GROUND_OFFSET
    width = (height / assets[buildingType].height) * assets[buildingType].width
    result.push(
      ScaledImageSprite({
        x,
        y,
        width,
        height,
        image: assets[buildingType]
      })
    )
    x += width
  }
  return result
}

/**
 * Take a base scroll speed, distribute it to 4 parts.
 */
function distributeNumbers(base: number) {
  const div = base / 5
  return [div, div * 2, div * 3, div * 4]
}
