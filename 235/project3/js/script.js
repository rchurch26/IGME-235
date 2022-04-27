"use strict";
const app = new PIXI.Application(600, 400);
document.body.appendChild(app.view);
window.onload = () =>
{
    const ship = new PIXI.Graphics();
    ship.lineStyle(3, 0xFFFFFF, 1);
    ship.beginFill(0x000000);
    ship.moveTo(0,0);
    ship.lineTo(-15, 25);
    ship.lineTo(15, 25);
    ship.lineTo(0, 0);
    ship.endFill();
    ship.x = 125;
    ship.y = 125;
    app.stage.addChild(ship);
    app.ticker.add(() => 
    {
        let dt = 1/app.ticker.FPS;
        if(dt > 1/12) dt = 1/12;
        if(keys[controls.UP])
        {
            if(ship == ship.dy) ship.dy = 150;
        }else
        {
            ship.dx = 0;
            ship.dy = 0;
        }
        ship.x += ship.dx * dt;
        ship.y += ship.dy * dt;
    });
}