import { canvas, ctx } from "./Canvas.js"
import { globals } from "./Scenes.js"

export function inicializeScore() {
    const score = {
        points: 0,
        draw() {
            ctx.font = '16pt VT323'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'right'
            ctx.fillText(`Score: ${score.points}`, canvas.width - 15, 25)
        }, 
        update() {
            const frameInterval = 10
            const frameTime = globals.frames % frameInterval === 0

            if(frameTime) this.points += 1
        }
    }
    
    return score
}