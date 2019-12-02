export default class TouchPosition {
  /*
   */
  constructor (containerElement, sliderRadius, sliderTolerance, minAngle) {
    this.containerElement = containerElement
    this.sliderRadius = sliderRadius
    this.sliderTolerance = sliderTolerance
    this.minAngle = minAngle
    this.setNewPosition({x: 0, y: 0})
  }

  /*
   */
  setNewPosition (e) {
    const dimensions = this.containerElement.getBoundingClientRect()
    const side = dimensions.width
    this.center = side / 2
    let position = e
    if (e.touches) {
      if (e.touches.length > 0) {
        position = e.touches[0]
      } else {
        return
      }
    }
    this.relativeX = position.clientX - dimensions.left
    this.relativeY = position.clientY - dimensions.top
  }

  /*
   */
  get sliderAngle () {
    return (Math.atan2(this.relativeY - this.center, this.relativeX - this.center) + Math.PI * 3 / 2 - Math.PI / 2 + this.minAngle) % (Math.PI * 2)
  }

  /*
   */
  get isTouchWithinSliderRange () {
    const touchOffset = Math.sqrt(Math.pow(Math.abs(this.relativeX - this.center), 2) + Math.pow(Math.abs(this.relativeY - this.center), 2))
    return Math.abs(touchOffset - this.sliderRadius) <= this.sliderTolerance
  }
}
