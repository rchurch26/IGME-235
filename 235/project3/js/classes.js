class Ship extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/ship.png"].texture);
        this.anchor.set(.5, .5);
        this.scale.set(0.1);
        this.x = x;
        this.y = y;
        this.speed = 125;
    }
    move(dt = 1/60)
    {
        this.x = this.x + dt * Math.cos(this.rotation);
        this.y = this.y + dt * Math.sin(this.rotation);
    }
}