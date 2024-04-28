/**
 * Main game logic driving the game
 */

import kontra, { Sprite, SpriteSheet, Text } from 'kontra'

import CustomHitboxImageSprite from '../kontra/CustomHitboxImageSprite'

import { assets } from './assets'
import backgrounds from './backgrounds'
import sounds from './sounds'
import { generateUniqueId, pickByChance, randomInRange } from './utils'

// Handle mobile taps
let mobileTapped = false

// Constants
let canvas: HTMLCanvasElement | null = null // this is cache of the real canvas DOM object from the react component
const GRAVITY = 0.3
const FLAP = -6
let PLAYER_SIZE = 200
const SCROLL_SPEED = 5
const PIPE_INTERVAL = 90
const ITEM_INTERVAL = 45
const ITEM_APPEAR_CHANCE = 0.2

// Game variables
let player: Sprite | null = null
let hudScore: Text | null = null
let items: Sprite[] = []
let plusPoints: Text[] = []
let pipes: Sprite[] = []
let passedPipes: string[] = []
let score = 0
let interval = 0

/**
 * Init vars that depend on canvas size
 * @param canvas
 */
export function initVars(canvasObj: HTMLCanvasElement) {
  canvas = canvasObj
  PLAYER_SIZE = canvas.height * 0.2

  // Handle pointer events outside of the game loop
  // This is here instead of at root level of this file because "kontra.initPointer()"
  // had to be called first, which happens when GameRoot component mounts
  kontra.onPointer('down', () => {
    mobileTapped = true
  })
}

