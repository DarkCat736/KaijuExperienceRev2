const TIME_STEP = 0.1;
const DRAG_AMOUNT = 50;
const GRAVITY = 98;
const COLLIDER_DEBUGGING = false;

let gameStart = false
async function setup() {
    createCanvas(400, 400);

    background(0);
    fill(255);
    splashScreen();

    noSmooth();

    //await audioEngine.loadAllSounds();

    //audioEngine.sounds.bgMusic.play();


    await playerObject.init(
        "./walk.png",
        5,
        1,
        416,
        {
            size: 100,
            startX: 120,
            startY: 380,
            customRenderFunction: function () {
                this.renderObject.xPos = 120 - 64;
                this.renderObject.yPos = this.position.y - 100;
            }
        }
    );

    await renderEngine.loadStaticImages();
    
    gameController.init();

    splashScreen();
}


function draw() {
    //background(0);
    if(gameStart == true){
        gameController.tick();
    }
    else {
        splashScreen();
    }
    
}

function splashScreen() {
    //fill(83);
    textSize(20);
    textAlign(CENTER, CENTER)
    text("Welcome to Kaiju Experience!", width/2, height/3)
    text("Click UP-Arrow to Start\nUse UP-Arrow to Jump\nUse DOWN-Arrow to Fall" , width/2, height/2 );
    if(keyIsDown(UP_ARROW)){
        gameStart = true;
        gameController.reset();
        gameController.init();
    }
}

function lossScreen() {
    gameStart = false;
    //fill(83);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("You lost.", width/2, height/6);
}