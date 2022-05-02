"use strict";
const app = new PIXI.Application(600, 600);
document.body.appendChild(app.view);
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
app.loader.add(
    [
        "images/ship.png",
        "images/large/a10000.png",
        "images/medium/a10000.png",
        "images/small/a10000.png"
    ]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();
let stage;

// game variables
let startScene;
let gameScene,ship,scoreLabel,lifeLabel,shootSound,hitSound;
let gameOverScene;
let gameOverScoreLabel;

let largeAsteroids = [];
let mediumAsteroids = [];
let smallAsteroids = [];
let bullets = [];
let alienShip;
let score = 0;
let life = 3;
let time = 5;
let paused = true;

function setup() {
	stage = app.stage;
	// #1 - Create the `start` scene
	startScene = new PIXI.Container();
    stage.addChild(startScene);

	// #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

	// #3 - Create the `gameOver` scene and make it invisible
	gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

	// #4 - Create labels for all 3 scenes
	createLabelsAndButtons();
	// #5 - Create ship
	ship = new Ship();
    gameScene.addChild(ship);

	// #6 - Load Sounds
    shootSound = new Howl(
        {
        src: ['audio/laser-blast.mp3']
        });

    hitSound = new Howl(
        {
        src: ['audio/hit-sound.mp3']
        });
		
	// #8 - Start update loop
    app.ticker.add(gameLoop);

    //Shoot
    app.view.onclick = fireBullet;
}

//createLabelsAndButtons Function
function createLabelsAndButtons()
{
    let buttonStyle = new PIXI.TextStyle(
        {
            fill: 0x000000,
            fontSize: 48,
            fontFamily: "Futura",
            stroke: 0xFFFFFF,
            strokeThickness: 2
        });
    //Set up startScene
    let startLabel1 = new PIXI.Text("Asteroids");
    startLabel1.style = new PIXI.TextStyle(
        {
            fill: 0x000000,
            fontSize: 96,
            fontFamily: "Futura",
            stroke: 0xFFFFFF,
            strokeThickness: 2
        });
    startLabel1.x = sceneWidth / 4;
    startLabel1.y = 120;
    startScene.addChild(startLabel1);
    //Start Game Button
    let startButton = new PIXI.Text("Click to Play");
    startButton.style = buttonStyle;
    startButton.x = sceneWidth / 4;
    startButton.y = sceneHeight - 80;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame);
    startButton.on("pointerover", e => e.target.alpha = 0.7);
    startButton.on("pointerup", e => e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);
    //Set up gameScene
    let textStyle = new PIXI.TextStyle(
        {
            fill: 0xFFFFFF,
            fontSize: 18,
            fontFamily: "Futura"
        });
    //Make score label
    scoreLabel = new PIXI.Text();
    scoreLabel.style = textStyle;
    scoreLabel.x = 5;
    scoreLabel.y = 5;
    gameScene.addChild(scoreLabel);
    increaseScoreBy(0);
    //Make Life Label
    lifeLabel = new PIXI.Text();
    lifeLabel.style = textStyle;
    lifeLabel.x = 5;
    lifeLabel.y = 26;
    gameScene.addChild(lifeLabel);
    decreaseLifeBy(0);
//set up `gameOverScene`
//make game over text
let gameOverText = new PIXI.Text("Game Over!");
textStyle = new PIXI.TextStyle({
	fill: 0x000000,
	fontSize: 64,
	fontFamily: "Futura",
	stroke: 0xFFFFFF,
	strokeThickness: 3
});
gameOverText.style = textStyle;
gameOverText.x = 100;
gameOverText.y = sceneHeight/2 - 160;
gameOverScene.addChild(gameOverText);

//show final score
gameOverScoreLabel = new PIXI.Text();
textStyle = new PIXI.TextStyle({
	fill: 0x000000,
	fontSize: 32,
	fontFamily: "Futura",
	stroke: 0xFFFFFF,
	strokeThickness: 3
});
gameOverScoreLabel.style = textStyle;
gameOverScoreLabel.x = 200;
gameOverScoreLabel.y = sceneHeight/2;
gameOverScene.addChild(gameOverScoreLabel);

//make "play again?" button
let playAgainButton = new PIXI.Text("Play Again?");
playAgainButton.style = buttonStyle;
playAgainButton.x = 200;
playAgainButton.y = sceneHeight - 100;
playAgainButton.interactive = true;
playAgainButton.buttonMode = true;
playAgainButton.on("pointerup", startGame); // startGame is a function reference
playAgainButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
playAgainButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
gameOverScene.addChild(playAgainButton);
}

//increaseScoreBy Function
function increaseScoreBy(value)
{
    score += value;
    scoreLabel.text = `Score ${score}`;
}

//decreaseLifeBy Function
function decreaseLifeBy(value)
{
    life -= value;
    life = parseInt(life);
    lifeLabel.text = `Life    ${life}`;
}

