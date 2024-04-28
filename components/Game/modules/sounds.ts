/**
 * Sound control / manager
 */

const sounds: any = {
  isOn: true,

  /**
   * Sound effects
   */
  audioContext: null,
  audioBufferMap: new Map(),
  activeSources: new Map(),
  isPlaying: {},

  loadAudio: async function (url: string, key: string) {
    // First time it's called, start audioContext
    if (!this.audioContext) {
      this.audioContext =
        typeof window !== 'undefined'
          ? new (window.AudioContext || (window as any).webkitAudioContext)()
          : null
    }

    // Check if the audio buffer is already loaded
    if (this.audioBufferMap.has(key)) {
      return this.audioBufferMap.get(key)
    }

    // Fetch audio file
    const response = await fetch(url)
    const audioData = await response.arrayBuffer()

    // Decode audio data and create audio buffer
    const audioBuffer = await this.audioContext.decodeAudioData(audioData)

    // Store loaded audio buffer in the map
    this.audioBufferMap.set(key, audioBuffer)

    return audioBuffer
  },

  toggle: function () {
    this.isOn = !this.isOn
  },
  play: function (key: string) {
    if (!this.audioBufferMap.has(key)) {
      console.error(`Audio buffer with key '${key}' not found.`)
      return
    }
    if (this.isOn) {
      if (this.isPlaying[key]) {
        return
      }
      const audioBuffer = this.audioBufferMap.get(key)
      const source = this.audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(this.audioContext.destination)
      source.start(0)
      // Store the source node in the active sources map
      this.activeSources.set(key, source)
      this.isPlaying[key] = true
      source.onended = () => {
        this.isPlaying[key] = false
      }
    }
  },
  stop: function (key: string) {
    if (!this.activeSources.has(key)) {
      console.warn(`No active source found for audio '${key}'.`)
      return
    }

    const source = this.activeSources.get(key)
    source.stop()
    this.activeSources.delete(key)
  }
}
export default sounds
