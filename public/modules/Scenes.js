import { menu } from './Menu.js'
import { background } from './Background.js'
import { inicializePipe } from './Pipe.js'
import { inicializeFloor } from './Floor.js'
import { inicializePlayer } from './Player.js'

export const globals = {}
export let screenActive = {}

export function changeToScreen(newScreen) {
    screenActive = newScreen
    if (screenActive.initialize) {
        screenActive.initialize()
    }
}

export const Screens = {
    start: {
        // Methods
        initialize() {
            globals.Player = inicializePlayer()
            globals.Floor = inicializeFloor()
            globals.Pipe = inicializePipe()
        },
        draw() {
            background.draw()

            globals.Player.draw()
            globals.Pipe.draw()
            globals.Floor.draw()
            menu.draw()
        },
        update() {
            globals.Floor.update()
            globals.Pipe.update()
        },
        click() {
            changeToScreen(Screens.GAME)
        },

    }
}

Screens.GAME = {
    // Methods
    draw() {
        background.draw()

        globals.Pipe.draw()
        globals.Floor.draw()
        globals.Player.draw()
    },
    click() {
        globals.Player.jump()
    },
    update() {
        globals.Player.update()
        globals.Pipe.update()
        globals.Floor.update()
    }
}
