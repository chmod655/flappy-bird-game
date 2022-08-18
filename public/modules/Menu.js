import { canvas, ctx, sprites } from './Canvas.js'

export const menu = {
    screenStartX: 134,
    screenStartY: 0,
    cropX: 174, // Using in sprite cropX and canvasSizeInX
    cropY: 152, // Using in sprite cropY and canvasSizeInY
    x: (canvas.width / 2) - 174 / 2, // 73
    y: 50,
    draw() {
        ctx.drawImage(
            sprites,
            this.screenStartX, this.screenStartY,
            this.cropX, this.cropY,
            this.x, this.y,
            this.cropX, this.cropY,
        )
    }
}