class Avatar extends PIXI.Graphics{
	constructor(radius=10, color=0xFF0000, x=0, y=0,speed=100){
		super();
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.beginFill(color);
		this.drawCircle(0,0,radius);
		this.endFill();
		
		// other properties
		this.dx = 0; // per second
		this.dy = 0; // per second
	}
	
	update(dt){
		this.x += this.dx * dt;
		this.y += this.dy * dt;
	}
}