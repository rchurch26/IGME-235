class Vec2{
	constructor(x=0,y=0){
		this.x = x;
		this.y = y;
	}
	
	// Instance Methods
	// we are returning `this` to enable method chaining
	add(v){
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	
	subtract(v){
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}
	
	multiply(n){
		this.x *= n;
		this.y *= n;
		return this;
 	}
 	
 	divide(n){
		this.x /= n;
		this.y /= n;
		return this;
 	}
	
	normalize(){
		let m = this.magnitude();
		if (m == 0){
			this.x = 0;
			this.y = 1;
		}else{
			this.divide(m);
		}
		return this;
	}
	
	limit(max){
		if(this.magnitude() * this.magnitude() > max * max){
		  this.setMagnitude(max);
		}
		return this;
	}
	
	setMagnitude(n){
	  this.normalize();
	  this.multiply(n);
	  return this;
	}
	
	copy(){
		return new Vec2(this.x,this.y);
	}
	
	heading(){
		//TODO
	}

	rotate(n){
		//TODO
	}
	
	lerp(v){
		//TODO
	}
	
	magnitude(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	
	length(){
		return this.magnitude();
	}
	
	// Class Methods
	static add(v0,v1){
		return new Vec2(v0.x + v1.x, v0.y + v1.y);
	}
	
	static subtract(v0,v1){
		return new Vec2(v0.x - v1.x, v0.y - v1.y);
	}

	static multiply(v,n){
		return new Vec2(v.x * n, v.y * n);
	}
	
	static divide(v,n){
		return new Vec2(v.x / n, v.y / n);
	}
	
	static normalized(v){
		return v.copy().normalize();
	}
	
	static random(){
		return new Vec2(Math.random(), Math.random()).normalize();
	}
	
	static lerped(v0,v1){
		//TODO
	}

	static distanceBetween(v0,v1){
		//TODO
	}
	
	static angleBetween(v0,v1){
		//TODO
	}

	static dot(){
		//TODO
	}

}