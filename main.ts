namespace SpriteKind {
    export const slime = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(mySprite, "move"))) {
        move()
        sprites.setDataBoolean(mySprite, "move", true)
        for (let index = 0; index < 8; index++) {
            mySprite.y += -1
            pause(10)
        }
        sprites.setDataBoolean(mySprite, "move", false)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    move()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(mySprite, "move"))) {
        move()
        sprites.setDataBoolean(mySprite, "move", true)
        for (let index = 0; index < 8; index++) {
            mySprite.x += -1
            pause(10)
        }
        sprites.setDataBoolean(mySprite, "move", false)
    }
})
function setSpritePos (sprite: Sprite, x: number, y: number) {
    sprite.top = y
    sprite.left = x
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(mySprite, "move"))) {
        move()
        sprites.setDataBoolean(mySprite, "move", true)
        for (let index = 0; index < 8; index++) {
            mySprite.x += 1
            pause(10)
        }
        sprites.setDataBoolean(mySprite, "move", false)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(mySprite, "move"))) {
        move()
        sprites.setDataBoolean(mySprite, "move", true)
        for (let index = 0; index < 8; index++) {
            mySprite.y += 1
            pause(10)
        }
        sprites.setDataBoolean(mySprite, "move", false)
    }
})
function move () {
    for (let value of sprites.allOfKind(SpriteKind.slime)) {
        timer.background(function () {
            sprites.setDataNumber(value, "movedir", randint(0, 3))
            for (let index = 0; index < 8; index++) {
                value.x += directions[sprites.readDataNumber(value, "movedir")][0]
                value.y += directions[sprites.readDataNumber(value, "movedir")][1]
                pause(10)
            }
        })
    }
}
let directions: number[][] = []
let mySprite: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 128
    export const ARCADE_SCREEN_HEIGHT = 128
}
let maps = [tileUtil.createSmallMap(tilemap`level2`)]
tiles.setCurrentTilemap(maps[0])
mySprite = sprites.create(img`
    . c c c c c c . 
    . c 1 1 1 1 c . 
    . c 1 c 1 c c . 
    . c 1 1 1 1 c . 
    c c c c c c c c 
    c 1 1 1 1 1 1 c 
    c c 1 1 1 1 c c 
    . c 1 c c 1 c . 
    `, SpriteKind.Player)
setSpritePos(mySprite, 64, 64)
sprites.setDataBoolean(mySprite, "move", false)
tileUtil.createSpritesOnTiles(assets.tile`myTile3`, img`
    . . c c c c . . 
    . c 5 5 5 5 c . 
    c 5 5 5 5 5 5 c 
    5 5 5 5 5 5 5 5 
    5 c 5 5 5 5 5 5 
    5 5 c c 5 5 5 5 
    c 5 5 5 5 5 5 c 
    . c c c c c c . 
    `, SpriteKind.slime)
tileUtil.replaceAllTiles(assets.tile`myTile3`, assets.tile`myTile12`)
directions = [
[0, -1],
[0, 1],
[-1, 0],
[1, 0]
]
for (let value of sprites.allOfKind(SpriteKind.slime)) {
    sprites.setDataNumber(value, "movedir", randint(0, 3))
}
