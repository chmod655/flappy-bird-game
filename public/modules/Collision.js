export function Collision(player, floor) {
    const playerY = player.y + player.cropY;
    const floorY = floor.y

    if (playerY >= floorY) return true
    return false
}