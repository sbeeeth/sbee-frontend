import kontra from 'kontra'

export default function CustomHitboxImageSprite(props: any) {
  return kontra.Sprite({
    ...props,
    render: function () {
      if (
        this.image &&
        this.context &&
        this.imageWidth &&
        this.imageHeight &&
        this.width &&
        this.height
      ) {
        // If image is larger, x/y is smaller to accomodate for more space
        // If image is maller, x/y is larger to accomodate for less space
        // Right now, we only support the image always being in the same center point as the sprite, only smaller/larger
        // In future we can extend this by having the image anywhere of the hitbox/sprite
        const x = (this.width - this.imageWidth) / 2
        const y = (this.height - this.imageHeight) / 2
        this.context.drawImage(
          this.image,
          x,
          y,
          this.imageWidth,
          this.imageHeight
        )
      } else {
        this.draw()
      }
    }
  })
}
