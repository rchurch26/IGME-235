class Ship extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/ship.png"].texture);
        this.anchor.set(1, 1);
        this.scale.set(0.5);
        this.x = x;
        this.y = y;
    }
}