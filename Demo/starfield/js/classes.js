class Star extends PIXI.Graphics{
	constructor(radius=10, color=0xFFFFFF, endX=0, endY=0, z=0, zSpeed=.25){
		super();
		this.radius = radius;
		this.color = color;
		this.endX = endX;
		this.endY = endY;
		this.z = z;
		this.zSpeed = zSpeed;
		this.beginFill(this.color);
		this.drawCircle(0,0,this.radius);
		this.endFill();
	}
	
	move(sWidth,sHeight){
		this.x = this.endX / this.z + sWidth;
		this.y = this.endY / this.z + sHeight;
		this.z -= this.zSpeed;
		let scale = 0.75 + (2/this.z);
		this.scale = {x:scale,y:scale};
		this.alpha =  10/this.z;
	//	this.tint = 0xFFFFFF * this.alpha;
	
		if(this.z < 1){
			this.z = sWidth;
			this.endX = getRandom(-sWidth,sWidth);
			this.endY = getRandom(-sHeight,sHeight);
		}
	}
}

// helper function
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
