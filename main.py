@namespace
class SpriteKind:
    Background = SpriteKind.create()
    EDIBLEfood = SpriteKind.create()
    Wood = SpriteKind.create()
    lightsprite = SpriteKind.create()
    s = SpriteKind.create()
    sword = SpriteKind.create()

def on_player2_button_down_pressed():
    global command, selected_item, item_level
    command = game.ask_for_string("", 24)
    if command == "diamondpickax":
        selected_item = "pick_ax"
        item_level = 3
        mySprite10.set_image(img("""
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
        """))
controller.player2.on_button_event(ControllerButton.DOWN,
    ControllerButtonEvent.PRESSED,
    on_player2_button_down_pressed)

def on_on_overlap(sprite, otherSprite):
    global woodblock
    music.pew_pew.play()
    otherSprite.destroy()
    mySprite9.set_image(img("""
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
    """))
    woodblock += 1
    textSprite2.set_text(convert_to_text(woodblock))
    otherSprite.set_flag(SpriteFlag.GHOST, True)
    otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.Wood, on_on_overlap)

def on_up_pressed():
    if StatusbarExists:
        if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
            mySprite.vy = -125
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap2(sprite, otherSprite):
    global apples
    music.pew_pew.play()
    otherSprite.destroy()
    mySprite8.set_image(img("""
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
    """))
    apples += 1
    textSprite1.set_text(convert_to_text(apples))
    otherSprite.set_flag(SpriteFlag.GHOST, True)
    otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.EDIBLEfood, on_on_overlap2)

def on_down_pressed():
    global mySprite2, location, mySprite3, mySprite5
    mySprite2 = sprites.create(img("""
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
        """),
        SpriteKind.player)
    for index in range(randint(3, 5)):
        if controller.left.is_pressed():
            location = tiles.location_in_direction(tiles.location_of_sprite(mySprite), CollisionDirection.LEFT)
        elif controller.right.is_pressed():
            location = tiles.location_in_direction(tiles.location_of_sprite(mySprite), CollisionDirection.RIGHT)
        elif controller.up.is_pressed():
            location = tiles.location_in_direction(tiles.location_of_sprite(mySprite), CollisionDirection.TOP)
        else:
            location = tiles.location_in_direction(tiles.location_of_sprite(mySprite),
                CollisionDirection.BOTTOM)
        if tiles.tile_at_location_equals(location, sprites.builtin.forest_tiles2):
            mySprite3 = sprites.create(gress_list._pick_random(), SpriteKind.projectile)
        else:
            mySprite3 = sprites.create(list2._pick_random(), SpriteKind.projectile)
        mySprite3.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
        mySprite3.vx = randint(-25, 25)
        mySprite3.ay = randint(300, 360)
        mySprite3.lifespan = randint(300, 360)
        tiles.place_on_tile(mySprite3, location)
    if Math.percent_chance(dig_speed):
        if not (tiles.tile_at_location_equals(location, assets.tile("""
            woodBlock
        """))):
            tiles.set_tile_at(location, assets.tile("""
                transparency16
            """))
            tiles.set_wall_at(location, False)
            mySprite5 = sprites.create(img("""
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
                """),
                SpriteKind.food)
            tiles.place_on_tile(mySprite5, location)
            mySprite5.ay = 400
        else:
            if not (tiles.tile_at_location_equals(location, assets.tile("""
                transparency16
            """))):
                tiles.set_tile_at(location, assets.tile("""
                    transparency16
                """))
                tiles.set_wall_at(location, False)
                mySprite5 = sprites.create(img("""
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
                    """),
                    SpriteKind.Wood)
                tiles.place_on_tile(mySprite5, location)
                mySprite5.ay = 400
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

"""

wood

stone

metel

diamond

"""

def on_a_pressed():
    global apples, dig_speed, mySprite11, damage
    if chose_indext == 1:
        if StatusbarExists:
            if apples != 0:
                statusbar3.value += 25
                apples += -1
                textSprite1.set_text(convert_to_text(apples))
    elif chose_indext == 3:
        if selected_item == "pick_ax":
            if item_level == 0:
                dig_speed = 25
            if item_level == 1:
                dig_speed = 35
            if item_level == 2:
                dig_speed = 55
            if item_level == 3:
                dig_speed = 95
        if selected_item == "sword":
            mySprite11 = sprites.create(img("""
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
                """),
                SpriteKind.sword)
            if item_level == 0:
                damage = 5
            if item_level == 1:
                damage = 6
                mySprite11.image.replace(14, 12)
            if item_level == 2:
                damage = 7
                mySprite11.image.replace(14, 13)
            if item_level == 3:
                damage = 8
                mySprite11.image.replace(14, 9)
            for index2 in range(361):
                transformSprites.rotate_sprite(mySprite11, index2)
                spriteutils.place_angle_from(mySprite11, index2 / 45, 8, mySprite)
    else:
        dig_speed = 15
        damage = 1
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_repeated():
    if tiles.tile_at_location_equals(tiles.location_of_sprite(mySprite),
        assets.tile("""
            myTile6
        """)):
        tiles.set_tile_at(tiles.location_of_sprite(mySprite),
            assets.tile("""
                transparency16
            """))
