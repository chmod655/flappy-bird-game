import { Screens, changeToScreen, screenActive, globals } from './modules/Scenes.js'

globals.frames = 0

function main() {
    screenActive.draw()
    screenActive.update()

    globals.frames += 1
    requestAnimationFrame(main)
}

window.addEventListener('click', () => {
    if (screenActive.click) {
        screenActive.click()
    }
})

changeToScreen(Screens.start)
main()
