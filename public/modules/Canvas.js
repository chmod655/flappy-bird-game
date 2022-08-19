// Tag canvas
export const canvas = document.querySelector('canvas')
// Criando o context
export const ctx = canvas.getContext('2d')
// Carregando sprites
export const sprites = new Image()
sprites.src = 'assets/sprites/sprites.png'

export const hitEffect = new Audio()
hitEffect.src = 'assets/soundEffects/hit.wav'