controller.B.on_event(ControllerButtonEvent.REPEATED, on_b_repeated)

def on_player2_button_b_pressed():
    blockMenu.show_menu(item_list, MenuStyle.GRID, MenuLocation.FULL_SCREEN)
controller.player2.on_button_event(ControllerButton.B,
    ControllerButtonEvent.PRESSED,
    on_player2_button_b_pressed)

def on_b_pressed():
    global location
    if controller.left.is_pressed():
        location = tiles.location_in_direction(tiles.location_of_sprite(mySprite), CollisionDirection.LEFT)
    elif controller.right.is_pressed():
        location = tiles.location_in_direction(tiles.location_of_sprite(mySprite), CollisionDirection.RIGHT)
    elif controller.up.is_pressed():
        location = tiles.location_in_direction(tiles.location_of_sprite(mySprite), CollisionDirection.TOP)
    else:
        location = tiles.location_in_direction(tiles.location_of_sprite(mySprite),
            CollisionDirection.BOTTOM)
    if not (tiles.tile_is_wall(location)):
        if block == 0:
            if Math.percent_chance(50):
                tiles.set_tile_at(location, assets.tile("""
                    myTile
                """))
                tiles.set_wall_at(location, True)
            else:
                tiles.set_tile_at(location, assets.tile("""
                    myTile1
                """))
                tiles.set_wall_at(location, True)
        if block == 1:
            tiles.set_tile_at(location, assets.tile("""
                woodBlock
            """))
            tiles.set_wall_at(location, True)
        if block == 2:
            tiles.set_tile_at(location, assets.tile("""
                torchHalfBlock
            """))
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def Startup():
    global backgroundStarter
    backgroundStarter = sprites.create(img("""
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
        """),
        SpriteKind.Background)
    animation.run_image_animation(backgroundStarter,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        200,
        False)
    tiles.set_tilemap(tilemap("""
        mcMap
    """))
    game.set_dialog_frame(img("""
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
    """))
    game.set_dialog_cursor(assets.image("""
        mcSplashCursor
    """))
    game.show_long_text("Credits to E-EnerG-Gamecentral, Kiwiphoenix364, and Eden264!",
        DialogLayout.FULL)
def spawnPlayerMap():
    global mySprite, mySprite4, textSprite, mySprite41, textSprite1, Apple, textSprite2, mysprite42, myspreat43, textSprite22
    mySprite = sprites.create(img("""
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
        """),
        SpriteKind.player)
    controller.move_sprite(mySprite, 100, 0)
    scene.camera_follow_sprite(mySprite)
    mySprite.ay = 360
    mySprite4 = sprites.create(img("""
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
        """),
        SpriteKind.projectile)
    mySprite4.set_flag(SpriteFlag.GHOST, True)
    mySprite4.set_position(37, 100)
    mySprite4.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    textSprite = textsprite.create("0", 1, 12)
    textSprite.set_position(33, 104)
    textSprite.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    mySprite41 = sprites.create(img("""
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
        """),
        SpriteKind.projectile)
    mySprite41.set_flag(SpriteFlag.GHOST, True)
    mySprite41.set_position(56, 100)
    mySprite41.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    textSprite1 = textsprite.create("0", 1, 12)
    textSprite1.set_position(52, 104)
    textSprite1.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    tiles.set_tilemap(tilemap("""
        mcMap
    """))
    color.start_fade(color.black, color.original_palette, 1000)
    for index3 in range(randint(10, 100)):
        Apple = sprites.create(img("""
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
            """),
            SpriteKind.EDIBLEfood)
        tiles.place_on_random_tile(Apple, assets.tile("""
            leafBlock
        """))
        Apple.ay = 400
    textSprite2 = textsprite.create("0", 1, 12)
    textSprite2.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    textSprite2.set_flag(SpriteFlag.GHOST, True)
    textSprite2.set_position(71, 104)
    mysprite42 = sprites.create(img("""
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
        """),
        SpriteKind.projectile)
    mysprite42.set_flag(SpriteFlag.GHOST, True)
    mysprite42.set_position(75, 100)
    mysprite42.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    textSprite.z = 500
    textSprite1.z = 500
    textSprite2.z = 500
    myspreat43 = sprites.create(img("""
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
        """),
        SpriteKind.projectile)
    myspreat43.set_flag(SpriteFlag.GHOST, True)
    myspreat43.set_position(94, 100)
    myspreat43.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    textSprite22 = textsprite.create("0", 1, 12)
    textSprite22.set_position(90, 104)
    textSprite22.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    textSprite22.z = 500

