namespace SpriteKind {
    export const stats = SpriteKind.create()
    export const shootenemy = SpriteKind.create()
    export const flyer = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const animater = SpriteKind.create()
    export const nerd = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y && sprite.vy > 0) {
        mySprite.vy = -80
        i.value += -10
        extraEffects.createSpreadEffectOnAnchor(otherSprite, extraEffects.createSingleColorSpreadEffectData(1, ExtraEffectPresetShape.Spark), 100)
        music.play(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    } else {
        beDamaged(true)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    JumpAction()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    JumpAction()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    beDamaged(false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    face = 0
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . 2 2 2 . 
        . . b b b b 2 . 
        . . b b b b 2 . 
        . . f f f b 2 2 
        . . b f b b . . 
        . . 2 2 2 2 . . 
        . . 2 c c c . . 
        . . c . . c . . 
        `,img`
        . . . . 2 2 2 . 
        . . b b b b 2 . 
        . . b b b b 2 . 
        . . f f f b 2 2 
        . . b f b b . . 
        . . 2 2 2 2 . . 
        . . 2 c c c . . 
        . . c . c . . . 
        `,img`
        . . . . . . . . 
        . . . . 2 2 2 . 
        . . b b b b 2 . 
        . . b b b b 2 . 
        . . f f f b 2 2 
        . . b f b b . . 
        . . 2 2 2 2 . . 
        . . . c c . . . 
        `],
    100,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.setImage(img`
        . 2 2 2 . . . . 
        . 2 b b b b . . 
        . 2 b b b b . . 
        2 2 b f f f . . 
        . . b b f b . . 
        . . 2 2 2 2 . . 
        . . c c c 2 . . 
        . . c . . c . . 
        `)
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.setImage(img`
        . . . . 2 2 2 . 
        . . b b b b 2 . 
        . . b b b b 2 . 
        . . f f f b 2 2 
        . . b f b b . . 
        . . 2 2 2 2 . . 
        . . 2 c c c . . 
        . . c . . c . . 
        `)
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
})
function beDamaged (bool: boolean) {
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    mySprite.startEffect(effects.ashes, 1000)
    music.play(music.createSoundEffect(WaveShape.Noise, 914, 914, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    if (info.life() < 4) {
        color.startFadeFromCurrent(color.GrayScale, 500)
    }
    if (bool) {
        pause(1000)
    } else {
        mySprite.vy = -210
    }
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    boss_fight_start = 0
    sprites.destroy(status)
    boss1.setImage(img`
        . . . . 2 2 f 2 2 f . . . . . . 
        . . . . f f 2 2 2 2 f f . . . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . . f 1 1 1 1 1 1 1 d f . . . 
        . . f d 1 1 1 1 1 1 1 d d f . . 
        . . f d 1 1 1 1 1 1 d d d f . . 
        . . f d 1 1 1 d d d d d d f . . 
        . . f d 1 d f b d d d d b f . . 
        . . f b d d f c d b b b c f . . 
        . . . f 1 1 1 1 1 b b c f . . . 
        . . . f 1 b 1 f f f f f . . . . 
        . . . f b f c 1 1 1 b f . . . . 
        . . . . f f 1 b 1 b f f . . . . 
        . . . . . f b f b f f f . f . . 
        . . . . . . f f f f f f f f . . 
        . . . . . . . . f f f f f . . . 
        `)
    boss1.vx = 0
    boss1.setFlag(SpriteFlag.GhostThroughSprites, true)
    animation.stopAnimation(animation.AnimationTypes.All, boss1)
    animation.runImageAnimation(
    boss1,
    [img`
        . 2 . . f 2 f f . . . . . . . . 
        . . 2 f 2 f 2 2 f f . . . . . . 
        . f b 2 2 2 f 2 2 b f . . . . . 
        . f 1 1 1 1 1 1 1 d f . . . . . 
        f d 1 1 1 1 1 1 1 d d f . . . . 
        f d 1 1 1 1 1 1 d d d f . . . . 
        f d 1 1 1 d d d d d d f . . . . 
        f d 1 d f b d d d d b f . . . . 
        f b d d f c d b b b c f . . . . 
        . f 1 1 1 1 1 b b c f . . . . . 
        . f 1 b 1 f f f f f . . . . . . 
        . f b f c 1 1 1 b f . . . . . . 
        . . f f 1 b 1 b f f . . . . . . 
        . . . f b f b f f f . f . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . f f f f f . . . . . 
        `,img`
        . 2 . . f 2 f f . . . . . . . . 
        . . 2 f 2 f 2 2 f f . . . . . . 
        . f b 2 2 2 f 2 2 b f . . . . . 
        . f 1 1 1 1 1 f 1 d f . . . . . 
        f d 1 1 1 1 1 1 1 d d f . . . . 
        f d 1 1 1 1 1 1 d d d f . . . . 
        f d 1 1 1 d d d d d d f . . . . 
        f d 1 d f b d d d d b f . . . . 
        f b d d f c d b b b c f . . . . 
        . f 1 1 1 1 1 b b c f . . . . . 
        . f 1 b 1 f f f f f . . . . . . 
        . f b f c 1 1 1 b f . . . . . . 
        . . f f 1 b 1 b f f . . . . . . 
        . . . f b f b f f f . f . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . f f f f f . . . . . 
        `,img`
        . 2 . . f 2 f f . . . . . . . . 
        . . 2 f 2 f 2 2 f f . . . . . . 
        . f b 2 2 2 f 2 2 b f . . . . . 
        . f 1 1 1 1 1 f 1 d f . . . . . 
        f d 1 1 1 1 f 1 1 d d f . . . . 
        f d 1 1 1 f 1 1 d d d f . . . . 
        f d 1 1 1 d d d d d d f . . . . 
        f d 1 d f b d d d d b f . . . . 
        f b d d f c d b b b c f . . . . 
        . f 1 1 1 1 1 b b c f . . . . . 
        . f 1 b 1 f f f f f . . . . . . 
        . f b f c 1 1 1 b f . . . . . . 
        . . f f 1 b 1 b f f . . . . . . 
        . . . f b f b f f f . f . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . f f f f f . . . . . 
        `,img`
        . 2 . . f 2 f f . . . . . . . . 
        . . 2 f 2 f 2 2 f f . . . . . . 
        . f b 2 2 2 f 2 2 b f . . . . . 
        . f 1 1 1 1 1 f 1 d f . . . . . 
        f d 1 1 1 1 f 1 1 d d f . . . . 
        f d 1 1 1 f 1 1 d d d f . . . . 
        f d 1 1 f d d d d d d f . . . . 
        f d 1 d f f d d d d b f . . . . 
        f b d d f c f b b b c f . . . . 
        . f 1 1 1 1 1 b b c f . . . . . 
        . f 1 b 1 f f f f f . . . . . . 
        . f b f c 1 1 1 b f . . . . . . 
        . . f f 1 b 1 b f f . . . . . . 
        . . . f b f b f f f . f . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . f f f f f . . . . . 
        `,img`
        . 2 . . f 2 f f . . . . . . . . 
        . . 2 f 2 f 2 2 f f . . . . . . 
        . f b 2 2 2 f 2 2 b f . . . . . 
        . f 1 1 1 1 1 f 1 d f . . . . . 
        f d 1 1 1 1 f 1 1 d d f . . . . 
        f d 1 1 1 f 1 1 d d d f . . . . 
        f d 1 1 f d d d d d d f . . . . 
        f d 1 d f f d d d d b f . . . . 
        f b d d f c f b b b c f . . . . 
        . f 1 1 1 1 1 f b c f . . . . . 
        . f 1 b 1 f f f f f . . . . . . 
        . f b f c 1 1 1 f f . . . . . . 
        . . f f 1 b 1 b f f . . . . . . 
        . . . f b f b f f f . f . . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . f f f f f . . . . . 
        `],
    1000,
    false
    )
    timer.after(5000, function () {
        extraEffects.createSpreadEffectOnAnchor(boss1, extraEffects.createSingleColorSpreadEffectData(10, ExtraEffectPresetShape.Explosion), 5000, 60)
        extraEffects.createSpreadEffectOnAnchor(boss1, extraEffects.createSingleColorSpreadEffectData(8, ExtraEffectPresetShape.Explosion), 5000, 60)
        extraEffects.createSpreadEffectOnAnchor(boss1, extraEffects.createSingleColorSpreadEffectData(9, ExtraEffectPresetShape.Explosion), 5000, 60)
        scene.cameraShake(4, 5500)
        boss1.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . b d b c . . . . . 
            . . . . b b c 5 5 5 c b b . . . 
            . . . . b 5 5 5 1 5 5 5 b . . . 
            . . . c c 5 5 5 1 5 5 5 c c . . 
            . . b b 5 5 5 1 1 1 5 5 5 b b . 
            . . d d 5 1 1 1 1 1 1 1 5 d d . 
            . . b b 5 5 5 1 1 1 5 5 5 b b . 
            . . . c c 5 5 5 1 5 5 5 c c . . 
            . . . . b 5 5 5 1 5 5 5 b . . . 
            . . . . b b c 5 5 5 c b b . . . 
            . . . . . . c b d b c . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        boss1.ay = 0
        animation.runImageAnimation(
        boss1,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . c c c d c c c . . . . 
            . . . . c d d c 5 c d d c . . . 
            . . . . c d c d 5 d c d c . . . 
            . . . b c c d 5 5 5 d c c b . . 
            . . b d d 5 5 5 5 5 5 5 d d b . 
            . . . b c c d 5 5 5 d c c b . . 
            . . . . c d c d 5 d c d c . . . 
            . . . . c d d c 5 c d d c . . . 
            . . . . . c c c d c c c . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . . b . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . b d b c . . . . . 
            . . . . b b c 5 5 5 c b b . . . 
            . . . . b 5 5 5 1 5 5 5 b . . . 
            . . . c c 5 5 5 1 5 5 5 c c . . 
            . . b b 5 5 5 1 1 1 5 5 5 b b . 
            . . d d 5 1 1 1 1 1 1 1 5 d d . 
            . . b b 5 5 5 1 1 1 5 5 5 b b . 
            . . . c c 5 5 5 1 5 5 5 c c . . 
            . . . . b 5 5 5 1 5 5 5 b . . . 
            . . . . b b c 5 5 5 c b b . . . 
            . . . . . . c b d b c . . . . . 
            . . . . . . . b d b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        timer.after(6000, function () {
            animation.runMovementAnimation(
            boss1,
            animation.animationPresets(animation.flyToCenter),
            3000,
            false
            )
            timer.after(2000, function () {
                color.startFade(color.originalPalette, color.White, 5000)
                controller.moveSprite(mySprite, 0, 0)
                timer.after(7000, function () {
                    scene.setBackgroundImage(img`
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666661ddd6666666666666666666666666666666666666666666
                        666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666d111111111116666666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666611111111111111166666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666dd1111111111111111111666666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666d11111111111111111111111111666666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666d11111111111111111111111111111116666666666666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666d111111111111111111111111111111111111111111d6666666666666666666666
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666111111111111111111111111111111111111111111111111111ddd666666666666666
                        66666666666666666666666666666666666666666666666666666666666666666666666666666666666666611111111111111111111111111111111111111111d1111111111111111dddddd66666dddd
                        66666666666666666666666666666666666666666666666666666666666666666666666666666666666111111dddd11111111111111111111111111111111111111111111dd1111111ddddddddddddd1
                        6666666666666666666666666666666666666666666666666666666666666666666666666666666dd111111ddd111111111111111111111111111d11111111dd111dd11111111111111111111dddd111
                        666666666666666666666666666666666666666666666666666666666666666666666666111111111111111111111111111111111111111d111d1111ddddddddd111111111ddddd111ddddddddd11111
                        66666666666666666666666666666666666666666666666666666666666666666666911111111111111d1111111111dddddd11111dddd1ddddddddddddddddddddd1111dd111111111ddddddd1111111
                        666666611111d66666666666666666666666666666666666666666666d1111111111d111d11111111111111111111111dddd1111dddddddddddddddddddddddddd111111111111dddddddddd11111111
                        66666111111111166666666666666666666666666666666dd1111dddd11111111111ddddd11111111111111111111111111111ddddddddddddddddddddddddddd111111dddddddddddddddd11111111b
                        666111111111111111666666666666666666666dd111111d11111ddddddddddddddddddddddddddddddddddddd11111111111ddddddddddddddddddddddddddddd11ddddddddddddddddd11111bbbbbb
                        1ddd1dd11111ddd1111111666666666dd11111111111111dddddddddddd11111111ddddddddddddddddddddddddddd1111111dddddddddddddddddddddddddddddddddddddddddddddd11111bbbbbbbb
                        ddddddddd11dddddd11111111111dd1111111111dddddddddddddd1111111111111111ddddddddddddddddddddddddddd111111ddddddddddddddddddddddddddddddddddddddddddbbb1bbbbbbbbbbb
                        dddddddddddddddddddddd1111111d1dddddddddddddddddd1111111111111111111111111dddddddddddddddddddddddddd11111111ddddddddddddddddddddddddddddddddddbbbbbbbbbbbbbbbbbb
                        111111ddddddddddddddddddddddddddddddddddddddb111111111111111111111111111111111dddddddddddddddddddddddddd111111dddddddddddddddddddddddddddddbbbbbbbbbbbbbbbbbbbbb
                        1111111111dddddddddddddddddddddddddddddddb111111111111111111111111111111111b1111ddddddddddddddddddddddddddddd1ddddddddddddddddddddddddddbbbbbbbbbbbbbbbbbbbbb11b
                        1111111111111dddddddddddddddddddddddddb1111111111111111111111bbb11111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddbbbbbbbbbbbbbbbbbbbbb1111111
                        1111111bbb111111ddddddddddddddddddddbb1111111111111111bbbbbb111bb111111111111111111111bbbddddddddddddddddddddddddddddddddddddddddbbbbbbbbbbbbbbbbbb1111111111111
                        bbbb111bbbbbb11111ddddddddddddddbbb11111111b111bbb11bbbbbbbbb1bbbbbbbbb1111bb1111b111111111bbddddddddddddddddddddddddddddddddbbbbbbbbbbbbbbbbbbbb111111111111111
                        bbbbbbbbbbbbbbbb1111bddddddbbbbbbbb1111bbb111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb1111b1111111bbbbbbbbdddddddddddddddddddddddbbbbbbbbbbbbbbbbbbbbb11111111111111111
                        bbbbbbbbbbbbbbbbbb1bbbbbbbbbbbbbbbbbbbbbbb11bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb11bbbbbbbbbbbbbbbbbbbbbbdddddddbbbbbbbbbbbbbbbbbbbbbbbbbbbbc1111111111111111111
                        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcc1111111111111111111c11
                        bbbbbbbb1b11bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccc11111111111111111111111111
                        bbbbb11111111111b11bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccc11111111111c11111111111111111111
                        bbb11111111111111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb11111111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccc11111111111c11111c111111cc11c11111c
                        bb1111111111111111111111bbbbbbbbbbbbbbbbbbbbbbbbbb111111111111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb111111ccccccccccc1111c111c11111111c1111cccc11cc11111c
                        bb11111111111111111111111111bb1bbbbbbbbbbbbbbbcc1111111111111111111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb111111111111ccccccccccccc11111111c111c1111cccc11cc111111c
                        b11111c1111111111111111111111c1111111bbbc111111111111111111111cc111111cbbbbbbbbbbbbbbbbbbbbbbbbb111111111111111111cc1ccccccccc11111cccccc111111ccccc11ccc11111cc
                        b1111ccc1111111111111111111111cc111111ccccccccc111111111111111ccccccc11111cbbbbbbbbbbbbbbbbbbbbc111111cc11111111ccccccccccccccc1cccccccc11c111ccccc111cc11111ccc
                        1111dccc111111111111111111111111cccc11cccccccccc11111cccccccccccccccccc111111cccccbbbbbbcccccccccccccc111111ccccccccccccccccccccccccccc111111ccccccc1ccc11111ccc
                        1cccc1111111111111111111c111111111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111cccccccccccccccccccc
                        cccc11111111111111111111111111111111ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1cccccccccccccccccccccc
                        ccc111111111111111111111111111111c111ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        11c11111c11111c1c1111cc1111111c111c11111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        1111111ccc111cc1cc111cc111111111111cc111111ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        111c11ccc1111cc1cc11ccccc111ccc11111cccc1111cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        11cccccccc11cc11cc11cccccc111ccccc11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        ccccccccccccccc1ccc11ccccccc11cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        ccccccccccccccc1cccc1cccccccc11ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
                        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6cccccccccccccccccccc
                        cccccccccccccccccccccccccc66cccccccccccccccc6ccccccccccccccccccccccccccccccccccccccccccc666c6cccccccccccc66666ccccccccccccccccc6ccccccc6ccc66ccccc6ccccccccccccc
                        `)
                    sprites.destroy(boss1)
                    weirdo = sprites.create(img`
                        ........................
                        ........................
                        ........................
                        ........................
                        ..........f22f..........
                        ........ff2222ff........
                        .......fb111111bf.......
                        .......f11111111f.......
                        ......fd11111111df......
                        ......fd11111111df......
                        ......fddd1111dddf......
                        ......fbdbfddfbdbf......
                        ......fcdcf11fcdcf......
                        .......fb111111bf.......
                        ......fffcdb1bdffff.....
                        ....fc111cbfbfc111cf....
                        ....f1b1b1ffff1b1b1f....
                        ....fbfbffffffbfbfbf....
                        .........ffffff.........
                        ...........fff..........
                        ........................
                        ........................
                        ........................
                        ........................
                        `, SpriteKind.nerd)
                    weirdo.setPosition(80, 100)
                    tiles.loadMap(tiles.createSmallMap(tilemap`level8`))
                    color.startFade(color.White, color.originalPalette, 5000)
                    controller.moveSprite(mySprite, 100, 0)
                })
            })
        })
    })
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    face = 1
    animation.runImageAnimation(
    mySprite,
    [img`
        . 2 2 2 . . . . 
        . 2 b b b b . . 
        . 2 b b b b . . 
        2 2 b f f f . . 
        . . b b f b . . 
        . . 2 2 2 2 . . 
        . . c c c 2 . . 
        . . c . . c . . 
        `,img`
        . 2 2 2 . . . . 
        . 2 b b b b . . 
        . 2 b b b b . . 
        2 2 b f f f . . 
        . . b b f b . . 
        . . 2 2 2 2 . . 
        . . c c c 2 . . 
        . . . c . c . . 
        `,img`
        . . . . . . . . 
        . 2 2 2 . . . . 
        . 2 b b b b . . 
        . 2 b b b b . . 
        2 2 b f f f . . 
        . . b b f b . . 
        . . 2 2 2 2 . . 
        . . . c c . . . 
        `],
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y && sprite.vy > 0) {
        death_animater = sprites.create(img`
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
            `, SpriteKind.animater)
        death_animater.setPosition(otherSprite.x, otherSprite.y)
        animation.runImageAnimation(
        death_animater,
        [img`
            . . . . . . . . 
            . . . 2 2 . . . 
            . . 3 1 1 3 . . 
            . 2 1 1 1 1 2 . 
            . 2 1 1 1 1 2 . 
            . . 3 1 1 3 . . 
            . . . 2 2 . . . 
            . . . . . . . . 
            `,img`
            . . . 3 3 . . . 
            . 1 3 3 3 2 1 3 
            . 3 1 3 3 2 3 . 
            1 1 1 1 1 2 3 3 
            . . . 1 1 3 2 3 
            . . 3 3 3 1 . . 
            . 1 3 2 3 . 1 3 
            . 3 . 3 3 . 3 3 
            `,img`
            3 1 2 . 1 3 . 3 
            . 2 2 . 1 2 2 1 
            1 2 2 . . . . 3 
            1 2 . . . . 1 1 
            3 2 . . . . 2 1 
            . 2 2 2 2 . 2 2 
            1 1 2 1 1 2 2 1 
            3 . . . 3 . . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . 3 
            3 . . . . . . 3 
            . . . 3 . . . . 
            3 . . . . . . 3 
            . . . . . . . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `],
        100,
        false
        )
        otherSprite.destroy()
        mySprite.vy = -80
    } else {
        beDamaged(true)
        otherSprite.destroy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.shootenemy, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y && sprite.vy > 0) {
        if (Math.percentChance(50)) {
            heart = sprites.create(img`
                . 2 . 2 . 
                2 2 2 2 2 
                2 2 2 2 2 
                . 2 2 2 . 
                . . 2 . . 
                `, SpriteKind.Food)
            heart.setPosition(otherSprite.x, otherSprite.y)
        }
        death_animater = sprites.create(img`
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
            `, SpriteKind.animater)
        death_animater.ay = 500
        death_animater.setPosition(otherSprite.x, otherSprite.y)
        animation.runImageAnimation(
        death_animater,
        [img`
            . . 2 2 2 2 2 . 
            . 2 2 2 f f f 2 
            . 2 2 f 9 f 9 2 
            . 2 2 f 9 f 9 2 
            . 2 2 f f f f . 
            . . 2 2 2 f 2 . 
            . . 2 2 f f 2 . 
            . 2 2 2 f f 2 . 
            `,img`
            . . . . . . . . 
            . . 2 2 2 2 . . 
            . 2 2 f f f . . 
            . 2 2 9 f 9 . . 
            . 2 2 f f f . . 
            . . 2 2 f 2 . . 
            . . 2 f f 2 . . 
            . . . . . . . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . 2 2 . . . 
            . . 2 f f . . . 
            . . 2 f f . . . 
            . . . 2 f . . . 
            . . . . . . . . 
            . . . . . . . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . 2 2 . . . 
            . . . 2 2 . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `,img`
            . . . . . . . . 
            . . . d b . . . 
            . . . 5 c . . . 
            b c d 5 5 c c . 
            d d 5 5 5 5 d b 
            . . c 5 d . . . 
            . . . d c . . . 
            . . . b . . . . 
            `,img`
            . . . b b . . . 
            . b b 5 c b b . 
            . b 5 5 5 5 b . 
            c c 5 5 5 5 c c 
            c c 5 5 5 5 c c 
            . b 5 5 5 5 b . 
            . b b 5 c b b . 
            . . . b b . . . 
            `,img`
            . . . 1 . . . . 
            1 1 . . . . . . 
            1 1 . 1 1 . . . 
            . . 1 1 1 1 . . 
            . 1 1 1 1 1 1 . 
            . 1 1 1 1 1 1 . 
            . . 1 1 1 1 . . 
            . . . 1 1 . 1 . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `],
        100,
        false
        )
        otherSprite.destroy()
        mySprite.vy = -80
    } else {
        beDamaged(true)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile49`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.animater)
    sprites.destroyAllSpritesOfKind(SpriteKind.shootenemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.flyer)
    mySprite.setFlag(SpriteFlag.GhostThroughTiles, true)
    color.startFadeFromCurrent(color.Black, 1000)
    timer.after(1000, function () {
        color.startFadeFromCurrent(color.originalPalette, 1000)
    })
    timer.after(1100, function () {
        mySprite.setFlag(SpriteFlag.GhostThroughTiles, false)
        scene.setBackgroundImage(img`
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8886688888888868888888888888888888888888888668888888886888888888888888888888888888866888888888688888888888888888888888888886688888888868888888888888888888888888
            8666888888888668888888888888888888888868866688888888866888888888888888888888886886668888888886688888888888888888888888688666888888888668888888888888888888888868
            8868866888668866888866888888888888888866886886688866886688886688888888888888886688688668886688668888668888888888888888668868866888668866888866888888888888888866
            6666668868866866886866888888888888886676666666886886686688686688888888888888667666666688688668668868668888888888888866766666668868866866886866888888888888886676
            6666688866866666866668888888888888666677666668886686666686666888888888888866667766666888668666668666688888888888886666776666688866866666866668888888888888666677
            6666686666666676666688868888886668886667666668666666667666668886888888666888666766666866666666766666888688888866688866676666686666666676666688868888886668886667
            6666666666666776677666668866688866888666666666666666677667766666886668886688866666666666666667766776666688666888668886666666666666666776677666668866688866888666
            6666666666666766667766688677668866666666666666666666676666776668867766886666666666666666666667666677666886776688666666666666666666666766667766688677668866666666
            66c666666666666666666668667776686666666666c666666666666666666668667776686666666666c666666666666666666668667776686666666666c6666666666666666666686677766866666666
            66c6666666666666666666666c6776666666666666c6666666666666666666666c6776666666666666c6666666666666666666666c6776666666666666c6666666666666666666666c67766666666666
            66c6666666666666666666666cc676666666666666c6666666666666666666666cc676666666666666c6666666666666666666666cc676666666666666c6666666666666666666666cc6766666666666
            66c6666666fcc66666666ff66ccc66666666666666c6666666fcc66666666ff66ccc66666666666666c6666666fcc66666666ff66ccc66666666666666c6666666fcc66666666ff66ccc666666666666
            66c666666ffdcc666666bbf666cc66666666666666c666666fffcc666666fff666cc66666666666666c666666fffcc666666fff666cc66666666666666c666666fffcc666666fff666cc666666666666
            6cc666966ff66ccc6f666bff66cc6666666666666cc666966ff66ccc6f666bff66cc6666666666666cc666966ff66ccc6f666bff66cc6666666666666cc666966ff66ccc6f666bff66cc666666666666
            6cc666bf66f6dfcccff66bff66ccc666666666666cc666bf66f6dfcccff66bff66ccc666666666666cc666bf66f6bfcccff66bff66ccc666666666666cc666bf66f6dfcccff66bff66ccc66666666666
            6cc66bbffffbff6ccffbbbf6666cc666666666666cc66bbffffbff6ccffbbbf6666cc666666666666cc66bbffffbff6ccffbbbf6666cc666666666666cc66bbffffbff6ccffbbbf6666cc66666666666
            ccc666bffffbff6ccffbbff66fdccc66f6666666ccc666bffffbff6ccffbbff66fdccc66f6666666ccc666bffffbff6ccffbbff66fdccc66f6666666ccc666bffffbff6ccffbbff66fdccc66f6666666
            cccbb6bffffbfffcccfbbfffff6ccc66fff66666cccbb6bffffbfffcccfbbfffff6ccc66fff66666cccbb6bffffbfffcccfbbfffff6ccc66fff66666cccbb6bffffbfffcccfbbfffff6ccc66fff66666
            ccc6bbbffffbffffccfbbffffb6cccf6ff666666ccc6bbbffffbffffccfbbffffb6cccf6ff666666ccc6bbbffffbffffccfbbffffb6cccf6ff666666ccc6bbbffffbffffccfbbffffb6cccf6ff666666
            ccc6bbbfffbfffffcccbbffffbfcccffff66ff66ccc6bbbfffbfffffcccbbffffbfcccffff66ff66ccc6bbbfffbfffffcccbbffffbfcccffff66ff66ccc6bbbfffbfffffcccbbffffbfcccffff66ff66
            cccbbbbfffbffffffccbbffffbfccccffffbfff6cccbbbbfffbffffffccbbffffbfccccffffbfff6cccbbbbfffbffffffccbbffffbfccccffffbfff6cccbbbbfffbffffffccbbffffbfccccffffbfff6
            ccfbbbbffbbfffffffccffffbbfccccffffbffffccfbbbbffbbfffffffccffffbbfccccffffbffffccfbbbbffbbfffffffccffffbbfccccffffbffffccfbbbbffbbfffffffccffffbbfccccffffbffff
            ccffbbbbbfffffffffcccfffbfffcccffffbffffccffbbbbbfffffffffcccfffbfffcccffffbffffccffbbbbbfffffffffcccfffbfffcccffffbffffccffbbbbbfffffffffcccfffbfffcccffffbffff
            ccffbbbbffffffffffbccccbbfffcccffffbfffcccffbbbbffffffffffbccccbbfffcccffffbfffcccffbbbbffffffffffbccccbbfffcccffffbfffcccffbbbbffffffffffbccccbbfffcccffffbfffc
            ccffbbbfffffffffffbbccccffffccccfffbfffcccffbbbfffffffffffbbccccffffccccfffbfffcccffbbbfffffffffffbbccccffffccccfffbfffcccffbbbfffffffffffbbccccffffccccfffbfffc
            ccffbbbfffffffffffbbccccccffccccfffbfffcccffbbbfffffffffffbbccccccffccccfffbfffcccffbbbfffffffffffbbccccccffccccfffbfffcccffbbbfffffffffffbbccccccffccccfffbfffc
            cffffbbffffffffffbbbbccccccccccccfffbffccffffbbffffffffffbbbbccccccccccccfffbffccffffbbffffffffffbbbbccccccccccccfffbffccffffbbffffffffffbbbbccccccccccccfffbffc
            cffffbbbfffffffffbbfffffcccccccccfffbffccffffbbbfffffffffbbfffffcccccccccfffbffccffffbbbfffffffffbbfffffcccccccccfffbffccffffbbbfffffffffbbfffffcccccccccfffbffc
            cffffbbbbffffffffbbffffffccccccccfffbfcccffffbbbbffffffffbbffffffccccccccfffbfcccffffbbbbffffffffbbffffffccccccccfffbfcccffffbbbbffffffffbbffffffccccccccfffbfcc
            cffffbbbbbffffffbbbfffffffcccccccfffbccccffffbbbbbffffffbbbfffffffcccccccfffbccccffffbbbbbffffffbbbfffffffcccccccfffbccccffffbbbbbffffffbbbfffffffcccccccfffbccc
            bbfffffbbbbbffffbbbfffffffffcccccfffccccbbfffffbbbbbffffbbbfffffffffcccccfffccccbbfffffbbbbbffffbbbfffffffffcccccfffccccbbfffffbbbbbffffbbbfffffffffcccccfffcccc
            fbfffffbbbbbbbfbbbffffffffffcccccffccccffbfffffbbbbbbbfbbbffffffffffcccccffccccffbfffffbbbbbbbfbbbffffffffffcccccffccccffbfffffbbbbbbbfbbbffffffffffcccccffccccf
            fbffffffbbbbbbbbbbffffffffffcccccffcccfffbffffffbbbbbbbbbbffffffffffcccccffcccfffbffffffbbbbbbbbbbffffffffffcccccffcccfffbffffffbbbbbbbbbbffffffffffcccccffcccff
            fbffffffbbbbbbbbbfffffffffffcccccffccffffbffffffbbbbbbbbbfffffffffffcccccffccffffbffffffbbbbbbbbbfffffffffffcccccffccffffbffffffbbbbbbbbbfffffffffffcccccffccfff
            fbbfffffbbbbbbbfffffffffffffcccccffccbfffbbfffffbbbbbbbfffffffffffffcccccffccbfffbbfffffbbbbbbbfffffffffffffcccccffccbfffbbfffffbbbbbbbfffffffffffffcccccffccbff
            ffbbffffbbbbbbffffffffffffffcccccffccbffffbbffffbbbbbbffffffffffffffcccccffccbffffbbffffbbbbbbffffffffffffffcccccffccbffffbbffffbbbbbbffffffffffffffcccccffccbff
            ffbbbfffbbbbbbffffffffffffffcccccfcccbbfffbbbfffbbbbbbffffffffffffffcccccfcccbbfffbbbfffbbbbbbffffffffffffffcccccfcccbbfffbbbfffbbbbbbffffffffffffffcccccfcccbbf
            ffffbbbbbbbbbbfffffffffffffccccccfcccfbfffffbbbbbbbbbbfffffffffffffccccccfcccfbfffffbbbbbbbbbbfffffffffffffccccccfcccfbfffffbbbbbbbbbbfffffffffffffccccccfcccfbf
            ffffbbbbbbbbbbfffffffffffffcccccccccffbfffffbbbbbbbbbbfffffffffffffcccccccccffbfffffbbbbbbbbbbfffffffffffffcccccccccffbfffffbbbbbbbbbbfffffffffffffcccccccccffbf
            ffffffbbbbbbbbfffffffffffffcccccccccffbbffffffbbbbbbbbfffffffffffffcccccccccffbbffffffbbbbbbbbfffffffffffffcccccccccffbbffffffbbbbbbbbfffffffffffffcccccccccffbb
            bfffffffbbbbbbffffffffffffcccccccccffffbbfffffffbbbbbbffffffffffffcccccccccffffbbfffffffbbbbbbffffffffffffcccccccccffffbbfffffffbbbbbbffffffffffffcccccccccffffb
            bbfffffffbbbbbffffffffffffcccccccccfffffbbfffffffbbbbbffffffffffffcccccccccfffffbbfffffffbbbbbffffffffffffcccccccccfffffbbfffffffbbbbbffffffffffffcccccccccfffff
            bbfffffffbbbbbffffffffffffccccccccffffffbbfffffffbbbbbffffffffffffccccccccffffffbbfffffffbbbbbffffffffffffccccccccffffffbbfffffffbbbbbffffffffffffccccccccffffff
            fbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccffffff
            fbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccffffff
            fbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccffffff
            fbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccfffffffbfffffffbbbbbfffffffffffcccccccccffffff
            fbbffffffbbbbbfffffffffffccccccccffffffffbbffffffbbbbbfffffffffffccccccccffffffffbbffffffbbbbbfffffffffffccccccccffffffffbbffffffbbbbbfffffffffffccccccccfffffff
            fbbffffffbbbbbfffffffffffccccccccffffffffbbffffffbbbbbfffffffffffccccccccffffffffbbffffffbbbbbfffffffffffccccccccffffffffbbffffffbbbbbfffffffffffccccccccfffffff
            bbbffffffbbbbbfffffffffffccccccccfffffffbbbffffffbbbbbfffffffffffccccccccfffffffbbbffffffbbbbbfffffffffffccccccccfffffffbbbffffffbbbbbfffffffffffccccccccfffffff
            bbfffffffbbbbbfffffffffffccccccccfffffffbbfffffffbbbbbfffffffffffccccccccfffffffbbfffffffbbbbbfffffffffffccccccccfffffffbbfffffffbbbbbfffffffffffccccccccfffffff
            bbfffffffbbbbbbffffffffffccccccccfffffffbbfffffffbbbbbbffffffffffccccccccfffffffbbfffffffbbbbbbffffffffffccccccccfffffffbbfffffffbbbbbbffffffffffccccccccfffffff
            bbfffffffbbbbbbffffffffffccccccccfffffffbbfffffffbbbbbbffffffffffccccccccfffffffbbfffffffbbbbbbffffffffffccccccccfffffffbbfffffffbbbbbbffffffffffccccccccfffffff
            bbfffffffbbbbbbffffffffffcccccccffffffffbbfffffffbbbbbbffffffffffcccccccffffffffbbfffffffbbbbbbffffffffffcccccccffffffffbbfffffffbbbbbbffffffffffcccccccffffffff
            bffffffffbbbbbbffffffffffcccccccfffffffbbffffffffbbbbbbffffffffffcccccccfffffffbbffffffffbbbbbbffffffffffcccccccfffffffbbffffffffbbbbbbffffffffffcccccccfffffffb
            bffffffffbbbbbbffffffffffcccccccffffffbbbffffffffbbbbbbffffffffffcccccccffffffbbbffffffffbbbbbbffffffffffcccccccffffffbbbffffffffbbbbbbffffffffffcccccccffffffbb
            bffffffffbbbbbbffffffffffcccccccffffffbbbffffffffbbbbbbffffffffffcccccccffffffbbbffffffffbbbbbbffffffffffcccccccffffffbbbffffffffbbbbbbffffffffffcccccccffffffbb
            fffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbb
            fffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbb
            fffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbbfffffffffbbbbbbbfffffffffcccccccfffffbbb
            fffffffffbbbbbbbbffffffffcccccccffffbbbbfffffffffbbbbbbbbffffffffcccccccffffbbbbfffffffffbbbbbbbbffffffffcccccccffffbbbbfffffffffbbbbbbbbffffffffcccccccffffbbbb
            fffffffffbbbbbbbbffffffffcccccccffffbbbbfffffffffbbbbbbbbffffffffcccccccffffbbbbfffffffffbbbbbbbbffffffffcccccccffffbbbbfffffffffbbbbbbbbffffffffcccccccffffbbbb
            fffffffffbbbbbbbbffffffffcccccccffffbbbffffffffffbbbbbbbbffffffffcccccccffffbbbffffffffffbbbbbbbbffffffffcccccccffffbbbffffffffffbbbbbbbbffffffffcccccccffffbbbf
            ffffffffffbbbbbbbbffffffccccccccffffbbbfffffffffffbbbbbbbbffffffccccccccffffbbbfffffffffffbbbbbbbbffffffccccccccffffbbbfffffffffffbbbbbbbbffffffccccccccffffbbbf
            bfffffffffbbbbbbbbffffffccccccccbbbbbbbbbfffffffffbbbbbbbbffffffccccccccbbbbbbbbbfffffffffbbbbbbbbffffffccccccccbbbbbbbbbfffffffffbbbbbbbbffffffccccccccbbbbbbbb
            bbbbbfffffbbbbbbbbffffffcccccccccbbbbbbbbbbbbfffffbbbbbbbbffffffcccccccccbbbbbbbbbbbbfffffbbbbbbbbffffffcccccccccbbbbbbbbbbbbfffffbbbbbbbbffffffcccccccccbbbbbbb
            bbbbbbbbffbbbbbbbbbfffbbcccccccccbbbbbbbbbbbbbbbffbbbbbbbbbfffbbcccccccccbbbbbbbbbbbbbbbffbbbbbbbbbfffbbcccccccccbbbbbbbbbbbbbbbffbbbbbbbbbfffbbcccccccccbbbbbbb
            bbbbbbbbbbbbbbbbbbbfbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbcccccccccbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbb
            bbbbbbbbbbbbbbbbbbb8888888888ccccccbbbbbbbbbbbbbbbbbbbbbbbb8888888888ccccccbbbbbbbbbbbbbbbbbbbbbbbb8888888888ccccccbbbbbbbbbbbbbbbbbbbbbbbb8888888888ccccccbbbbb
            bbbbbbbbbbbbbb88888888888888888888cbbbbbbbbbbbbbbbbbbb88888888888888888888cbbbbbbbbbbbbbbbbbbb88888888888888888888cbbbbbbbbbbbbbbbbbbb88888888888888888888cbbbbb
            bbbbbbbbbbb8888888888888888888888888bbbbbbbbbbbbbbb8888888888888888888888888bbbbbbbbbbbbbbb8888888888888888888888888bbbbbbbbbbbbbbb8888888888888888888888888bbbb
            bbbbbbbb888888888888888888888888888888bbbbbbbbbb888888888888888888888888888888bbbbbbbbbb888888888888888888888888888888bbbbbbbbbb888888888888888888888888888888bb
            bbbbb88888888888888888888888888888888888bbbbb88888888888888888888888888888888888bbbbb88888888888888888888888888888888888bbbbb88888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
            `)
        tiles.loadMap(tiles.createSmallMap(tilemap`level5`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 13))
        boss1 = sprites.create(img`
            . . . . 2 2 f 2 2 f . . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f b 1 1 1 1 1 1 b f . . . 
            . . . f 1 1 1 1 1 1 1 d f . . . 
            . . f d 1 1 1 1 1 1 1 d d f . . 
            . . f d 1 1 1 1 1 1 d d d f . . 
            . . f d 1 1 1 d d d d d d f . . 
            . . f d 1 d f b d d d d b f . . 
            . . f b d d f c d b b b c f . . 
            . . . f 1 1 1 1 1 b b c f . . . 
            . . . f 1 b 1 f f f f f . . . . 
            . . . f b f c 1 1 1 b f . . . . 
            . . . . f f 1 b 1 b f f . . . . 
            . . . . . f b f b f f f . f . . 
            . . . . . . f f f f f f f f . . 
            . . . . . . . . f f f f f . . . 
            `, SpriteKind.boss)
        boss1.ay = 500
        tiles.placeOnTile(boss1, tiles.getTileLocation(14, 11))
        controller.moveSprite(mySprite, 0, 0)
        boss1.sayText("time for a fight.", 2000, true)
        pause(2000)
        mySprite.sayText("but.....", 2000, true)
        pause(2000)
        boss1.sayText("NO BUTTS, YOU NERD!", 2000, true)
        pause(4000)
        boss1.sayText("T.H.E.N  L.E.T  T.H.E  F.I.G.H.T  B.E.G.I.N.", 5000, true)
        timer.after(100, function () {
            boss_fight_start = 1
            boss1.vx = 40
            i = statusbars.create(50, 4, StatusBarKind.EnemyHealth)
            i.setPosition(119, 9)
            controller.moveSprite(mySprite, 100, 0)
        })
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (!(info.life() > 9)) {
        info.changeLifeBy(1)
        mySprite.startEffect(effects.coolRadial, 1000)
        mySprite.startEffect(effects.fountain, 1000)
        sprites.destroy(otherSprite, effects.disintegrate, 500)
        if (info.life() < 4) {
            color.startFadeFromCurrent(color.originalPalette, 500)
        }
    } else {
        mySprite.sayText("I don't need it.", 500, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.flyer, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y && sprite.vy > 0) {
        if (Math.percentChance(50)) {
            heart = sprites.create(img`
                . 2 . 2 . 
                2 2 2 2 2 
                2 2 2 2 2 
                . 2 2 2 . 
                . . 2 . . 
                `, SpriteKind.Food)
            heart.setPosition(otherSprite.x, otherSprite.y)
        }
        death_animater = sprites.create(img`
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
            `, SpriteKind.animater)
        death_animater.setPosition(otherSprite.x, otherSprite.y)
        animation.runImageAnimation(
        death_animater,
        [img`
            . 1 1 1 1 1 . . 
            1 1 1 1 1 1 1 . 
            1 f f 1 f f 1 . 
            1 f f 1 f f 1 . 
            1 1 f 1 f 1 1 . 
            1 f 1 1 1 f 1 . 
            1 1 1 f 1 1 1 . 
            1 . 1 . 1 . 1 . 
            `,img`
            . 1 1 1 1 1 . . 
            1 1 1 . 1 1 1 . 
            1 f f 1 f f 1 . 
            1 f f 1 f f 1 . 
            1 1 f 1 f 1 1 . 
            1 f 1 1 1 f 1 . 
            1 1 1 f 1 1 . . 
            1 . 1 . 1 . 1 . 
            `,img`
            . 1 1 1 1 1 . . 
            1 1 1 . 1 1 1 . 
            1 f f 1 f f 1 . 
            1 f f 1 f f 1 . 
            1 1 f 1 f 1 1 . 
            . f 1 1 1 f 1 . 
            1 1 . f 1 1 . . 
            1 . 1 . 1 . 1 . 
            `,img`
            . 1 1 1 1 1 . . 
            1 1 1 . 1 1 1 . 
            1 f f 1 f f 1 . 
            1 f f 1 f f 1 . 
            1 1 f 1 f 1 1 . 
            . f 1 . 1 f 1 . 
            1 1 . . 1 1 . . 
            1 . 1 . 1 . 1 . 
            `,img`
            . 1 1 1 1 1 . . 
            1 1 1 . 1 1 1 . 
            1 . f . f f . . 
            . f f 1 f f 1 . 
            1 1 f 1 f . 1 . 
            . f 1 . 1 f 1 . 
            1 . . . 1 1 . . 
            . . 1 . 1 . 1 . 
            `,img`
            . . 1 . 1 1 . . 
            . . 1 . . . 1 . 
            1 . f . f f . . 
            . f . 1 f f 1 . 
            1 1 f 1 f . 1 . 
            . f . . 1 f 1 . 
            1 . . . . 1 . . 
            . . 1 . . . . . 
            `,img`
            . . . . 1 1 . . 
            . . . . . . 1 . 
            1 . . . f . . . 
            . f . 1 . f . . 
            1 . . . . . 1 . 
            . . . . . . 1 . 
            1 . . . . 1 . . 
            . . 1 . . . . . 
            `,img`
            . . . . 1 . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . 1 . f . . 
            . . . . . . 1 . 
            . . . . . . 1 . 
            1 . . . . . . . 
            . . 1 . . . . . 
            `,img`
            . . . . 1 . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            1 . . . . . . . 
            . . 1 . . . . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            `],
        50,
        false
        )
        otherSprite.destroy()
        mySprite.vy = -80
    } else {
        beDamaged(true)
    }
})
function JumpAction () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -150
        music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y && sprite.vy > 0) {
        if (Math.percentChance(50)) {
            heart = sprites.create(img`
                . 2 . 2 . 
                2 2 2 2 2 
                2 2 2 2 2 
                . 2 2 2 . 
                . . 2 . . 
                `, SpriteKind.Food)
            heart.setPosition(otherSprite.x, otherSprite.y)
        }
        death_animater = sprites.create(img`
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
            `, SpriteKind.animater)
        death_animater.ay = 500
        death_animater.setPosition(otherSprite.x, otherSprite.y)
        animation.runImageAnimation(
        death_animater,
        [img`
            . . 1 1 1 1 . . 
            . . f 1 f 1 . . 
            . . 1 1 1 . . . 
            . . . d . . . . 
            . . 1 d 1 . . . 
            . 1 . 1 . 1 . . 
            . . 1 1 1 . . . 
            . 1 . . . 1 . . 
            `,img`
            . . . . . 1 1 . 
            . . . . . f . . 
            . . 1 1 1 . 1 . 
            1 1 . d . . . . 
            f 1 1 d 1 . . . 
            . 1 . 1 . 1 . . 
            . . 1 1 1 . . . 
            . 1 . . . 1 . . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . 1 . . 1 1 . 
            1 . 1 . . 1 . . 
            f . f 1 1 . 1 . 
            . 1 . 1 . 1 . . 
            1 d 1 1 . . 1 . 
            . 1 . . . . . 1 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            1 . . . . . . . 
            f . . . . . 1 . 
            1 . 1 . . 1 . . 
            . 1 f 1 1 . 1 1 
            1 d . 1 . 1 1 . 
            `,img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            1 . 1 . 1 1 . . 
            1 1 f 1 1 . 1 1 
            f d . 1 . 1 1 . 
            `],
        100,
        false
        )
        otherSprite.destroy()
        mySprite.vy = -80
    } else {
        beDamaged(true)
    }
})
let projectile2: Sprite = null
let projectile: Sprite = null
let projectile3: Sprite = null
let heart: Sprite = null
let death_animater: Sprite = null
let weirdo: Sprite = null
let boss1: Sprite = null
let i: StatusBarSprite = null
let bat: Sprite = null
let enemy2: Sprite = null
let enemy1: Sprite = null
let mySprite: Sprite = null
let face = 0
let boss_fight_start = 0
boss_fight_start = 0
info.setLife(10)
profilelife.setMaxLife(10)
info.blockSetBg(0)
info.blockSetBorder(1)
info.blockSetFont(1)
face = 1
scene.setBackgroundImage(img`
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    6666666666666667666666666666666666666666666666666666666766666666666666666666666666666666666666676666666666666666666666666666666666666667666666666666666666666666
    6666666666666677666666666666666666666666666666666666667766666666666666666666666666666666666666776666666666666666666666666666666666666677666666666666666666666666
    6666666666666677666666666666666666666666666666666666667766666666666666666666666666666666666666776666666666666666666666666666666666666677666666666666666666666666
    6666666666666777766666666666666666666666666666666666677776666666666666666666666666666666666667777666666666666666666666666666666666666777766666666666666666666666
    6666666666677777666666666666666666666666666666666667777766666666666666666666666666666666666777776666666666666666666666666666666666677777666666666666666666666666
    6666666666666777666666666666666666666666666666666666677766666666666666666666666666666666666667776666666666666666666666666666666666666777666666666666666666666666
    6666666666667777766666666666666666666666666666666666777776666666666666666666666666666666666677777666666666666666666666666666666666667777766666666666666666666666
    6666666666667777777666666666666666666666666666666666777777766666666666666666666666666666666677777776666666666666666666666666666666667777777666666666666666666666
    6666666666677777766666666666666666666666666666666667777776666666666666666666666666666666666777777666666666666666666666666666666666677777766666666666666666666666
    6666666667777777776666666666666666666666666666666777777777666666666666666666666666666666677777777766666666666666666666666666666667777777776666666666666666666666
    6666666666677777777666666666666666666666666666666667777777766666666666666666666666666666666777777776666666666666666666666666666666677777777666666666666666666666
    6666666666777777766666666666666666666666666666666677777776666666666666666666666666666666667777777666666666666666666666666666666666777777766666666666666666666666
    6666666666667777776666667666666666666666666666666666777777666666766666666666666666666666666677777766666676666666666666666666666666667777776666667666666666666666
    6666666666777777777666667666666666666666666666666677777777766666766666666666666666666666667777777776666676666666666666666666666666777777777666667666666666666666
    6666666667777777777766677666666666666666666666666777777777776667766666666666666666666666677777777777666776666666666666666666666667777777777766677666666666666666
    6666666777777777776666667766666666666666666666677777777777666666776666666666666666666667777777777766666677666666666666666666666777777777776666667766666666666666
    6666666667777777776666677666666666666666666666666777777777666667766666666666666666666666677777777766666776666666666666666666666667777777776666677666666666666666
    6666666667777777666666777766666666666666666666666777777766666677776666666666666666666666677777776666667777666666666666666666666667777777666666777766666666666666
    6666666677977777777667777776666666666666666666667797777777766777777666666666666666666666779777777776677777766666666666666666666677977777777667777776666666666666
    6666666666777777777766677666666666667666666666666677777777776667766666666666766666666666667777777777666776666666666676666666666666777777777766677666666666667666
    6666666677777777777667777776666666667666666666667777777777766777777666666666766666666666777777777776677777766666666676666666666677777777777667777776666666667666
    6667666777777777777677777777666666677766666766677777777777767777777766666667776666676667777777777776777777776666666777666667666777777777777677777777666666677766
    6667766666777777777777777766666666667766666776666677777777777777776666666666776666677666667777777777777777666666666677666667766666777777777777777766666666667766
    6677666677777777777777777777666666677666667766667777777777777777777766666667766666776666777777777777777777776666666776666677666677777777777777777777666666677666
    6667766777777777777777777777766666777766666776677777777777777777777776666677776666677667777777777777777777777666667777666667766777777777777777777777766666777766
    6677777777777777777777777776666666677776667777777777777777777777777666666667777666777777777777777777777777766666666777766677777777777777777777777776666666677776
    6667777777777777777777777777766666777766666777777777777777777777777776666677776666677777777777777777777777777666667777666667777777777777777777777777766666777766
    6667777777777777777777777777776667777776666777777777777777777777777777666777777666677777777777777777777777777766677777766667777777777777777777777777776667777776
    6677777777777777777777777777666666777766667777777777777777777777777766666677776666777777777777777777777777776666667777666677777777777777777777777777666666777766
    6777777777777777777777777777776677777776677777777777777777777777777777667777777667777777777777777777777777777766777777766777777777777777777777777777776677777776
    6677777777777777777777777777777667777777667777777777777777777777777777766777777766777777777777777777777777777776677777776677777777777777777777777777777667777777
    6677777777777777777777777777776677777777667777777777777777777777777777667777777766777777777777777777777777777766777777776677777777777777777777777777776677777777
    7777777777777777777777777777777677777777777777777777777777777777777777767777777777777777777777777777777777777776777777777777777777777777777777777777777677777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    `)
tiles.loadMap(tiles.createSmallMap(tilemap`level4`))
let stats2 = sprites.create(img`
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `, SpriteKind.stats)
stats2.z = 1
stats2.setPosition(80, 8)
mySprite = sprites.create(img`
    . 2 2 2 . . . . 
    . 2 b b b b . . 
    . 2 b b b b . . 
    2 2 b f f f . . 
    . . b b f b . . 
    . . 2 2 2 2 . . 
    . . c c c 2 . . 
    . . c . . c . . 
    `, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 3))
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 300
effects.blizzard.startScreenEffect()
scene.cameraFollowSprite(mySprite)
stats2.setFlag(SpriteFlag.RelativeToCamera, true)
let textSprite = textsprite.create("我還沒做完第二章")
textSprite.setMaxFontHeight(0.5)
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    enemy1 = sprites.create(img`
        . . 1 1 1 1 . . 
        . . 1 f 1 f . . 
        . . . 1 1 1 . . 
        . . . . d . . . 
        . . . 1 d 1 . . 
        . . 1 . 1 . 1 . 
        . . . 1 1 1 . . 
        . . 1 . . . 1 . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(enemy1, value)
    animation.runImageAnimation(
    enemy1,
    [img`
        . . 1 1 1 1 . . 
        . . 1 f 1 f . . 
        . . . 1 1 1 . . 
        . . . . d . . . 
        . . . 1 d 1 . . 
        . . 1 . 1 . 1 . 
        . . . 1 1 1 . . 
        . . 1 . . . 1 . 
        `,img`
        . . 1 1 1 1 . . 
        . . 1 f 1 f . . 
        . . . 1 1 1 . . 
        . . . . d . . . 
        . . . 1 d 1 . . 
        . . 1 . 1 . 1 . 
        . . . 1 1 1 . . 
        . . . 1 . 1 . . 
        `,img`
        . . . . . . . . 
        . . 1 1 1 1 . . 
        . . 1 f 1 f . . 
        . . . 1 1 1 . . 
        . . . . d . . . 
        . . . 1 d 1 . . 
        . . 1 . 1 . 1 . 
        . . . . 1 . . . 
        `,img`
        . . 1 1 1 1 . . 
        . . 1 f 1 f . . 
        . . . 1 1 1 . . 
        . . . . d . . . 
        . . . 1 d 1 . . 
        . . 1 . 1 . 1 . 
        . . . 1 1 1 . . 
        . . . 1 . 1 . . 
        `],
    100,
    true
    )
    enemy1.ay = 500
    enemy1.setVelocity(30, 0)
    tiles.setTileAt(value, assets.tile`transparency8`)
}
for (let value2 of tiles.getTilesByType(assets.tile`myTile2`)) {
    enemy2 = sprites.create(img`
        . . 2 2 2 2 2 . 
        . 2 2 2 f f f 2 
        . 2 2 f 9 f 9 2 
        . 2 2 f 9 f 9 2 
        . 2 2 f f f f . 
        . . 2 2 2 f 2 . 
        . . 2 2 f f 2 . 
        . 2 2 2 f f 2 . 
        `, SpriteKind.shootenemy)
    tiles.placeOnTile(enemy2, value2)
    enemy2.ay = 500
    tiles.setTileAt(value2, assets.tile`transparency8`)
}
for (let value3 of tiles.getTilesByType(assets.tile`myTile3`)) {
    bat = sprites.create(img`
        . 1 1 1 1 1 . 
        1 1 1 1 1 1 1 
        1 f f 1 f f 1 
        1 f f 1 f f 1 
        1 1 f 1 f 1 1 
        1 f 1 1 1 f 1 
        1 1 1 f 1 1 1 
        1 . 1 . 1 . 1 
        `, SpriteKind.flyer)
    tiles.placeOnTile(bat, value3)
    bat.vx = 30
    bat.setBounceOnWall(true)
    tiles.setTileAt(value3, assets.tile`transparency8`)
}
game.onUpdate(function () {
    for (let value22 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value22.isHittingTile(CollisionDirection.Left)) {
            value22.vx = 30
            animation.runImageAnimation(
            value22,
            [img`
                . . 1 1 1 1 . . 
                . . 1 f 1 f . . 
                . . . 1 1 1 . . 
                . . . . d . . . 
                . . . 1 d 1 . . 
                . . 1 . 1 . 1 . 
                . . . 1 1 1 . . 
                . . 1 . . . 1 . 
                `,img`
                . . 1 1 1 1 . . 
                . . 1 f 1 f . . 
                . . . 1 1 1 . . 
                . . . . d . . . 
                . . . 1 d 1 . . 
                . . 1 . 1 . 1 . 
                . . . 1 1 1 . . 
                . . . 1 . 1 . . 
                `,img`
                . . . . . . . . 
                . . 1 1 1 1 . . 
                . . 1 f 1 f . . 
                . . . 1 1 1 . . 
                . . . . d . . . 
                . . . 1 d 1 . . 
                . . 1 . 1 . 1 . 
                . . . . 1 . . . 
                `,img`
                . . 1 1 1 1 . . 
                . . 1 f 1 f . . 
                . . . 1 1 1 . . 
                . . . . d . . . 
                . . . 1 d 1 . . 
                . . 1 . 1 . 1 . 
                . . . 1 1 1 . . 
                . . . 1 . 1 . . 
                `],
            100,
            true
            )
        } else if (value22.isHittingTile(CollisionDirection.Right)) {
            value22.vx = -30
            animation.runImageAnimation(
            value22,
            [img`
                . . 1 1 1 1 . . 
                . . f 1 f 1 . . 
                . . 1 1 1 . . . 
                . . . d . . . . 
                . . 1 d 1 . . . 
                . 1 . 1 . 1 . . 
                . . 1 1 1 . . . 
                . 1 . . . 1 . . 
                `,img`
                . . 1 1 1 1 . . 
                . . f 1 f 1 . . 
                . . 1 1 1 . . . 
                . . . d . . . . 
                . . 1 d 1 . . . 
                . 1 . 1 . 1 . . 
                . . 1 1 1 . . . 
                . . 1 . 1 . . . 
                `,img`
                . . . . . . . . 
                . . 1 1 1 1 . . 
                . . f 1 f 1 . . 
                . . 1 1 1 . . . 
                . . . d . . . . 
                . . 1 d 1 . . . 
                . 1 . 1 . 1 . . 
                . . . 1 . . . . 
                `,img`
                . . 1 1 1 1 . . 
                . . f 1 f 1 . . 
                . . 1 1 1 . . . 
                . . . d . . . . 
                . . 1 d 1 . . . 
                . 1 . 1 . 1 . . 
                . . 1 1 1 . . . 
                . . 1 . 1 . . . 
                `],
            100,
            true
            )
        }
        if (!(value22.isHittingTile(CollisionDirection.Bottom))) {
            value22.vx = -1 * value22.vx
            value22.image.flipX()
            if (value22.vx == 30) {
                animation.runImageAnimation(
                value22,
                [img`
                    . . 1 1 1 1 . . 
                    . . 1 f 1 f . . 
                    . . . 1 1 1 . . 
                    . . . . d . . . 
                    . . . 1 d 1 . . 
                    . . 1 . 1 . 1 . 
                    . . . 1 1 1 . . 
                    . . 1 . . . 1 . 
                    `,img`
                    . . 1 1 1 1 . . 
                    . . 1 f 1 f . . 
                    . . . 1 1 1 . . 
                    . . . . d . . . 
                    . . . 1 d 1 . . 
                    . . 1 . 1 . 1 . 
                    . . . 1 1 1 . . 
                    . . . 1 . 1 . . 
                    `,img`
                    . . . . . . . . 
                    . . 1 1 1 1 . . 
                    . . 1 f 1 f . . 
                    . . . 1 1 1 . . 
                    . . . . d . . . 
                    . . . 1 d 1 . . 
                    . . 1 . 1 . 1 . 
                    . . . . 1 . . . 
                    `,img`
                    . . 1 1 1 1 . . 
                    . . 1 f 1 f . . 
                    . . . 1 1 1 . . 
                    . . . . d . . . 
                    . . . 1 d 1 . . 
                    . . 1 . 1 . 1 . 
                    . . . 1 1 1 . . 
                    . . . 1 . 1 . . 
                    `],
                100,
                true
                )
            } else {
                animation.runImageAnimation(
                value22,
                [img`
                    . . 1 1 1 1 . . 
                    . . f 1 f 1 . . 
                    . . 1 1 1 . . . 
                    . . . d . . . . 
                    . . 1 d 1 . . . 
                    . 1 . 1 . 1 . . 
                    . . 1 1 1 . . . 
                    . 1 . . . 1 . . 
                    `,img`
                    . . 1 1 1 1 . . 
                    . . f 1 f 1 . . 
                    . . 1 1 1 . . . 
                    . . . d . . . . 
                    . . 1 d 1 . . . 
                    . 1 . 1 . 1 . . 
                    . . 1 1 1 . . . 
                    . . 1 . 1 . . . 
                    `,img`
                    . . . . . . . . 
                    . . 1 1 1 1 . . 
                    . . f 1 f 1 . . 
                    . . 1 1 1 . . . 
                    . . . d . . . . 
                    . . 1 d 1 . . . 
                    . 1 . 1 . 1 . . 
                    . . . 1 . . . . 
                    `,img`
                    . . 1 1 1 1 . . 
                    . . f 1 f 1 . . 
                    . . 1 1 1 . . . 
                    . . . d . . . . 
                    . . 1 d 1 . . . 
                    . 1 . 1 . 1 . . 
                    . . 1 1 1 . . . 
                    . . 1 . 1 . . . 
                    `],
                100,
                true
                )
            }
        }
    }
})
game.onUpdate(function () {
    if (boss_fight_start == 1) {
        if (boss1.isHittingTile(CollisionDirection.Left)) {
            boss1.vx = 40
            animation.runImageAnimation(
            boss1,
            [img`
                . . . . . . . . f 2 2 f . . 2 . 
                . . . . . . f f 2 2 2 2 f 2 . . 
                . . . . . f b 2 2 2 2 2 2 b f . 
                . . . . . f d 1 1 1 1 1 1 1 f . 
                . . . . f d d 1 1 1 1 1 1 1 d f 
                . . . . f d d d 1 1 1 1 1 1 d f 
                . . . . f d d d d d d 1 1 1 d f 
                . . . . f b d d d d b f d 1 d f 
                . . . . f c b b b d c f d d b f 
                . . . . . f c b b 1 1 1 1 1 f . 
                . . . . . . f f f f f 1 b 1 f . 
                . . . . . . f b 1 1 1 c f b f . 
                . . . . . . f f b 1 b 1 f f . . 
                . . . . f . f f f b f b f . . . 
                . . . . f f f f f f f f . . . . 
                . . . . . f f f f f . . . . . . 
                `,img`
                . . . . . . . f 2 2 2 f 2 2 . . 
                . . . . . f f 2 2 2 2 2 f . . . 
                . . . . f b 1 1 1 1 1 1 b f . . 
                . . . f b d 1 1 1 1 1 1 1 f . . 
                . . . f d d d 1 1 1 1 1 1 d f . 
                . . . f d d d d 1 1 1 1 1 d f . 
                . . . f d d d d d d d 1 1 d f . 
                . . . f d d d d d d d 1 1 1 f . 
                . . . f d d d d d d c f 1 1 f . 
                . . . . f b d d d b 1 1 1 1 b f 
                . . . . . f f f c f d b 1 b 1 f 
                . . . . f f f f f f f f b f b f 
                . f f . f f f f f f f f f f f . 
                . . f f f f f f f f . . . . . . 
                . . f f f f f f b 1 b 1 f . . . 
                . . . f f f f f f b f b f . . . 
                `],
            100,
            true
            )
        } else if (boss1.isHittingTile(CollisionDirection.Right)) {
            boss1.vx = -40
            animation.runImageAnimation(
            boss1,
            [img`
                . 2 . . f 2 2 f . . . . . . . . 
                . . 2 f 2 2 2 2 f f . . . . . . 
                . f b 2 2 2 2 2 2 b f . . . . . 
                . f 1 1 1 1 1 1 1 d f . . . . . 
                f d 1 1 1 1 1 1 1 d d f . . . . 
                f d 1 1 1 1 1 1 d d d f . . . . 
                f d 1 1 1 d d d d d d f . . . . 
                f d 1 d f b d d d d b f . . . . 
                f b d d f c d b b b c f . . . . 
                . f 1 1 1 1 1 b b c f . . . . . 
                . f 1 b 1 f f f f f . . . . . . 
                . f b f c 1 1 1 b f . . . . . . 
                . . f f 1 b 1 b f f . . . . . . 
                . . . f b f b f f f . f . . . . 
                . . . . f f f f f f f f . . . . 
                . . . . . . f f f f f . . . . . 
                `,img`
                . . 2 2 f 2 2 2 f . . . . . . . 
                . . . f 2 2 2 2 2 f f . . . . . 
                . . f b 1 1 1 1 1 1 b f . . . . 
                . . f 1 1 1 1 1 1 1 d b f . . . 
                . f d 1 1 1 1 1 1 d d d f . . . 
                . f d 1 1 1 1 1 d d d d f . . . 
                . f d 1 1 d d d d d d d f . . . 
                . f 1 1 1 d d d d d d d f . . . 
                . f 1 1 f c d d d d d d f . . . 
                f b 1 1 1 1 b d d d b f . . . . 
                f 1 b 1 b d f c f f f . . . . . 
                f b f b f f f f f f f f . . . . 
                . f f f f f f f f f f f . f f . 
                . . . . . . f f f f f f f f . . 
                . . . f 1 b 1 b f f f f f f . . 
                . . . f b f b f f f f f f . . . 
                `],
            100,
            true
            )
        }
    }
})
game.onUpdateInterval(700, function () {
    if (boss_fight_start == 1) {
        if (boss1.vx == 40) {
            projectile3 = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . 2 2 2 2 . . . 
                . . . . . . . 2 2 1 1 1 1 2 . . 
                . . . . 2 2 3 3 1 1 1 1 1 1 . . 
                . . 3 3 3 3 1 1 1 1 1 1 1 1 . . 
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                . . 3 3 2 2 3 1 1 1 1 1 1 1 . . 
                . . . . . . 2 2 3 1 1 1 1 2 . . 
                . . . . . . . . . 2 2 2 2 . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, boss1, 100, 0)
        } else {
            projectile3 = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . 2 2 2 2 . . . . . . . . . 
                . . 2 1 1 1 1 2 2 . . . . . . . 
                . . 1 1 1 1 1 1 3 3 2 2 . . . . 
                . . 1 1 1 1 1 1 1 1 3 3 3 3 . . 
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                . . 1 1 1 1 1 1 1 3 2 2 3 3 . . 
                . . 2 1 1 1 1 3 2 2 . . . . . . 
                . . . 2 2 2 2 . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, boss1, -100, 0)
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value4 of sprites.allOfKind(SpriteKind.shootenemy)) {
        if (mySprite.x > value4.x) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . 8 a a 8 . . 
                . 8 8 a 9 9 9 a 8 . 
                . 8 8 a 9 9 9 a 8 . 
                . . . . 8 a a 8 . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                `, value4, 50, 0)
            value4.setImage(img`
                . . 2 2 2 2 2 . 
                . 2 2 2 f f f 2 
                . 2 2 f 9 f 9 2 
                . 2 2 f 9 f 9 2 
                . 2 2 f f f f . 
                . . 2 2 2 f 2 . 
                . . 2 2 f f 2 . 
                . 2 2 2 f f 2 . 
                `)
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                . . 8 a a 8 . . . . 
                . 8 a 9 9 9 a 8 8 . 
                . 8 a 9 9 9 a 8 8 . 
                . . 8 a a 8 . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                . . . . . . . . . . 
                `, value4, -50, 0)
            value4.setImage(img`
                . 2 2 2 2 2 . . 
                2 f f f 2 2 2 . 
                2 9 f 9 f 2 2 . 
                2 9 f 9 f 2 2 . 
                . f f f f 2 2 . 
                . 2 f 2 2 2 . . 
                . 2 f f 2 2 . . 
                . 2 f f 2 2 2 . 
                `)
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value5 of sprites.allOfKind(SpriteKind.flyer)) {
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . . c . . . 
            . c a a a c . . 
            c c f a b b c . 
            b f f b f a a . 
            b b a b f f a . 
            c b f b b a c . 
            . b a f c c . . 
            . . b b c . . . 
            `, value5, 50, 100)
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . . c . . . 
            . c a a a c . . 
            c c f a b b c . 
            b f f b f a a . 
            b b a b f f a . 
            c b f b b a c . 
            . b a f c c . . 
            . . b b c . . . 
            `, value5, -50, 100)
        projectile2 = sprites.createProjectileFromSprite(img`
            . . . . c . . . 
            . c a a a c . . 
            c c f a b b c . 
            b f f b f a a . 
            b b a b f f a . 
            c b f b b a c . 
            . b a f c c . . 
            . . b b c . . . 
            `, value5, 0, 100)
    }
})
forever(function () {
    music.play(music.createSong(hex`0078000408040400001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011808001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040400001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011808001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800b80000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d000100600061000200086800690002000870007100020008780079000200087c007d000100`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011805001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011b30003800019c38004000011e60006800012068007000019c7000780001a178008000012005001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d0000006400140001320002010002120000001000018b40005000018960007000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011805001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011b30003800019c38004000011e60006800012068007000019c7000780001a178008000012005001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d0000006400140001320002010002120000001000018b40005000018960007000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040400001c00010a006400f401640000040000000000000000000000000005000004800100000200012002000400019c04000600011b06000800011908000a0001200a000c00019c0c000e00011b0e001000011910001200012012001400019c14001600011b16001800011918001a0001201a001c00019c1c001e00011b1e002000011920002200012022002400019c24002600011b26002800011928002a0001202a002c00019c2c002e00011b2e00300001193000320001a332003400012034003600019c36003800011938003a0001a13a003c0001203c003e00019e3e004000019c40004200012042004400019c44004600011b46004800011948004a0001204a004c00019c4c004e00011b4e005000011950005200012052005400019c54005600011b56005800011958005a0001205a005c00019c5c005e00011b5e006000011960006200012062006400019c64006600011b66006800011968006a0001206a006c00019c6c006e00011b6e007000011970007200011e72007400019c74007600011b76007800011978007a0001207a007c00019c7c007e00011b7e008000011907001c00020a006400f401640000040000000000000000000000000000000003660008000c0001181000140001192400280001182c003000011934003800019c3c004000011948004c0001185000540001195c006000011960006400019c64006800011968006c00019c6c007000011970007400019c74007800011978007c00019c7c008000011908001c000e050046006603320000040a002d0000006400140001320002010002300000000800010d10001800010d20002800018b30003800010c40004800010d50005800010d60006800010670007800010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8009c000400050001050800090001080e000f0001081400150001051800190001082400250001052800290001082e002f0001083400350001053800390001083e003f0001084400450001054800490001084e004f0001085400550001055800590001086400650001056800690001086a006b0001086c006d0001086e006f0001087400750001057800790001087a007b0001087c007d0001087e007f000108`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040400001c00010a006400f401640000040000000000000000000000000005000004800100000200012002000400019c04000600011b06000800011908000a0001200a000c00019c0c000e00011b0e001000011910001200012012001400019c14001600011b16001800011918001a0001201a001c00019c1c001e00011b1e002000011920002200012022002400019c24002600011b26002800011928002a0001202a002c00019c2c002e00011b2e00300001193000320001a332003400012034003600019c36003800011938003a0001a13a003c0001203c003e00019e3e004000019c40004200012042004400019c44004600011b46004800011948004a0001204a004c00019c4c004e00011b4e005000011950005200012052005400019c54005600011b56005800011958005a0001205a005c00019c5c005e00011b5e006000011960006200012062006400019c64006600011b66006800011968006a0001206a006c00019c6c006e00011b6e007000011970007200011e72007400019c74007600011b76007800011978007a0001207a007c00019c7c007e00011b7e008000011907001c00020a006400f4016400000400000000000000000000000000000000036b0008000c0001181000140001192400280001182c003000011934003800019c3c004000011948004c0001185000540001195c006000011960006400019c64006800011968006c00019c6c00700002192570007400029ca87400780002192578007c00029ca87c00800002192508001c000e050046006603320000040a002d0000006400140001320002010002300000000800010d10001800010d20002800018b30003800010c40004800010d50005800010d60006800010670007800010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8009c000400050001050800090001080e000f0001081400150001051800190001082400250001052800290001082e002f0001083400350001053800390001083e003f0001084400450001054800490001084e004f0001085400550001055800590001086400650001056800690001086a006b0001086c006d0001086e006f0001087400750001057800790001087a007b0001087c007d0001087e007f000108`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011805001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011b30003800019c38004000011e60006800012068007000019c7000780001a178008000012005001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d0000006400140001320002010002120000001000018b40005000018960007000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011805001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011b30003800019c38004000011e60006800012068007000019c7000780001a178008000012005001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d0000006400140001320002010002120000001000018b40005000018960007000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004300040004400010d48004c00010f50005400019058005c00011260006400011468006c00019570007400011878007c00011405001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800019c08000c00011b0c001000011e10001400019c14001800012018001c00011e1c00200001a120002400011924002800019c28002c00011b2c003000011e30003400019c34003800012038003c00011e3c00400001a140004400011944004800019c48004c00011b4c005000011e50005400019c54005800012058005c00011e5c00600001a160006400011964006800019c68006c00011b6c007000011e70007400019c74007800012078007c0001a17c008000012007001c00020a006400f40164000004000000000000000000000000000000000330000000040001251000140001a32000240001a130003400012040004400011e50005400019c60006400011b70007400011808001c000e050046006603320000040a002d0000006400140001320002010002180000001000010d20003000019040005000011260007000011409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8006000000001000105080009000105100011000105180019000105200021000105280029000105300031000105380039000105400041000105480049000105500051000105580059000105600061000105680069000105700071000105780079000105`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004300040004400010d48004c00010f50005400019058005c00011260006400011468006c00019570007400011878007c00011405001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800019c08000c00011b0c001000011e10001400019c14001800012018001c00011e1c00200001a120002400011924002800019c28002c00011b2c003000011e30003400019c34003800012038003c00011e3c00400001a140004400011944004800019c48004c00011b4c005000011e50005400019c54005800012058005c00011e5c00600001a160006400011964006800019c68006c00011b6c007000011e70007400019c74007800012078007c0001a17c008000012007001c00020a006400f40164000004000000000000000000000000000000000330000000040001251000140001a32000240001a130003400012040004400011e50005400019c60006400011b70007400011808001c000e050046006603320000040a002d00000064001400013200020100021f000000100001192000300001974000500001956000700002141870008000011409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80040010000010001050400050001060800090001050c000d0001061000110001051400150001061800190001051c001d0001062000210001052400250001062800290001052c002d0001063000310001053400350001063800390001053c003d0001064000410001054200430001074400450001064600470001074800490001054a004b0001074c004d0001064e004f0001075000510001055200530001075400550001065600570001075800590001055a005b0001075c005d0001065e005f00010760006100010561006200010862006300010763006400010864006500010665006600010866006700010767006800010868006900010569006a0001086a006b0001076b006c0001086c006d0001066d006e0001086e006f0001076f00700001087000710003050708740075000305070878007900030507087c007d0003050708`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040600001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011830003800019738004000011660006800011968007000011870007800019778008000011805001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011907001c00020a006400f4016400000400000000000000000000000000000000031c0000000400021925100014000297a320002400029ca830003400029eaa08001c000e050046006603320000040a002d00000064001400013200020100020c0000001000010d40005000010d09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800a5000000010001000800090001001000110001001800190001001c001d000100200021000200062800290002000630003100020006380039000200063c003d00010040004100050003060708480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(hex`0078000408040500001c00010a006400f401640000040000000000000000000000000005000004d80000000400011904000800019c0c001000011910001400019c18001c00011e1c001e00011e1e002000011e20002400012024002800019c28002c00011b2c003000011930003200012032003400012034003600019c36003800019c38003a00011b3a003c00011b3c003e0001193e004000011940004400011944004800019c4c004e0001194e005000011950005400019c58005c00011e5e006000011e60006400012068006c00019c7000720001a17200740001a17400760001a17600780001a178007a0001207a007c0001207c007e0001207e008000012003001c0001dc00690000045e0100040000000000000000000005640001040003300020002800011928003000011b30003800019c38004000011e60006800012068007000019c7000780001a178008000012005001c000f0a006400f4010a0000040000000000000000000000000000000002c00000000400011904000800011b08000c00019c0c001000011e10001400011914001800011b18001c00019c1c002000011e20002400012024002800019c28002c00011b2c003000011930003400012034003800019c38003c00011b3c004000011940004400011944004800011b48004c00019c4c005000011e50005400011954005800011b58005c00019c5c006000011e60006400012064006800019c68006c00011b6c007000011970007400012074007800019c78007c00011b7c008000011908001c000e050046006603320000040a002d0000006400140001320002010002120000001000018b40005000018960007000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800cb0000000100020006080009000200080e000f000106100011000100140015000106180019000200081c001d000200061e001f00010620002100020008240025000106280029000200082c002d00010630003100020008340035000106380039000200083c003d0002000640004100020006480049000200084e004f000106500051000100540055000106580059000200085c005d00010060006100020008640065000106680069000200086c006d00010670007100020008740075000106780079000200087c007d00020006`), music.PlaybackMode.UntilDone)
})
game.onUpdateInterval(3000, function () {
    if (boss_fight_start == 1) {
        extraEffects.createSpreadEffectOnAnchor(boss1, extraEffects.createSingleColorSpreadEffectData(5, ExtraEffectPresetShape.Twinkle), 100)
        timer.after(1000, function () {
            boss1.vy = -170
        })
    }
})
