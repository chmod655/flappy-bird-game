import { ctx, sprites } from './Canvas.js'
import { Collision } from './Collision.js'
import { globals, Screens, changeToScreen } from './Scenes.js'

export function inicializePlayer() {
    
    const player = {
        spriteX: 0,
        spriteY: 0,
        cropX: 33, // Using in sprite cropX and canvasSizeInX
        cropY: 24, // Using in sprite cropY and canvasSizeInY
        x: 10,
        y: 50,
        gravity: 0,
        gravityForce: 0.25,
        jumpForce: 6.5,
        movements: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 52 },
            { spriteX: 0, spriteY: 26 }
        ],
        currentFrame: 0,
        // Methods
        updateCurrentFrames() {

            const frameInterval = 5
            const frameTime = frames % frameInterval === 0
            if (frameTime) {
                const baseOfIncrement = 1
                const increment = baseOfIncrement + this.currentFrame
                const baseRepeat = this.movements.length
                this.currentFrame = increment % baseRepeat

            }
        },
        draw() {

            this.updateCurrentFrames()

            const { spriteX, spriteY } = this.movements[this.currentFrame]
            ctx.drawImage(
                sprites,
                spriteX,
                spriteY,
                this.cropX,
                this.cropY,
                this.x,
                this.y,
                this.cropX,
                this.cropY
            )
        },
        update() {
            // Collision detection
            if (Collision(this, globals.Floor)) {

                // Sound Effect
                //effectDropHit.play()

                setTimeout(() => changeToScreen(Screens.start), 400)
                return
            }

            // Gravity
            this.gravity = this.gravity + this.gravityForce
            this.y = this.y + this.gravity
        },
        jump() {
            this.gravity = - this.jumpForce
        }
    }
    return player
}