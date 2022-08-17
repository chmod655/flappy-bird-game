// Frames Set
let frames = 0

// Getter elements, id, class or anything
const canvas = document.querySelector('canvas')

// Create Image Assets
const sprites = new Image()
sprites.src = 'assets/sprites/sprites.png'


// Create Sound Effects
const effectDropHit = new Audio()
effectDropHit.src = 'assets/soundEffects/hit.wav'

// Create Context
const ctx = canvas.getContext('2d')

// Set up Sprite
// Properties Background
const background = {
    backgroundColor: '#70c5ce',
    spriteBgPosX: 390,
    spriteBgPosY: 0,
    cropX: 275, // Using in sprite cropX and canvasSizeInX
    cropY: 204, // Using in sprite cropY and canvasSizeInY
    x: 0,
    y: canvas.height - 203,
    draw() {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(
            sprites,
            this.spriteBgPosX,
            this.spriteBgPosY,
            this.cropX,
            this.cropY,
            this.x, this.y,
            this.cropX, this.cropY
        )
        ctx.drawImage(
            sprites,
            this.spriteBgPosX,
            this.spriteBgPosY,
            this.cropX,
            this.cropY,
            (this.x + this.cropX), this.y,
            this.cropX, this.cropY
        )
    }
}

// Psychics
function Collision(player, floor) {
    const playerY = player.y + player.cropY;
    const floorY = floor.y

    if (playerY >= floorY) return true
    return false
}

// Floor Information
function inicializeFloor() {
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

// Player Information
function inicializePlayer() {

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

                effectDropHit.play()

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
// Menu Information
const menu = {
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

// Pipes Information
function inicializePipe() {
    const pipe = {
        spriteX: 52, spriteY: 300, // Sprite Pos, X, Y
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
                    y:  -150 * Math.random() + 1
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

// Screen Properties
const globals = {}
let screenActive = {}

function changeToScreen(newScreen) {
    screenActive = newScreen
    if (screenActive.initialize) {
        screenActive.initialize()
    }
}

const Screens = {
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
            globals.Floor.draw()
            globals.Pipe.draw()
            // menu.draw()
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

        globals.Floor.draw()
        globals.Pipe.draw()
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

function loop() {
    screenActive.draw()
    screenActive.update()

    frames += 1
    requestAnimationFrame(loop)
}

window.addEventListener('click', () => {
    if (screenActive.click) {
        screenActive.click()
    }
})

changeToScreen(Screens.start)
loop()