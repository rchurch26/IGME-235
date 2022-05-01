class Ship extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/ship.png"].texture);
        this.anchor.set(.5, .5);
        this.scale.set(0.5);
        this.x = x;
        this.y = y;
    }
}

class LargeAsteroid extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/large/a10000.png"].texture);
        this.anchor.set(.5, .5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
        this.fwd = getRandomUnitVector();
    }
    move(dt = 1/60)
    {
        this.x += this.fwd.x * 50 * dt;
        this.y += this.fwd.y * 50 * dt;
    }
}

class MediumAsteroid extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/medium/a10000.png"].texture);
        this.anchor.set(.5, .5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
        this.fwd = getRandomUnitVector();
    }
    move(dt = 1/60)
    {
        this.x += this.fwd.x * 75 * dt;
        this.y += this.fwd.y * 75 * dt;
    }
}

class SmallAsteroid extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/small/a10000.png"].texture);
        this.anchor.set(.5, .5);
        this.scale.set(.5);
        this.x = x;
        this.y = y;
        this.fwd = getRandomUnitVector();
    }
    move(dt = 1/60)
    {
        this.x += this.fwd.x * 100 * dt;
        this.y += this.fwd.y * 100 * dt;
    }
}