//gameLoop
function gameLoop()
{
    //if(paused) return;

	let dt = 1/app.ticker.FPS;
    if(dt > 1/12) dt = 1/12;
    //Ship Movement
    if(keys[controls.UP])
    {
        ship.x = ship.x + 1.5 * Math.cos(ship.rotation);
        ship.y = ship.y + 1.5 * Math.sin(ship.rotation);
    }
    if(keys[controls.RIGHT])
    {
        ship.rotation += 0.05;
    }
    if(keys[controls.LEFT])
    {
        ship.rotation += -0.05;
    }
    if(ship.x > sceneWidth)
    {
        ship.x = 0;
    }
    if(ship.x < 0)
    {
        ship.x = sceneWidth;
    }
    if(ship.y > sceneHeight)
    {
        ship.y = 0;
    }
    if(ship.y < 0)
    {
        ship.y = sceneHeight;
    }
    //Asteroid Movement
    for(let la of largeAsteroids)
    {
        la.move();
    }
    for(let ma of mediumAsteroids)
    {
        ma.move();
    }
    for(let sa of smallAsteroids)
    {
        sa.move();
    }
    time--;
    if(time == 0)
    {
        loadAsteroids();
        time = 5;
    }

    //Shooting
    for(let b of bullets)
    {
        b.move(dt);
    }
    //Collisions
	for(let la of largeAsteroids)
    {
        for(let b of bullets)
        {
            if(rectsIntersect(la, b))
            {
                gameScene.removeChild(la);
                la.isAlive = false;
                gameScene.removeChild(b);
                b.isAlive = false;
                increaseScoreBy(10);
                createMediumAsteroids(la.x - 5, la.y);
                createMediumAsteroids(la.x + 5, la.y);
            }
            if(b.y > sceneHeight || b.y < 0 || b.x > sceneWidth || b.x < 0) b.isAlive = false;
        }
        if(la.isAlive && rectsIntersect(la, ship))
        {
            hitSound.play();
            decreaseLifeBy(1);
            gameScene.removeChild(ship);
            resetShip();
        }
    }
    for(let ma of mediumAsteroids)
    {
        for(let b of bullets)
        {
            if(rectsIntersect(ma, b))
            {
                gameScene.removeChild(ma);
                ma.isAlive = false;
                gameScene.removeChild(b);
                b.isAlive = false;
                increaseScoreBy(20);
                createSmallAsteroids(ma.x - 5, ma.y);
                createSmallAsteroids(ma.x + 5, ma.y);
            }
            if(b.y > sceneHeight || b.y < 0 || b.x > sceneWidth || b.x < 0) b.isAlive = false;
        }
        if(ma.isAlive && rectsIntersect(ma, ship))
        {
            hitSound.play();
            decreaseLifeBy(1);
            gameScene.removeChild(ship);
            resetShip();
        }
    }
    for(let sa of smallAsteroids)
    {
        for(let b of bullets)
        {
            if(rectsIntersect(sa, b))
            {
                gameScene.removeChild(sa);
                sa.isAlive = false;
                gameScene.removeChild(b);
                b.isAlive = false;
                increaseScoreBy(30);
            }
            if(b.y > sceneHeight || b.y < 0 || b.x > sceneWidth || b.x < 0) b.isAlive = false;
        }
        if(sa.isAlive && rectsIntersect(sa, ship))
        {
            hitSound.play();
            gameScene.removeChild(sa);
            sa.isAlive = false;
            decreaseLifeBy(1);
            gameScene.removeChild(ship);
            resetShip();
        }
    }
	//remove bullets
    //bullets = bullets.filter(b => b.isAlive);
    //remove asteroids
    largeAsteroids = largeAsteroids.filter(la => la.isAlive);
    mediumAsteroids = mediumAsteroids.filter(ma => ma.isAlive);
    smallAsteroids = smallAsteroids.filter(sa => sa.isAlive);

	if(life <= 0)
    {
        end();
        return;
    }
}

//resetShip Function
function resetShip()
{
    ship.position.set(sceneWidth / 2, sceneHeight / 2);
    gameScene.addChild(ship);
}

//createLargeAsteroids Function
function createLargeAsteroids()
{
    let la = new LargeAsteroid();
    la.x = Math.random() * ((sceneWidth - 25) + sceneWidth) - sceneWidth;
    la.y = Math.random() * ((sceneHeight - 25) + sceneHeight) + sceneHeight;
    largeAsteroids.push(la);
    gameScene.addChild(la);
}
//createMediumAsteroids Function
function createMediumAsteroids()
{
    let ma = new MediumAsteroid();
    ma.x = Math.random() * ((sceneWidth - 25) + sceneWidth) - sceneWidth;
    ma.y = Math.random() * ((sceneHeight - 25) + sceneHeight) + sceneHeight;
    mediumAsteroids.push(ma);
    gameScene.addChild(ma);
}
//createSmallAsteroids Function
function createSmallAsteroids()
{
    let sa = new SmallAsteroid();
    sa.x = Math.random() * ((sceneWidth - 25) + sceneWidth) - sceneWidth;
    sa.y = Math.random() * ((sceneHeight - 25) + sceneHeight) + sceneHeight;
    smallAsteroids.push(sa);
    gameScene.addChild(sa);
}
//loadAsteroids Function
function loadAsteroids()
{
    if(life > 0)
    {
        let num = Math.random();
        if(num <= 0.3)
        {
            createLargeAsteroids();
        }
        if(num > 0.3 && num <= 0.6)
        {
            createMediumAsteroids();
        }
        if(num > 0.6 && num <= 1)
        {
            createSmallAsteroids();
        }
    }
    paused = false;
}

//fireBullet Function
function fireBullet(e)
{
    //if(paused) return;
    let b = new Bullet(0xFFFFFF, ship.x, ship.y, ship);
    bullets.push(b);
    gameScene.addChild(b);
    shootSound.play();
}

//startGame Function
function startGame()
{
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;
    ship.position.set(sceneWidth / 2, sceneHeight / 2);
}

//end Function
function end()
{
    paused = true;
    largeAsteroids.forEach(la => gameScene.removeChild(la));
    largeAsteroids = [];
    mediumAsteroids.forEach(ma => gameScene.removeChild(ma));
    mediumAsteroids = [];
    smallAsteroids.forEach(sa => gameScene.removeChild(sa));
    smallAsteroids = [];
    bullets.forEach(b => gameScene.removeChild(b));
    bullets = [];
    gameOverScoreLabel.text = `Your final score: ${score}`;
    gameOverScene.visible = true;
    gameScene.visible = false;
}