def on_player2_button_right_pressed():
    global chose_indext
    if chose_indext < 3:
        chose_indext += 1
controller.player2.on_button_event(ControllerButton.RIGHT,
    ControllerButtonEvent.PRESSED,
    on_player2_button_right_pressed)

def on_a_repeated():
    
    def on_throttle():
        info.change_score_by(1)
    timer.throttle("action", 500, on_throttle)
    
controller.A.on_event(ControllerButtonEvent.REPEATED, on_a_repeated)

def on_player2_button_left_pressed():
    global chose_indext
    if chose_indext > 0:
        chose_indext += -1
controller.player2.on_button_event(ControllerButton.LEFT,
    ControllerButtonEvent.PRESSED,
    on_player2_button_left_pressed)

def on_on_overlap3(sprite, otherSprite):
    global dirt
    music.pew_pew.play()
    otherSprite.destroy()
    mySprite7.set_image(img("""
        cccccccccccccccccc
                c1111111111111111c
                c1111111111eef111c
                c11111111eeeefff1c
                c1111eeeeceeefff1c
                c11eeeeeeeeeefff1c
                c11eeeeeeeecefff1c
                c11eceeeeeeeefff1c
                c11eeeeeeeeeefff1c
                c11eeeeceeeeefff1c
                c11ceeeeeeceefff1c
                c11eeeeeeeeeefff1c
                c111eeeceeeeefff1c
                c1111111eeeeefff1c
                c1111111111eef111c
                c1111111111111111c
                c1111111111111111c
                cccccccccccccccccc
    """))
    dirt += 1
    textSprite.set_text(convert_to_text(dirt))
    otherSprite.set_flag(SpriteFlag.GHOST, True)
    otherSprite.destroy()
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap3)

def on_menu_option_selected(option, index):
    blockMenu.close_menu()
    if option == "exit":
        blockMenu.close_menu()
    elif option == "stick":
        if True:
            pass
    else:
        pass
blockMenu.on_menu_option_selected(on_menu_option_selected)

def on_menu_pressed():
    blockMenu.show_menu(["stick",
            "wood plank",
            "iron ingot",
            "wooden sword",
            "stone sword",
            "iron sword",
            "diamond sword",
            "wooden pick-ax",
            "stone pick-ax",
            "iron pick-ax",
            "diamond pick-ax"],
        MenuStyle.GRID,
        MenuLocation.FULL_SCREEN)
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

dirt = 0
textSprite22: TextSprite = None
Apple: Sprite = None
textSprite: TextSprite = None
backgroundStarter: Sprite = None
block = 0
damage = 0
mySprite11: Sprite = None
mySprite5: Sprite = None
dig_speed = 0
mySprite3: Sprite = None
location: tiles.Location = None
mySprite2: Sprite = None
textSprite1: TextSprite = None
apples = 0
textSprite2: TextSprite = None
woodblock = 0
item_level = 0
selected_item = ""
command = ""
item_list: List[str] = []
myspreat43: Sprite = None
mysprite42: Sprite = None
mySprite41: Sprite = None
mySprite4: Sprite = None
mySprite10: Sprite = None
mySprite9: Sprite = None
mySprite8: Sprite = None
mySprite7: Sprite = None
chose_indext = 0
mySprite: Sprite = None
statusbar3: StatusBarSprite = None
StatusbarExists = False
list2: List[Image] = []
gress_list: List[Image] = []
gress_list = [img("""
        7 
            6
    """),
    img("""
        7 
            5
    """),
    img("""
        7 
            e
    """),
    img("""
        f 
            6
    """),
    img("""
        f
    """),
    img("""
        e
    """),
    img("""
        7
    """),
    img("""
        5
    """),
    img("""
        6
    """)]
list2 = [img("""
        e
    """),
    img("""
        c
    """),
    img("""
        f
    """),
    img("""
        b
    """)]
tiles.set_tilemap(tilemap("""
    level2
"""))
l = True
Startup()
for value in tiles.get_tiles_by_type(assets.tile("""
    myTile2
""")):
    tiles.set_wall_at(value, True)
    if Math.percent_chance(50):
        tiles.set_tile_at(value, assets.tile("""
            myTile1
        """))
    else:
        tiles.set_tile_at(value, assets.tile("""
            myTile
        """))
    pause(1)
