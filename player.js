class PlayerObject {
  constructor(spritesheetPath, xCells, yCells, cellSize, {size = 50, moveSize = 100, framesPerCell = 5, renderEngineInputFunction = null} = {}) {
    this.spritesheetPath = spritesheetPath;
    this.xCells = xCells;
    this.yCells = yCells;
    this.cellSize = cellSize;
    this.spriteImages = [];
    this.framesPerCell = framesPerCell;
    this.drawIndex = 0;
    this.xPos = 0;
    this.yPos = 0;
    this.size = size;
    this.moveSize = moveSize;
    this.physicsObject = null;
    this.renderEngineInputFunction = renderEngineInputFunction;
  }

  moveX (direction) {
    //no
    //this.physicsObject.physics.keyboardForce(direction * this.moveSize, 1);
  }

  moveY (direction) {
    if (direction < 1) {
      if (this.physicsObject.position.y < height) {
        return;
      }
      //audioEngine.sounds.jump.play();
    }
    this.physicsObject.physics.keyboardForce(1, direction * this.moveSize);
  }

  update() {
    keyEngine.update(this);
    if (this.renderEngineInputFunction != null) {
      renderEngine.renderSprite(this, this.renderEngineInputFunction);
      return;
    }

    renderEngine.renderSprite(this);
  }

  updatePlusPhysics() {
    this.update();

    //ENVIRONMENTAL FORCES
    this.physicsObject.physics.gravityForce();
    this.physicsObject.physics.airDrag(DRAG_AMOUNT);

    //COLLISION
    this.physicsObject.physics.wallsForce();

    //PROCESSING
    this.physicsObject.physics.calcVelocity();
    this.physicsObject.physics.calcMotion();
    this.physicsObject.render();
  }

  async init(customRenderFunction = null) {
    this.spritesheet = await loadImage(this.spritesheetPath);

    renderEngine.loadSpritesheet(
        this.spritesheet,
        this.xCells,
        this.yCells,
        this.cellSize,
        this.spriteImages
    );

    this.physicsObject = new Particle({
      startX: 120,
      startY: height/2,
      mass: 5,
      renderObject: this,
      renderFunction: function() {
        this.renderObject.xPos = this.position.x - 64;
        this.renderObject.yPos = this.position.y - 100;
      }
    });

    if (customRenderFunction != null) {
      this.physicsObject.render = customRenderFunction;
    }
  }
}

