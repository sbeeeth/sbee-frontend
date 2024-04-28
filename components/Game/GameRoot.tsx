'use client'

import { useEffect, useRef, useState } from 'react'

import kontra, { GameLoop } from 'kontra'

import { loadImageAssets, loadSoundAssets } from './modules/assets'
import backgrounds from './modules/backgrounds'
import {
  createHudScore,
  createPlayer,
  createSpritesheets,
  gameStarts,
  initVars,
  render,
  resetGame,
  update
} from './modules/main'
import Overlay from './UI/Overlay'

const GameRoot = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [loop, setLoop] = useState<GameLoop>()
  const [score, setScore] = useState<number | null>(null)

  const death = function (score: number) {
    setScore(score)
  }

  const onOverlayHidden = function () {
    setScore(null)
  }

  useEffect(() => {
    async function init() {
      if (canvasRef.current) {
        // Create canvas
        canvasRef.current.width = window && window.innerWidth
        canvasRef.current.height = window && window.innerHeight

        // Initialize Kontra with the canvas
        kontra.init(canvasRef.current)

        // Initialize keyboard input
        kontra.initKeys()

        // Intialize pointer input
        kontra.initPointer()

        // Load image assets
        await loadImageAssets()

        // Load sound assets
        // TODO: Confirm this works with audio context not being allowed to start yet
        // If not, move to gameStarts()
        await loadSoundAssets()

        // Init vars that depend on canvas size
        initVars(canvasRef.current)

        // Create backgrounds
        backgrounds.create(canvasRef.current)

        // Create spritesheets, prepares for sprites to use them
        createSpritesheets()

        // Create player object
        createPlayer()

        // Create HUD score display
        createHudScore()

        // Game loop
        setLoop(
          kontra.GameLoop({
            update: function () {
              update(this, death)
            },
            render
          })
        )

        // Run the first render cycle to display as background on title screen
        backgrounds.render()
      }
    }
    init()
  }, [canvasRef])

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <Overlay
        loop={loop}
        gameStarts={gameStarts}
        resetGame={resetGame}
        onHidden={onOverlayHidden}
        score={score}
      />
    </>
  )
}

export default GameRoot
