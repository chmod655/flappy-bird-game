import { canvas, ctx, sprites } from "./Canvas.js"

// Floor Information
export function inicializeFloor() {
    const floor = {
        spriteBasePosX: 0,
        spriteBasePosY: 600,
        cropX: 224,
        cropY: 110,
        x: 0,
        y: canvas.height - 110,
        draw() {
            ctx.drawImage(
                sprites,
                this.spriteBasePosX,
                this.spriteBasePosY,
                this.cropX,
                this.cropY,
                this.x,
                this.y,
                this.cropX, this.cropY
            )

            ctx.drawImage(
                sprites,
                this.spriteBasePosX,
                this.spriteBasePosY,
                this.cropX,
                this.cropY,
                (this.x + this.cropX),
                this.y,
                this.cropX, this.cropY
            )
        },
        update() {
            const movXfloor = 2
            const repeat = this.cropX / 2
            const moveX = this.x - movXfloor
            this.x = moveX % repeat
        }
    }
    return floor
}
