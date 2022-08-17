// Getter elements, id, class or anything
const canvas = document.querySelector('canvas')

// Create Image Assets
const sprites = new Image()
sprites.src = 'assets/sprites/sprites.png'

// Create Sound Effects
// const sounds = new Audio()
// sounds.src = 'assets/sounds/sounds.mp3'

// Canvas

// Create Context
const ctx = canvas.getContext('2d')

// Collision Detection
const collision = (loadFlappy, loadBase) => {
    playerY = loadFlappy.y + loadFlappy.cropY
    const floorY = loadBase.y

    if(playerY >= floorY) return true
    return false
}
const initPlayer = () => {
    const player = {
            spriteFlappyBirdPosX: 0,
            spriteFlappyBirdPosY: 0,
            cropX: 33, // Using in sprite cropX and canvasSizeInX
            cropY: 24, // Using in sprite cropY and canvasSizeInY
            x: 10,
            y: 50,
            gravity: 0,
            gravityForce: 0.25,
            draw() {
                ctx.drawImage(
                    sprites,
                    this.spriteFlappyBirdPosX,
                    this.spriteFlappyBirdPosY,
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
                if(collision(loadFlappy, loadBase)){
                    changeToScreen(Screens.Start)
                    return
                }
    
                // Gravity
                this.gravity = this.gravity + this.gravityForce
                this.y = this.y + this.gravity
            },
            jumpForce: 6.5,
            jump() {
                this.gravity =- this.jumpForce
            }
        }

    return player
}
// Refactoring
const properties = {
    loadMenuScreenStart: {
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
    }, //x FlappyBird
    loadBase: {
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
        }
    }, // Base
    loadBackground: {
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
}

const { loadFlappy, loadBase, loadBackground, loadMenuScreenStart } = properties
let screenActive = {}, Globals = {}

const changeToScreen = (newScreen) => {
    screenActive = newScreen

    if(screenActive.inicialize) inicialize()
}

const Screens = {
    Start: {
        inicialize() {
            Globals.initPlayer = initPlayer()
        },
        draw(){
            loadBackground.draw()
            loadBase.draw() // Layer 0
            Globals.initPlayer.draw()
            loadMenuScreenStart.draw()
        },
        update() {

        },
        click() {
            changeToScreen(Screens.Game)
        }

    }
}

Screens.Game = {
    draw() {
        loadBackground.draw()
        loadBase.draw() // Layer 0
        Globals.initPlayer.draw() // Layer 1 - Top
    },
    update() {
        Globals.initPlayer.update()
    },
    click() {
        Globals.initPlayer.jump()
    }
}

const loadSprites = () => {
    screenActive.draw()
    screenActive.update()

    // Req animation frame on loadSprites
    requestAnimationFrame(loadSprites)
}

window.addEventListener('click', () => {
    if(screenActive.click) 
    {
        screenActive.click()
    }
})

changeToScreen(Screens.Start)
loadSprites()