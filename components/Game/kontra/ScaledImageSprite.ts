import kontra from 'kontra'

export default function ScaledImageSprite(props: any) {
  return kontra.Sprite({
    ...props,
    render: function () {
      if (this.image && this.context && this.width && this.height) {
        this.context.drawImage(this.image, 0, 0, this.width, this.height)
      }
    }
  })
}
