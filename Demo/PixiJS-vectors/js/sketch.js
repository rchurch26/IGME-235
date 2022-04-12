
let movers = [];

function setup(){
	for (let i = 0; i < 20; i++) {
		let m = new Mover(Math.random() * stageWidth, Math.random() * stageHeight);
		m.target = new Vec2(400,400);
     	movers.push(m);
		app.stage.addChild(m);
  	}
	app.ticker.add(update);
}

function update(){
		// #1 - Calculate "delta time"
		let dt = 1/app.ticker.FPS;
		if (dt > 1/12) dt=1/12;
		
		// #2 - Get Mouse Position
		let mousePosition = app.renderer.plugins.interaction.mouse.global;
		let mouseVector = new Vec2(mousePosition.x,mousePosition.y);

		// #3 - Move and draw the movers
		for (let m of movers){
			m.target = mouseVector;
			m.update(dt);
			m.draw();
		}
}



