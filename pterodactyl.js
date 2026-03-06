class PterodactylNPC {
    constructor(moveSpeed) {
        this.speed = moveSpeed;
        this.position = new p5.Vector(410, 320);

        this.collider = new RectCollider(0, 0, 32, 25, COLLIDER_DEBUGGING);

        this.xCells = 3;
        this.yCells = 3;
        this.cellSize = 52;
        this.drawIndex = 0;
        this.size = 30;
        this.spriteImages = [];
        this.framesPerCell = 5;

        renderEngine.loadSpritesheet(
            renderEngine.static_PTERODACTYL,
            this.xCells,
            this.yCells,
            this.cellSize,
            this.spriteImages
        );
    }

    tick() {
        this.position.x -= this.speed;
        this.collider.tick(this.position);

        this.xPos = this.position.x;
        this.yPos = this.position.y;

        this.render();
    }

    render() {
        renderEngine.renderSprite(this);
    }
}