// Create spritesheets
const spritesheets: { player: SpriteSheet | null } = {
  player: null
}
export function createSpritesheets() {
  // Note: the frameWidth and frameHeight in these SpriteSheet properties
  // refer to the actual spritesheet image, the dimension of each frame, in it.
  // The place to scale it up to game screen needs is when you create a
  // Sprite object using the spritesheet, see e.g. createPlayer().
  // In other words, don't change them here unless the art assets change.
  spritesheets.player = kontra.SpriteSheet({
    image: assets.player,
    frameWidth: 600, // Width of each frame in pixels
    frameHeight: 600, // Height of each frame in pixels
    animations: {
      fly: {
        frames: [0, 1, 0], // Frames 0, 1, 0
        frameRate: 5, // Frames per second
        loop: true // Loop the animation
      },
      fall: {
        frames: '2', // Frames 2 only
        frameRate: 5, // Frames per second
        loop: true // Loop the animation
      },
      dead: {
        frames: '3', // Frames 3 only
        frameRate: 5, // Frames per second
        loop: true // Loop the animation
      }
    }
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

export function createHudScore() {
  const size = Math.floor(canvas!.height / 10)
  hudScore = kontra.Text({
    text: '0',
    font: `${size}px 'Comic Sans MS', 'Comic Sans', fantasy`,
    color: 'white',
    strokeColor: 'black',
    lineWidth: 5,
    x: 20,
    y: 20,
    anchor: { x: 0, y: 0 }
  })
}

function centerHudScore() {
  const size = Math.floor(canvas!.height / 2)
  hudScore = kontra.Text({
    text: score.toString(),
    font: `${size}px 'Comic Sans MS', 'Comic Sans', fantasy`,
    color: 'white',
    strokeColor: 'black',
    lineWidth: 5,
    x: canvas!.width / 2,
    y: canvas!.height / 2,
    anchor: { x: 0.5, y: 0.5 }
  })
  hudScore.render()
}

export function createPlayer() {
  // Scaling notes:
  // Player size multiplier is based on the one for platforms/items but 75% of it.
  // Player starts from about 12% of screen width from the left,
  // but not further than 200px if ultrawide screens.
  // Gravity is 0.5 pixels effect per frame,
  // Jump Force puts you at e.g. -9px and gravity pulls you down +0.5px per frame when not grounded,
  // Player y updates by this resulting dy each frame.
  player = kontra.Sprite({
    x: Math.min(canvas!.width * 0.12, 200),
    y: canvas!.height * 0.1 + 100,
    // anchor: { x: 0.5, y: 0.5 },
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    radius: (PLAYER_SIZE / 2) * 0.9,
    animations: spritesheets.player!.animations, // Use animations from sprite sheet
    alive: true,
    gravity: 0,
    velo: GRAVITY,
    jump: FLAP,
    collides: function (secondObj: Sprite) {
      const circleX = this.x + this.radius
      const circleY = this.y! + this.radius * 1.1

      // Find the closest point on the rectangle to the center of the circle
      const closestX = clamp(
        circleX,
        secondObj.x,
        secondObj.x + secondObj.width
      )
      const closestY = clamp(
        circleY,
        secondObj.y,
        secondObj.y + secondObj.height
      )

      // Calculate the distance between the circle's center and the closest point on the rectangle
      const distanceX = circleX - closestX
      const distanceY = circleY - closestY

      // Check if the distance is less than the circle's radius
      return (
        distanceX * distanceX + distanceY * distanceY <
        this.radius * this.radius
      )
    }
  })
}

// Pipe sprite
function createPipe() {
  // Assets notes:
  // Widths: top 162, bottom 194
  // Heights: top 459, bottom 590
  let holeSize
  if (score <= 7) {
    holeSize = randomInRange(PLAYER_SIZE * 1.75, PLAYER_SIZE * 2.5)
  } else if (score <= 17) {
    holeSize = randomInRange(PLAYER_SIZE * 1.7, PLAYER_SIZE * 2.4)
  } else if (score <= 27) {
    holeSize = randomInRange(PLAYER_SIZE * 1.65, PLAYER_SIZE * 2.3)
  } else if (score <= 37) {
    holeSize = randomInRange(PLAYER_SIZE * 1.6, PLAYER_SIZE * 2.2)
  } else if (score <= 47) {
    holeSize = randomInRange(PLAYER_SIZE * 1.55, PLAYER_SIZE * 2.1)
  } else {
    holeSize = randomInRange(PLAYER_SIZE * 1.5, PLAYER_SIZE * 2.0)
  }
  const holeTop = randomInRange(50, canvas!.height - holeSize - 50)
  const holeBottom = holeTop + holeSize
  const pipeWidth = PLAYER_SIZE
  let pipeTopHeight = (pipeWidth / assets.pipetop.width) * assets.pipetop.height
  let pipeBottomHeight =
    (pipeWidth / assets.pipebottom.width) * assets.pipebottom.height

  // Check if pipetop needs to be stretched
  if (holeTop - pipeTopHeight > 0) {
    pipeTopHeight = holeTop
  }
  pipes.push(
    CustomHitboxImageSprite({
      x: canvas!.width + pipeWidth * 0.3,
      y: holeTop - pipeTopHeight,
      width: pipeWidth * 0.4,
      height: pipeTopHeight - 5, // Give 5px tolerance since branch art is flimsy and character hitbox is a bit large
      image: assets.pipetop,
      imageWidth: pipeWidth,
      imageHeight: pipeTopHeight,
      id: null
    })
  )

  // Check if pipebottom needs to be stretched
  if (holeBottom + pipeBottomHeight < canvas!.height) {
    pipeBottomHeight = canvas!.height - holeBottom
  }
  pipes.push(
    CustomHitboxImageSprite({
      x: canvas!.width + pipeWidth * 0.15,
      y: holeBottom,
      width: pipeWidth * 0.7,
      height: pipeBottomHeight,
      image: assets.pipebottom,
      imageWidth: pipeWidth,
      imageHeight: pipeBottomHeight,
      id: generateUniqueId()
    })
  )
}

// Create item
function createItem() {
  // Roll to see if item apepars at all
  if (Math.random() > ITEM_APPEAR_CHANCE) {
    return
  }
  const itemChances = {
    coinBee: 0.1,
    flowerBlue: 0.3,
    flowerRed: 0.3,
    flowerWhite: 0.3
  }
  const itemPoints: any = {
    coinBee: 5,
    flowerBlue: 2,
    flowerRed: 2,
    flowerWhite: 2
  }
  const itemType = pickByChance(itemChances)
  const itemSize = PLAYER_SIZE * 0.5
  const itemTop = randomInRange(50, canvas!.height - itemSize - 50)
  const itemHeight = itemSize
  const itemWidth =
    (itemHeight / assets[itemType].height) * assets[itemType].width
  items.push(
    CustomHitboxImageSprite({
      x: canvas!.width + itemWidth * 0.05,
      y: itemTop,
      width: itemWidth * 0.9,
      height: itemHeight * 0.9,
      image: assets[itemType],
      imageWidth: itemWidth,
      imageHeight: itemHeight,
      score: itemPoints[itemType],
      sound: itemType === 'coinBee' ? 'itemcoin' : 'itemflower'
    })
  )
}

function createPlusPoints({ x, y, pt }: { x: number; y: number; pt: number }) {
  const size = PLAYER_SIZE * 0.4
  const xyDelta = PLAYER_SIZE * 0.5 * 0.5
  plusPoints.push(
    kontra.Text({
      text: `+${pt}`,
      font: `${size}px 'Comic Sans MS', 'Comic Sans', fantasy`,
      color: 'yellow',
      strokeColor: 'black',
      lineWidth: 5,
      opacity: 1,
      x: x + xyDelta,
      y: y + xyDelta,
      anchor: { x: 0.5, y: 0.5 }
    })
  )
}

// Update function
export function update(loop: any, death: (score: number) => void) {
  // Typesafety
  if (!player || !canvas) {
    return
  }

  // Update animation of player sprite
  player.update()

  // Update player position, apply gravity
  player.gravity += player.velo
  player.y += player.gravity

  // Jumping logic
  if ((kontra.keyPressed('space') || mobileTapped) && player.alive) {
    mobileTapped = false
    // Button press logic
    if (player.y > 0) {
      player.gravity = player.jump
      sounds.play(`flap0`)
    }
  }

  if (player.gravity <= 0) {
    player.playAnimation('fly')
  } else {
    // player.playAnimation('fall');
  }

  // Fell off screen
  if (player.y > canvas.height) {
    player.alive = false
    sounds.play('deathdrop')
  }

  // Pipes
  pipes.forEach((pipe) => {
    pipe.x -= SCROLL_SPEED
    if (player && player.collides(pipe)) {
      player.alive = false
      player.playAnimation('dead')
      if (pipe.id) {
        sounds.play('deathbottom')
      } else {
        sounds.play('deathtop')
      }
    }
    if (pipe.x + pipe.width < 0) {
      // Clean up scrolled-past pipes
      pipes.splice(pipes.indexOf(pipe), 1)
      if (pipe.id) {
        // If cleaning up a bottom pipe (one with id for scoring), clean up passedPipes array too
        passedPipes = passedPipes.filter((id) => id !== pipe.id)
      }
    } else {
      // ("else if" because if we don't, passedPipes id just cleared, and below would be true in this update cycle)
      // If player midpoint passed pipe midpoint
      // If bottom pipe (has id)
      // If not yet passed this pipe
      if (
        player &&
        (player.x + player.width) / 2 > (pipe.x + pipe.width) / 2 &&
        pipe.id &&
        !passedPipes.includes(pipe.id)
      ) {
        score++
        passedPipes.push(pipe.id) // add to list of pipes we passed
      }
    }
  })

  // Plus Points sprites
  plusPoints.forEach((plusPoint) => {
    plusPoint.x -= SCROLL_SPEED
    plusPoint.y -= 2
    plusPoint.opacity -= 0.1
    if (plusPoint.x + plusPoint.width < 0) {
      plusPoints.splice(plusPoints.indexOf(plusPoint), 1)
    }
  })

  // Items
  items.forEach((item) => {
    item.x -= SCROLL_SPEED
    if (player && player.collides(item)) {
      // Collect item
      score += item.score
      items.splice(items.indexOf(item), 1)
      sounds.play(item.sound)
      createPlusPoints({ x: item.x, y: item.y, pt: item.score })
    } else if (item.x + item.width < 0) {
      // Clean up scrolled-past items
      items.splice(items.indexOf(item), 1)
    }
  })

  // Create new pipes
  interval++
  if (interval === PIPE_INTERVAL) {
    interval = 0
    createPipe()
  }

  // Create new item
  if (interval === ITEM_INTERVAL && pipes.length > 0) {
    createItem()
  }

  // Scroll backgrounds
  backgrounds.scroll(canvas, SCROLL_SPEED)

  // Score
  if (hudScore) {
    hudScore.text = score.toString()
  }

  // Game over
  if (!player.alive) {
    centerHudScore()
    loop.stop()
    death(score)
  }
}

// Render function
export function render() {
  // Note: render() order determines z-indexing.
  // Render background sprites first, they have no collisions, objects overlap on them.
  backgrounds.render()
  player?.render()
  pipes.forEach((pipe) => pipe.render())
  items.forEach((item) => item.render())
  plusPoints.forEach((plusPoint) => plusPoint.render())
  hudScore?.render()
}

// // Handle window resizes. This is mostly to allow mobile rotations to happen.
// // We only allow resizes before game started. Once started, it is too difficult to resize everything,
// // with platforms being already generated. We clear this handler on game starting the first time.
// // The primary goal of this handler is to allow mobile users to rotate their phone, not desktop
// // users to keep adjust their screen sizes during game play.
// let pendingResizeHandling = false
// let resizeHandler = function () {
//   // We set a flag and only run this once so we don't keep triggering redraws during resizes
//   pendingResizeHandling = true
//   setTimeout(function () {
//     if (pendingResizeHandling) {
//       resizeEverything()
//       pendingResizeHandling = false
//     }
//   }, 200)
// }
// function resizeEverything() {
//   // First, adjust the canvas DOM element on the HTML page to full screen
//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight
//   // Adjust params based on canvas
//   PLAYER_SIZE = canvas.height * 0.2
//   // Recreate and re-render almost everything
//   backgrounds.resize(canvas)
//   createPlayer()
//   createHudScore()
//   // Re-render
//   backgrounds.render()
// }
// window.addEventListener('resize', resizeHandler)

// UI Overlay calls back to main game engine about the game starting
// Handle any cleanup here, such as no longer listening to window resizes.
export function gameStarts() {
  // if (resizeHandler) {
  //   window.removeEventListener('resize', resizeHandler)
  //   resizeHandler = null
  // }
}

// Reset game function
export function resetGame() {
  // Recreate health bar, reset player and platforms
  if (canvas) backgrounds.create(canvas)
  createPlayer()
  createHudScore()
  pipes = []
  items = []
  plusPoints = []
  score = 0
  interval = 0
  mobileTapped = false
}
