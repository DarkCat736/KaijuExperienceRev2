const TIME_STEP = 0.1;
const DRAG_AMOUNT = 10;
const GRAVITY = 98;

let player = new PlayerObject("./walk.png", 5, 1, 416, {size: 100});

async function setup() {
    createCanvas(400, 400);

    background(255);
    fill(0);
    text("Kaiju Experience - Please wait... Loading resources.", 50, 100);

    noSmooth();

    //await audioEngine.loadAllSounds();

    //audioEngine.sounds.bgMusic.play();


    await player.init(
        function() {
            this.renderObject.xPos = 120 - 64;
            this.renderObject.yPos = this.position.y - 100;
        }
    );

}


function draw() {
    background(0);
    player.updatePlusPhysics();
}