class Mover extends PIXI.Graphics{
	constructor(x=0,y=0,radius=24){
		super();
		this.location = new Vec2(x,y);
		this.velocity = new Vec2(0,0);
		this.target = undefined; // will be a Vec2()
		this.acceleration = new Vec2(0,0); // per second
		this.maxspeed = 300; // per second
		
		// PIXI.Graphics stuff
		this.beginFill(0xFF0000);
		this.lineStyle(2,0xFFFFFF,1);
		this.drawCircle(0,0,radius);
		this.endFill();
	}
	
	update(dt){
		if(this.target){
			this.acceleration = Vec2.subtract(this.target,this.position);
			this.acceleration.setMagnitude(12);
			this.velocity.add(this.acceleration.multiply(dt));
			this.velocity.limit(this.maxspeed * dt);
			this.location.add(this.velocity);
		}
	}
	
	draw(){
		// PIXI.DisplayObject properties
		this.x = this.location.x;
		this.y = this.location.y;
	}
}