color.start_fade(color.original_palette, color.black, 1000)
scene.set_background_color(9)
tiles.center_camera_on_tile(tiles.get_tile_location(randint(0, 199), randint(0, 99)))
pause(100)
splashText = ["85121215?? [static] 920 [static] 1315 [static] 145242119 [static] 1618913112 [static] 185161518209147 [static] 8524 [line cuts]",
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
    "Add Self Promotion Text here"]
tiles.set_tilemap(tilemap("""
    mcMap
"""))
game.show_long_text("MINECRAFT ARCADE" + "                " + "                " + splashText[randint(0, 48)],
    DialogLayout.CENTER)
a = True
spawnPlayerMap()
mySprite6 = sprites.create(img("""
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
    """),
    SpriteKind.player)
mySprite6.set_position(50, 100)
mySprite6.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
StatusbarExists = True
statusbar = statusbars.create(40, 4, StatusBarKind.health)
statusbar.attach_to_sprite(mySprite6)
statusbar3 = statusbars.create(41, 4, StatusBarKind.energy)
statusbar3.attach_to_sprite(statusbar, -4, 45)
multilights.add_light_source(mySprite, 25)
info.set_score(0)
chose_indext = 0
mySprite7 = sprites.create(img("""
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
    """),
    SpriteKind.s)
mySprite8 = sprites.create(img("""
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
    """),
    SpriteKind.s)
mySprite9 = sprites.create(img("""
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
    """),
    SpriteKind.s)
mySprite10 = sprites.create(img("""
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
    """),
    SpriteKind.s)
for 值 in sprites.all_of_kind(SpriteKind.s):
    值.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
    值.set_flag(SpriteFlag.GHOST, True)
mySprite7.set_position(mySprite4.x, mySprite4.y)
mySprite8.set_position(mySprite41.x, mySprite41.y)
mySprite9.set_position(mysprite42.x, mysprite42.y)
mySprite10.set_position(myspreat43.x, myspreat43.y)
item_list = ["exit"]

def on_update_interval():
    tiles.destroy_sprites_of_kind(SpriteKind.lightsprite)
    tiles.create_sprites_on_tiles(assets.tile("""
            torchHalfBlock
        """),
        SpriteKind.lightsprite)
    for value2 in spriteutils.get_sprites_within(SpriteKind.lightsprite, 64, mySprite):
        multilights.add_light_source(value2, 10)
game.on_update_interval(2000, on_update_interval)

def on_forever():
    scene.set_background_color(9)
    multilights.toggle_lighting(False)
    pause(50000)
    scene.set_background_color(2)
    multilights.toggle_lighting(True)
    pause(50000)
    scene.set_background_color(8)
    pause(50000)
    scene.set_background_color(6)
    multilights.toggle_lighting(False)
    pause(50000)
forever(on_forever)

def on_forever2():
    global block
    if info.score() == 3:
        info.set_score(0)
    block = info.score()
forever(on_forever2)

def on_forever3():
    if chose_indext == 0:
        mySprite4.set_image(img("""
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
        """))
        mySprite41.set_image(img("""
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
        """))
        mysprite42.set_image(img("""
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
        """))
        mySprite10.set_image(img("""
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
        """))
    if chose_indext == 1:
        mySprite4.set_image(img("""
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
        """))
        mySprite41.set_image(img("""
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
        """))
        mysprite42.set_image(img("""
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
        """))
        mySprite10.set_image(img("""
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
        """))
    if chose_indext == 2:
        mySprite4.set_image(img("""
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
        """))
        mySprite41.set_image(img("""
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
        """))
        mysprite42.set_image(img("""
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
        """))
        mySprite10.set_image(img("""
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
        """))
    if chose_indext == 3:
        mySprite4.set_image(img("""
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
        """))
        mySprite41.set_image(img("""
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
        """))
        mysprite42.set_image(img("""
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
        """))
        mySprite10.set_image(img("""
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
        """))
forever(on_forever3)

def on_update_interval2():
    if StatusbarExists:
        if statusbar3.value == 0:
            statusbar.value += -0.1
        elif statusbar.value == 0:
            mySprite.destroy(effects.ashes, 500)
            game.set_dialog_frame(img("""
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
            """))
            game.set_dialog_cursor(img("""
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
            """))
            game.set_dialog_text_color(2)
            game.show_long_text("You died :(               Player died of Hunger",
                DialogLayout.CENTER)
            game.reset()
        else:
            statusbar3.value += -0.1
game.on_update_interval(100, on_update_interval2)

def on_update_interval3():
    for value22 in tiles.get_tiles_by_type(assets.tile("""
        myTile6
    """)):
        if tiles.tile_at_location_equals(tiles.location_in_direction(value22, CollisionDirection.TOP),
            assets.tile("""
                myTile4
            """)):
            tiles.set_tile_at(value22, assets.tile("""
                myTile4
            """))
game.on_update_interval(200, on_update_interval3)
