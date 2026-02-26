const TIME_STEP = 0.1;
const DRAG_AMOUNT = 10;
const GRAVITY = 98;

async function setup() {
    createCanvas(400, 400);

    background(255);
    fill(0);
    text("Kaiju Experience - Please wait... Loading resources.", 50, 100);

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
            startY: height / 2,
            customRenderFunction: function () {
                this.renderObject.xPos = 120 - 64;
                this.renderObject.yPos = this.position.y - 100;
            }
        }
    );

    await renderEngine.loadStaticImages();
    gameController.init();

}


function draw() {
    background(0);
    gameController.tick();
}