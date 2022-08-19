import { canvas, ctx, sprites } from './Canvas.js'

export const background = {
    backgroundColor: '#70c5ce',
    spriteBgPosX: 390,
    spriteBgPosY: 0,
    cropX: 275, // Using in sprite cropX and canvasSizeInX
    cropY: 204, // Using in sprite cropY and canvasSizeInY
    x: 0,
    y: canvas.height - 203,
    draw() {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(
            sprites,
            this.spriteBgPosX,
            this.spriteBgPosY,
            this.cropX,
            this.cropY,
            this.x, this.y,
            this.cropX, this.cropY
        )
        ctx.drawImage(
            sprites,
            this.spriteBgPosX,
            this.spriteBgPosY,
            this.cropX,
            this.cropY,
            (this.x + this.cropX), this.y,
            this.cropX, this.cropY
        )
    }
}