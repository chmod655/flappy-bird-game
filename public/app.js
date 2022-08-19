import { Screens, changeToScreen, screenActive, globals } from './modules/Scenes.js'

function main() 
{
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
