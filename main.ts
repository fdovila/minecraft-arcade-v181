namespace SpriteKind {
    export const Background = SpriteKind.create()
    export const EDIBLEfood = SpriteKind.create()
    export const Wood = SpriteKind.create()
    export const lightsprite = SpriteKind.create()
    export const s = SpriteKind.create()
    export const sword = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (StatusbarExists) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -125
        }
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    blockMenu.showMenu(item_list, MenuStyle.Grid, MenuLocation.FullScreen)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Wood, function (sprite, otherSprite) {
    music.pewPew.play()
    otherSprite.destroy()
    mySprite9.setImage(img`
        cccccccccccccccccc
        c1111111111111111c
        c1111111eeeeef111c
        c11eeeeeedeeefff1c
        c11eeeededdeefff1c
        c11eddeededeefff1c
        c11eedeededdefff1c
        c11eedeedeedefff1c
        c11eededdeedefff1c
        c11eddedeeddefff1c
        c11edeedeedeefff1c
        c11eeeddeddeefff1c
        c11eeeeeeeeedfff1c
        c11111eeeeedefff1c
        c111111111edef111c
        c1111111111111111c
        c1111111111111111c
        cccccccccccccccccc
        `)
    woodblock += 1
    textSprite2.setText(convertToText(woodblock))
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    otherSprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.left.isPressed()) {
        location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Left)
    } else if (controller.right.isPressed()) {
        location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Right)
    } else if (controller.up.isPressed()) {
        location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Top)
    } else {
        location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom)
    }
    if (!(tiles.tileIsWall(location))) {
        if (block == 0) {
            if (Math.percentChance(50)) {
                tiles.setTileAt(location, assets.tile`myTile`)
                tiles.setWallAt(location, true)
            } else {
                tiles.setTileAt(location, assets.tile`myTile1`)
                tiles.setWallAt(location, true)
            }
        }
        if (block == 1) {
            tiles.setTileAt(location, assets.tile`woodBlock`)
            tiles.setWallAt(location, true)
        }
        if (block == 2) {
            tiles.setTileAt(tiles.locationOfSprite(mySprite), assets.tile`torchHalfBlock`)
        }
        if (block == 3) {
            tiles.setTileAt(tiles.locationOfSprite(mySprite), assets.tile`myTile8`)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EDIBLEfood, function (sprite, otherSprite) {
    music.pewPew.play()
    otherSprite.destroy()
    mySprite8.setImage(img`
        cccccccccccccccccc
        c111111111f111111c
        c11111111ff111111c
        c1111111ff1111111c
        c1111eeefeee11111c
        c11ee22ff222ee111c
        c1e221efe2222ee11c
        c1e22311113222e11c
        c1e22222222222e11c
        c1e22222222222e11c
        c1e22222222222e11c
        c1e22222222222e11c
        c11e2222222222e11c
        c11e222222222e111c
        c111e22222222e111c
        c1111e222222e1111c
        c11111eeeeee11111c
        cccccccccccccccccc
        `)
    apples += 1
    textSprite1.setText(convertToText(apples))
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (chose_indext == 1) {
        if (StatusbarExists) {
            if (apples != 0) {
                statusbar3.value += 25
                apples += -1
                textSprite1.setText(convertToText(apples))
            }
        }
    } else if (chose_indext == 3) {
        if (selected_item == "pick_ax") {
            if (item_level == 0) {
                dig_speed = 25
            }
            if (item_level == 1) {
                dig_speed = 35
            }
            if (item_level == 2) {
                dig_speed = 55
            }
            if (item_level == 3) {
                dig_speed = 95
            }
        }
        if (selected_item == "sword") {
            mySprite11 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . b b . . . . . . . . . . . . 
                . . b b b . b . . . . . . . . . 
                . . . b b b b . . . . . . . . . 
                . . . . b e e . . . . . . . . . 
                . . . b b e e e . . . . . . . . 
                . . . . . . e e e . . . . . . . 
                . . . . . . . e e e . . . . . . 
                . . . . . . . . e e e . . . . . 
                . . . . . . . . . e e e . . . . 
                . . . . . . . . . . e e e . . . 
                . . . . . . . . . . . e e . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.sword)
            if (item_level == 0) {
                damage = 5
            }
            if (item_level == 1) {
                damage = 6
                mySprite11.image.replace(14, 12)
            }
            if (item_level == 2) {
                damage = 7
                mySprite11.image.replace(14, 13)
            }
            if (item_level == 3) {
                damage = 8
                mySprite11.image.replace(14, 9)
            }
            for (let index = 0; index <= 360; index++) {
                transformSprites.rotateSprite(mySprite11, index)
                spriteutils.placeAngleFrom(
                mySprite11,
                index / 45,
                8,
                mySprite
                )
            }
        }
    } else {
        dig_speed = 15
        damage = 1
    }
})
controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    command = game.askForString("", 24)
    if (command == "diamondpickax") {
        selected_item = "pick_ax"
        item_level = 3
        mySprite10.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 9 9 9 . . . . . . . . 
            . . . . 9 9 9 9 9 9 . . . . . . 
            . . . . . . . 9 9 9 8 8 e . . . 
            . . . . . . . . 9 8 8 8 8 . . . 
            . . . . . . . . . 8 8 8 8 . . . 
            . . . . . . . . e e 8 8 9 9 . . 
            . . . . . . . e e e . 9 9 9 . . 
            . . . . . . e e e . . . 9 9 . . 
            . . . . . e e e . . . . . 9 9 . 
            . . . . e e e . . . . . . 9 9 . 
            . . . e e e . . . . . . . 9 9 . 
            . . e e e . . . . . . . . . . . 
            . e e e . . . . . . . . . . . . 
            e e e . . . . . . . . . . . . . 
            e e . . . . . . . . . . . . . . 
            `)
    }
})
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    if (tiles.tileAtLocationEquals(tiles.locationOfSprite(mySprite), assets.tile`myTile6`)) {
        tiles.setTileAt(tiles.locationOfSprite(mySprite), assets.tile`transparency16`)
    }
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (chose_indext < 3) {
        chose_indext += 1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    if (controller.up.isPressed()) {
        sprite.vy = -100
    } else if (controller.A.isPressed()) {
        sprite.vy = -1
    } else {
        sprite.vy = 100
    }
})
function Startup () {
    backgroundStarter = sprites.create(img`
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `, SpriteKind.Background)
    animation.runImageAnimation(
    backgroundStarter,
    [img`
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f 1 f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 1 1 1 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f 1 f f f 1 f 1 f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f 1 f f f 1 f 1 1 1 1 f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 1 1 1 1 f 1 1 1 1 f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 f f f 1 f 1 f f f f 1 f f f 
        f 1 f f f 1 f 1 1 1 1 f 1 f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `,img`
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 1 1 1 1 f 1 1 1 1 f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f f f f f f f f f f f f f f f f 
        f f f f f 1 f f f f f f f f f f 
        f f f f f 1 f f f f f f f f f f 
        f f f f f 1 f f f f f f f f f f 
        f f f f f 1 f f f f f f f f f f 
        f f f f f 1 f f f f f f f f f f 
        `,img`
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 1 1 1 1 f 1 1 1 1 f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f f f f f f f f f f f f f f f f 
        f f f f 1 1 1 f 1 f f f f f f f 
        f f f f f 1 f f 1 f f f f f f f 
        f f f f f 1 f f 1 f f f f f f f 
        f f f f f 1 f f 1 f f f f f f f 
        f f f f 1 1 1 f 1 f f f f f f f 
        `,img`
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 1 1 1 1 f 1 1 1 1 f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f f f f f f f f f f f f f f f f 
        f f f f 1 1 1 f 1 1 1 f 1 f f f 
        f f f f f 1 f f 1 f 1 f 1 f f f 
        f f f f f 1 f f 1 f 1 f 1 f f f 
        f f f f f 1 f f 1 f 1 f 1 f f f 
        f f f f 1 1 1 f 1 f 1 f 1 f f f 
        `,img`
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 1 1 1 1 f 1 1 1 1 f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f f 1 1 f 
        f 1 f f f 1 f 1 f f f f 1 f f 1 
        f 1 f f f 1 f 1 1 1 1 f 1 f f 1 
        f f f f f f f f f f f f f f f f 
        f f f f 1 1 1 f 1 1 1 f 1 1 1 f 
        f f f f f 1 f f 1 f 1 f 1 f f f 
        f f f f f 1 f f 1 f 1 f 1 f f f 
        f f f f f 1 f f 1 f 1 f 1 f f f 
        f f f f 1 1 1 f 1 f 1 f 1 1 1 f 
        `],
    200,
    false
    )
    tiles.setTilemap(tilemap`mcMap`)
    game.setDialogFrame(img`
        ..66666666666666666666..
        .6699999999999999999966.
        669991111111111111199966
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        699911111111111111119996
        669991111111111111199966
        .6699999999999999999966.
        ..66666666666666666666..
        `)
    game.setDialogCursor(assets.image`mcSplashCursor`)
    game.showLongText("Credits to E-EnerG-Gamecentral, Kiwiphoenix364, and Eden264!", DialogLayout.Full)
}
function spawnPlayerMap () {
    mySprite = sprites.create(img`
        . . . 1 e e e e e e e 1 . . . 
        . . . 1 d d d d d d d 1 . . . 
        . . . 1 d 1 8 d 8 1 d 1 . . . 
        . . . 1 d d d d d d d 1 . . . 
        . . . 1 d d f f f d d 1 . . . 
        1 1 1 1 d d d d d d d 1 1 1 1 
        1 6 6 6 6 6 6 6 6 6 6 6 6 6 1 
        1 6 8 1 6 8 6 6 6 6 8 1 8 6 1 
        1 6 8 1 6 8 6 6 8 6 8 1 8 6 1 
        1 6 6 1 6 6 6 6 8 6 6 1 6 6 1 
        1 d d 1 6 6 6 6 6 6 6 1 d d 1 
        1 d e 1 8 8 8 8 6 6 6 1 e d 1 
        1 d d 1 8 8 8 8 8 8 8 1 d d 1 
        1 1 1 1 8 8 8 1 8 8 8 1 1 1 1 
        . . . 1 8 8 8 1 8 8 8 1 . . . 
        . . . 1 b b b 1 b b b 1 . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 0)
    scene.cameraFollowSprite(mySprite)
    mySprite.ay = 360
    mySprite4 = sprites.create(img`
        cccccccccccccccccc
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        cccccccccccccccccc
        `, SpriteKind.Projectile)
    mySprite4.setFlag(SpriteFlag.Ghost, true)
    mySprite4.setPosition(37, 100)
    mySprite4.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite = textsprite.create("0", 1, 12)
    textSprite.setPosition(33, 104)
    textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    mySprite41 = sprites.create(img`
        cccccccccccccccccc
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        cccccccccccccccccc
        `, SpriteKind.Projectile)
    mySprite41.setFlag(SpriteFlag.Ghost, true)
    mySprite41.setPosition(56, 100)
    mySprite41.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite1 = textsprite.create("0", 1, 12)
    textSprite1.setPosition(52, 104)
    textSprite1.setFlag(SpriteFlag.RelativeToCamera, true)
    tiles.setTilemap(tilemap`mcMap`)
    color.startFade(color.Black, color.originalPalette, 1000)
    for (let index = 0; index < randint(10, 100); index++) {
        Apple = sprites.create(img`
            . . . . . . . . . f . . . . . . 
            . . . . . . . . f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . e e e f e e e . . . . . 
            . . e e 2 2 f f 2 2 2 e e . . . 
            . e 2 2 1 e f e 2 2 2 2 e e . . 
            . e 2 2 3 1 1 1 1 3 2 2 2 e . . 
            . e 2 2 2 2 2 2 2 2 2 2 2 e . . 
            . e 2 2 2 2 2 2 2 2 2 2 2 e . . 
            . e 2 2 2 2 2 2 2 2 2 2 2 e . . 
            . e 2 2 2 2 2 2 2 2 2 2 2 e . . 
            . . e 2 2 2 2 2 2 2 2 2 2 e . . 
            . . e 2 2 2 2 2 2 2 2 2 e . . . 
            . . . e 2 2 2 2 2 2 2 2 e . . . 
            . . . . e 2 2 2 2 2 2 e . . . . 
            . . . . . e e e e e e . . . . . 
            `, SpriteKind.EDIBLEfood)
        tiles.placeOnRandomTile(Apple, assets.tile`leafBlock`)
        Apple.ay = 400
    }
    textSprite2 = textsprite.create("0", 1, 12)
    textSprite2.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite2.setFlag(SpriteFlag.Ghost, true)
    textSprite2.setPosition(71, 104)
    mysprite42 = sprites.create(img`
        cccccccccccccccccc
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        cccccccccccccccccc
        `, SpriteKind.Projectile)
    mysprite42.setFlag(SpriteFlag.Ghost, true)
    mysprite42.setPosition(75, 100)
    mysprite42.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite.z = 500
    textSprite1.z = 500
    textSprite2.z = 500
    myspreat43 = sprites.create(img`
        cccccccccccccccccc
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        c1111111111111111c
        cccccccccccccccccc
        `, SpriteKind.Projectile)
    myspreat43.setFlag(SpriteFlag.Ghost, true)
    myspreat43.setPosition(94, 100)
    myspreat43.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite22 = textsprite.create("0", 1, 12)
    textSprite22.setPosition(90, 104)
    textSprite22.setFlag(SpriteFlag.RelativeToCamera, true)
    textSprite22.z = 500
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let index = 0; index < randint(3, 5); index++) {
        if (controller.left.isPressed()) {
            location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Left)
        } else if (controller.right.isPressed()) {
            location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Right)
        } else if (controller.up.isPressed()) {
            location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Top)
        } else {
            location = tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom)
        }
        if (tiles.tileAtLocationEquals(location, sprites.builtin.forestTiles2)) {
            mySprite3 = sprites.create(gress_list._pickRandom(), SpriteKind.Projectile)
        } else {
            mySprite3 = sprites.create(list._pickRandom(), SpriteKind.Projectile)
        }
        mySprite3.setFlag(SpriteFlag.BounceOnWall, true)
        mySprite3.vx = randint(-25, 25)
        mySprite3.ay = randint(300, 360)
        mySprite3.lifespan = randint(300, 360)
        tiles.placeOnTile(mySprite3, location)
    }
    if (Math.percentChance(dig_speed)) {
        if (!(tiles.tileAtLocationEquals(location, assets.tile`woodBlock`))) {
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
            mySprite5 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . e e f . . . 
                . . . . . . . . e e e e f f f . 
                . . . . e e e e c e e e f f f . 
                . . e e e e e e e e e e f f f . 
                . . e e e e e e e e c e f f f . 
                . . e c e e e e e e e e f f f . 
                . . e e e e e e e e e e f f f . 
                . . e e e e c e e e e e f f f . 
                . . c e e e e e e c e e f f f . 
                . . e e e e e e e e e e f f f . 
                . . . e e e c e e e e e f f f . 
                . . . . . . . e e e e e f f f . 
                . . . . . . . . . . e e f . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Food)
            tiles.placeOnTile(mySprite5, location)
            mySprite5.ay = 400
        } else {
            if (!(tiles.tileAtLocationEquals(location, assets.tile`transparency16`))) {
                tiles.setTileAt(location, assets.tile`transparency16`)
                tiles.setWallAt(location, false)
                mySprite5 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . e e e e e f . . . 
                    . . e e e e e e d e e e f f f . 
                    . . e e e e d e d d e e f f f . 
                    . . e d d e e d e d e e f f f . 
                    . . e e d e e d e d d e f f f . 
                    . . e e d e e d e e d e f f f . 
                    . . e e d e d d e e d e f f f . 
                    . . e d d e d e e d d e f f f . 
                    . . e d e e d e e d e e f f f . 
                    . . e e e d d e d d e e f f f . 
                    . . e e e e e e e e e d f f f . 
                    . . . . . e e e e e d e f f f . 
                    . . . . . . . . . e d e f . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Wood)
                tiles.placeOnTile(mySprite5, location)
                mySprite5.ay = 400
            }
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    blockMenu.showMenu([
    "stick",
    "wood plank",
    "iron ingot",
    "wooden sword",
    "stone sword",
    "iron sword",
    "diamond sword",
    "wooden pick-ax",
    "stone pick-ax",
    "iron pick-ax",
    "diamond pick-ax"
    ], MenuStyle.Grid, MenuLocation.FullScreen)
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (chose_indext > 0) {
        chose_indext += -1
    }
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 500, function () {
        info.changeScoreBy(1)
    })
})
/**
 * wood
 * 
 * stone
 * 
 * metel
 * 
 * diamond
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.pewPew.play()
    otherSprite.destroy()
    mySprite7.setImage(img`
        ddddddddddddddddd
        deeeebeeeeceebebd
        deceeccceceebeccd
        deecbeeebceecbbed
        dcbeceebeeecebeed
        deebceeeecebeeced
        dceeeebbbeeceeebd
        deeebeebbebbeeeed
        debbeeceeceeebeed
        deeeeecceeeeeeced
        deceecceeeecbbeed
        deebeebecbbceebed
        deeeeeeececceeecd
        dceeeebeeeeeeebbd
        deeeeeeeecccebeed
        deebececbeeeeeeed
        debeeebeeeeebeecd
        ddddddddddddddddd
        `)
    dirt += 1
    textSprite.setText(convertToText(dirt))
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    otherSprite.destroy()
})
blockMenu.onMenuOptionSelected(function (option, index) {
    blockMenu.closeMenu()
    if (option == "exit") {
        blockMenu.closeMenu()
    } else if (option == "stick") {
        if (1 < wood_plank) {
            stick += 4
            wood_plank += -2
        }
    } else if (option == "wood plank") {
        if (0 < woodblock) {
            woodblock += -1
            wood_plank += 4
        }
    } else if (option == "wooden pick-ax") {
        if (2 < wood_plank) {
            if (1 < stick) {
                item_list.unshift("_wooden pick-ax_")
                stick += -2
                wood_plank += -3
            }
        }
    } else if (option == "wooden sword") {
        if (1 < wood_plank) {
            if (0 < stick) {
                item_list.unshift("_wooden sword_")
                wood_plank += -2
                stick += -1
            }
        }
    } else if (option == "iron ingot") {
        if (0 < iron_ore) {
            if (0 < coal) {
                iron += 1
                iron_ore += -1
                coal += -1
            }
        }
    } else if (option == "_wooden pick-ax_") {
        selected_item = "pick_ax"
        item_level = 0
        mySprite10.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . e e e . . . . . . . . 
            . . . . e e e e e e . . . . . . 
            . . . . . . . e e e b b e . . . 
            . . . . . . . . e b b b b . . . 
            . . . . . . . . . b b b b . . . 
            . . . . . . . . e e b b e e . . 
            . . . . . . . e e e . e e e . . 
            . . . . . . e e e . . . e e . . 
            . . . . . e e e . . . . . e e . 
            . . . . e e e . . . . . . e e . 
            . . . e e e . . . . . . . e e . 
            . . e e e . . . . . . . . . . . 
            . e e e . . . . . . . . . . . . 
            e e e . . . . . . . . . . . . . 
            e e . . . . . . . . . . . . . . 
            `)
    } else if (option == "_wooden sword_") {
        selected_item = "sword"
        item_level = 0
        mySprite10.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . b b . . . . . . . . . . . . 
            . . b b b . b . . . . . . . . . 
            . . . b b b b . . . . . . . . . 
            . . . . b e e . . . . . . . . . 
            . . . b b e e e . . . . . . . . 
            . . . . . . e e e . . . . . . . 
            . . . . . . . e e e . . . . . . 
            . . . . . . . . e e e . . . . . 
            . . . . . . . . . e e e . . . . 
            . . . . . . . . . . e e e . . . 
            . . . . . . . . . . . e e . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
    	
    }
})
let iron = 0
let coal = 0
let iron_ore = 0
let stick = 0
let wood_plank = 0
let dirt = 0
let mySprite5: Sprite = null
let mySprite3: Sprite = null
let textSprite22: TextSprite = null
let Apple: Sprite = null
let textSprite: TextSprite = null
let backgroundStarter: Sprite = null
let command = ""
let damage = 0
let mySprite11: Sprite = null
let item_level = 0
let selected_item = ""
let textSprite1: TextSprite = null
let apples = 0
let block = 0
let location: tiles.Location = null
let textSprite2: TextSprite = null
let woodblock = 0
let dig_speed = 0
let item_list: string[] = []
let myspreat43: Sprite = null
let mysprite42: Sprite = null
let mySprite41: Sprite = null
let mySprite4: Sprite = null
let mySprite10: Sprite = null
let mySprite9: Sprite = null
let mySprite8: Sprite = null
let mySprite7: Sprite = null
let chose_indext = 0
let mySprite: Sprite = null
let statusbar3: StatusBarSprite = null
let StatusbarExists = false
let list: Image[] = []
let gress_list: Image[] = []
gress_list = [
img`
    7 
    6 
    `,
img`
    7 
    5 
    `,
img`
    7 
    e 
    `,
img`
    f 
    6 
    `,
img`
    f 
    `,
img`
    e 
    `,
img`
    7 
    `,
img`
    5 
    `,
img`
    6 
    `
]
list = [
img`
    e 
    `,
img`
    c 
    `,
img`
    f 
    `,
img`
    b 
    `
]
tiles.setTilemap(tilemap`level2`)
let l = true
Startup()
for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
    tiles.setWallAt(value, true)
    if (Math.percentChance(50)) {
        tiles.setTileAt(value, assets.tile`myTile1`)
    } else {
        tiles.setTileAt(value, assets.tile`myTile`)
    }
    pause(1)
}
color.startFade(color.originalPalette, color.Black, 1000)
scene.setBackgroundColor(9)
tiles.centerCameraOnTile(tiles.getTileLocation(randint(0, 199), randint(0, 99)))
pause(100)
let splashText = [
"85121215?? [static] 920 [static] 1315 [static] 145242119 [static] 1618913112 [static] 185161518209147 [static] 8524 [line cuts]",
"Make your own Minecraftopia!",
"[insert quirky text here]",
"Now in 3D! Well... kinda...",
"Under New Management!",
"8-bit!",
"More arcadier!",
"Minceraft",
"Also try Minecraft Dungeons",
"Better than ever!",
"Now with apples!",
"1% sugar!",
"100% pure!",
"12345 is a bad password!",
"Absolutely no memes!",
"Also try Terraria!",
"As seen on TV!",
"Awesome game design right there!",
"Aww man!",
"Check out the far lands!",
"Bring it on!",
"Contains simulated goats!",
"Exploding creepers!",
"Fabulous graphics!",
"Feature packed!",
"Haha, LOL!",
"Heaps of hits on YouTube!",
"In case it isn't obvious, foxes aren't players.",
"It's a game!",
"Arcadelicious edition",
"Minecraft Java Edition presents: Disgusting Bugs",
"More polygons!",
"Never dig down!",
"Now with additional stuff!",
"Pixels!",
"Put that cookie down!",
"Rule #1: it's never my fault",
"Stop, hammertime!",
"Stop being reasonable, this is the Internet!",
"Stay home and play video games!",
"Thousands of colors! (Although it's only 16)",
"Vanilla!",
"What's up, Doc?",
"Whoa, dude!",
"1234567890 is the best password ever",
"Steeeeeeeeeeeeeeeeeeeeeve",
"v0.8 already... D:",
"Hi!",
"Add Self Promotion Text here"
]
tiles.setTilemap(tilemap`mcMap`)
game.showLongText("MINECRAFT ARCADE" + "                " + "                " + splashText[randint(0, 48)], DialogLayout.Center)
let a = true
spawnPlayerMap()
let mySprite6 = sprites.create(img`
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    `, SpriteKind.Player)
mySprite6.setPosition(50, 100)
mySprite6.setFlag(SpriteFlag.RelativeToCamera, true)
StatusbarExists = true
let statusbar = statusbars.create(40, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite6)
statusbar3 = statusbars.create(41, 4, StatusBarKind.Energy)
statusbar3.attachToSprite(statusbar, -4, 45)
multilights.addLightSource(mySprite, 25)
info.setScore(0)
chose_indext = 0
mySprite7 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.s)
mySprite8 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.s)
mySprite9 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.s)
mySprite10 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.s)
for (let 值 of sprites.allOfKind(SpriteKind.s)) {
    值.setFlag(SpriteFlag.RelativeToCamera, true)
    值.setFlag(SpriteFlag.Ghost, true)
}
mySprite7.setPosition(mySprite4.x, mySprite4.y)
mySprite8.setPosition(mySprite41.x, mySprite41.y)
mySprite9.setPosition(mysprite42.x, mysprite42.y)
mySprite10.setPosition(myspreat43.x, myspreat43.y)
item_list = ["exit"]
let textSprite3 = textsprite.create("0")
textSprite3.setPosition(35, 70)
textSprite3.setFlag(SpriteFlag.RelativeToCamera, true)
textSprite3.setIcon(img`
    . . . . . . . . . . . . d d d . 
    . . . . . . . . . . . d e e e d 
    . . . . . . . . . . d e e e d . 
    . . . . . . . . . d e e e d . . 
    . . . . . . . . d e e e d . . . 
    . . . . . . . d e e e d . . . . 
    . . . . . . d e e e d . . . . . 
    . . . . . d e e e d . . . . . . 
    . . . . d e e e d . . . . . . . 
    . . . d e e e d . . . . . . . . 
    . . d e e e d . . . . . . . . . 
    . d e e e d . . . . . . . . . . 
    d e e e d . . . . . . . . . . . 
    d e e d . . . . . . . . . . . . 
    d e d . . . . . . . . . . . . . 
    . d . . . . . . . . . . . . . . 
    `)
let textSprite4 = textsprite.create("0")
textSprite4.setPosition(60, 70)
textSprite4.setFlag(SpriteFlag.RelativeToCamera, true)
textSprite4.setIcon(img`
    ddddddddddddddddd
    deeeeeeeeeeeeeeed
    deebeeeeeeeeeeeed
    deeeeeeeeeeebeeed
    dbbbbbbbbbbbbbbbd
    deeeeeeeeeebeeeed
    debeeeeeeeeeeeeed
    deeeeeeeeebeeeeed
    dbbbbbbbbbbbbbbbd
    deeeebeeeeeeeeeed
    deeeeeeeeeebeeeed
    deeeeeeeeeeeeeeed
    dbbbbbbbbbbbbbbbd
    deeeeeeeeeeeebeed
    debeeeeeeeeeeeeed
    deeeeeeeeeeeeeeed
    dbbbbbbbbbbbcbbbd
    ddddddddddddddddd
    `)
let textSprite5 = textsprite.create("0")
textSprite5.setPosition(85, 70)
textSprite5.setFlag(SpriteFlag.RelativeToCamera, true)
textSprite5.setIcon(img`
    ..................
    ..................
    ...........dd.....
    ........dddccd....
    .....dddcccbbcd...
    ..dddcccbddddbcd..
    .dcccbddddddddbcd.
    dc1dddddddddd11dcd
    dcb1dddddd111dcbcd
    dcbb1dd111dbccbbcd
    dcbbb11dbccccbbbcd
    dcbbbdbccccbbbccd.
    .dcbbdbccbbcccdd..
    ..dcbbbccccddd....
    ...dccccddd.......
    ....dddd..........
    ..................
    ..................
    `)
dig_speed = 5
game.onUpdateInterval(2000, function () {
    tiles.destroySpritesOfKind(SpriteKind.lightsprite)
    tiles.createSpritesOnTiles(assets.tile`torchHalfBlock`, SpriteKind.lightsprite)
    for (let value of spriteutils.getSpritesWithin(SpriteKind.lightsprite, 64, mySprite)) {
        multilights.addLightSource(value, 10)
    }
})
forever(function () {
    scene.setBackgroundColor(9)
    multilights.toggleLighting(false)
    pause(50000)
    scene.setBackgroundColor(2)
    multilights.toggleLighting(true)
    pause(50000)
    scene.setBackgroundColor(8)
    pause(50000)
    scene.setBackgroundColor(6)
    multilights.toggleLighting(false)
    pause(50000)
})
forever(function () {
    if (info.score() == 4) {
        info.setScore(0)
    }
    block = info.score()
})
forever(function () {
    textSprite2.setText(convertToText(woodblock))
    textSprite1.setText(convertToText(apples))
    textSprite.setText(convertToText(dirt))
})
forever(function () {
    textSprite3.setText(convertToText(stick))
    textSprite4.setText(convertToText(wood_plank))
    textSprite5.setText(convertToText(iron))
})
forever(function () {
    if (chose_indext == 0) {
        mySprite4.setImage(img`
            55555555555555555555
            5cccccccccccccccccc5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5cccccccccccccccccc5
            55555555555555555555
            `)
        mySprite41.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mysprite42.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mySprite10.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
    }
    if (chose_indext == 1) {
        mySprite4.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mySprite41.setImage(img`
            55555555555555555555
            5cccccccccccccccccc5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5cccccccccccccccccc5
            55555555555555555555
            `)
        mysprite42.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mySprite10.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
    }
    if (chose_indext == 2) {
        mySprite4.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mySprite41.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mysprite42.setImage(img`
            55555555555555555555
            5cccccccccccccccccc5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5cccccccccccccccccc5
            55555555555555555555
            `)
        mySprite10.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
    }
    if (chose_indext == 3) {
        mySprite4.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mySprite41.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mysprite42.setImage(img`
            cccccccccccccccccc
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            c1111111111111111c
            cccccccccccccccccc
            `)
        mySprite10.setImage(img`
            55555555555555555555
            5cccccccccccccccccc5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5c1111111111111111c5
            5cccccccccccccccccc5
            55555555555555555555
            `)
    }
})
game.onUpdateInterval(100, function () {
    if (StatusbarExists) {
        if (statusbar3.value == 0) {
            statusbar.value += -0.1
        } else if (statusbar.value == 0) {
            mySprite.destroy(effects.ashes, 500)
            game.setDialogFrame(img`
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                `)
            game.setDialogCursor(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            game.setDialogTextColor(2)
            game.showLongText("You died :(               Player died of Hunger", DialogLayout.Center)
            game.reset()
        } else {
            statusbar3.value += -0.1
        }
    }
})
game.onUpdateInterval(200, function () {
    for (let value2 of tiles.getTilesByType(assets.tile`myTile6`)) {
        if (tiles.tileAtLocationEquals(tiles.locationInDirection(value2, CollisionDirection.Top), assets.tile`myTile4`)) {
            tiles.setTileAt(value2, assets.tile`myTile4`)
        }
    }
})
