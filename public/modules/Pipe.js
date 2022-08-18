import { canvas, ctx, sprites } from "./Canvas.js"

export function inicializePipe() {
    const pipe = {
        spriteX: 52, spriteY: 300, // Sprite Pos, X, Y
        floor: {
            spriteX: 0,
            spriteY: 169,
        },
        sky: {
            spriteX: 54,
            spriteY: 269,
        },
        spacing: 80,
        pairs: [],
        draw() {
            this.pairs.forEach(pair => {
                const randomY = pair.y
                const spacingBettweenPipes = 70
                
                // Pipe Sky
                const skyX = pair.x
                const skyY = randomY
                ctx.drawImage(
                    sprites,
                    this.sky.spriteX, this.sky.spriteY,
                    this.spriteX, this.spriteY,
                    skyX, skyY,
                    this.spriteX, this.spriteY,
                )

                // Pipe Floor
                const floorX = pair.x
                const floorY = this.spriteY + spacingBettweenPipes + randomY
                ctx.drawImage(
                    sprites,
                    this.floor.spriteX, this.floor.spriteY,
                    this.spriteX, this.spriteY,
                    floorX, floorY,
                    this.spriteX, this.spriteY,
                )
            })
        },
        update() {
            const passedOneHundredFrames = frames % 100 === 0
            if (passedOneHundredFrames) {
                this.pairs.push({
                    x: canvas.width,
                    y:  -200 * Math.random() + 2
                })
            }
            this.pairs.forEach(pair => {
                pair.x = pair.x -2

                if(pair <= 0) this.pairs.shift()
            })
        }
    }

    return pipe
}
