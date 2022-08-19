import { canvas, ctx, sprites } from './Canvas.js'
import { changeToScreen, globals, Screens } from './Scenes.js'

export function inicializePipe() {
    const pipe = {
        spriteX: 52, spriteY: 300, // Sprite Pos, X, Y width ,height
        floor: {
            spriteX: 0,
            spriteY: 169,
        },
        sky: {
            spriteX: 52,
            spriteY: 269,
        },
        spacing: 80,
        pairs: [],
        draw() {
            this.pairs.forEach(pair => {
                const randomY = pair.y
                const spacingBettweenPipes = 100
                
                // Pipe Sky
                const skyX = pair.x
                const skyY = randomY
                ctx.drawImage(
                    sprites,
                    this.sky.spriteX, 
                    this.sky.spriteY,
                    this.spriteX, 
                    this.spriteY,
                    skyX, 
                    skyY,
                    this.spriteX, 
                    this.spriteY,
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

                pair.sky = {
                    x: skyX,
                    y: this.spriteY + skyY
                }
                pair.floor = {
                    x: floorX,
                    y: floorY
                }
            })
        },
        hasCollisionPlayer(pair) {
			const headPlayer = globals.Player.y
			const footPlayer = globals.Player.y + globals.Player.cropY
			if ((globals.Player.x + globals.Player.cropX) >= pair.x) {
				if (headPlayer <= pair.sky.y) {
                    console.log(pair.x)
                    return true
                }
				if (footPlayer >= pair.floor.y) {
                    console.log(pair.y)
                    return true
                }
			}
            return false
		},
        update() {
            const passedOneHundredFrames = globals.frames % 100 === 0

            if (passedOneHundredFrames) {
                this.pairs.push({
                    x: canvas.width,
                    y:  -150 * (Math.random() + 1) // Worked
                })
            }
            this.pairs.forEach(pair => {
                pair.x = pair.x -2

                if (this.hasCollisionPlayer(pair)) {
                    changeToScreen(Screens.start)
                }

                if(pair <= 0) this.pairs.shift()
            })
        }
    }

    return pipe
}
