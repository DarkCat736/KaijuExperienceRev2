let playerObject = {
  init: async function(spritesheetPath, xCells, yCells, cellSize, {size = 50, moveSize = 100, framesPerCell = 5, renderEngineInputFunction = null, customRenderFunction = null, startX = 0, startY = 0, mass = 5} = {}) {
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
    this.jumpEnable = true;

    this.spritesheet = await loadImage(this.spritesheetPath);

    renderEngine.loadSpritesheet(
        this.spritesheet,
        this.xCells,
        this.yCells,
        this.cellSize,
        this.spriteImages
    );

    this.physicsObject = new Particle({
      startX: startX,
      startY: startY,
      mass: mass,
      renderObject: this,
      renderFunction: function() {
        this.renderObject.xPos = this.position.x - 64;
        this.renderObject.yPos = this.position.y - 100;
      }
    });

    this.collider = new RectCollider(10, 50, 70, 50, true);

    if (customRenderFunction != null) {
      this.physicsObject.render = customRenderFunction;
    }
  },
  moveX: function(direction) {
    //no
    //this.physicsObject.physics.keyboardForce(direction * this.moveSize, 1);
  },
  moveY: function(direction) {
    if (direction < 1) {
      if (this.physicsObject.position.y >= height) {
        this.jumpEnable = true;
      }

      if (!this.jumpEnable) {
        return;
      }
      //audioEngine.sounds.jump.play();
    }
    this.physicsObject.physics.keyboardForce(1, direction * this.moveSize);
    if (direction < 1) {
      this.jumpEnable = false;
    }

  },
  update: function() {
    this.collider.tick(new p5.Vector(this.xPos, this.yPos));

    keyEngine.update(this);
    if (this.renderEngineInputFunction != null) {
      renderEngine.renderSprite(this, this.renderEngineInputFunction);
      return;
    }

    renderEngine.renderSprite(this);
  },
  updatePlusPhysics: function() {
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
}

