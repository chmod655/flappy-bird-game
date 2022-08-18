import { Screens, changeToScreen, screenActive } from './modules/Scenes.js'

let frames = 0

function main() 
{
    screenActive.draw()
    screenActive.update()

    frames += 1
    requestAnimationFrame(main)
}

window.addEventListener('click', () => {
    if (screenActive.click) {
        screenActive.click()
    }
})

changeToScreen(Screens.start)
main()
