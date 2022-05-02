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
        this.isAlive = true;
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
        this.isAlive = true;
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
        this.isAlive = true;
    }
    move(dt = 1/60)
    {
        this.x += this.fwd.x * 100 * dt;
        this.y += this.fwd.y * 100 * dt;
    }
}

class Bullet extends PIXI.Graphics
{
    constructor(color = 0xFFFFFF, x = 0, y = 0, ship)
    {
        super();
        this.beginFill(color);
        this.drawRect(-3, -2, 6, 4);
        this.endFill();
        this.ship = ship;
        this.fwd = this.ship.rotation;
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.isAlive = true;
        this.rotation = Math.atan2(Math.sin(this.fwd),Math.cos(this.fwd));
        Object.seal(this);
    }
    move(dt = 1/60)
    {
        this.x += Math.cos(this.fwd) * this.speed * dt;
        this.y += Math.sin(this.fwd) * this.speed * dt;
    }
}