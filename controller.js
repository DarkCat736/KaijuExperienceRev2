let keyEngine = {
  update: function(playerObject) {
    if (keyIsDown(LEFT_ARROW)) {
      playerObject.moveX(-1);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      playerObject.moveX(1);
    }

    if (keyIsDown(UP_ARROW)) {
      playerObject.moveY(-50);
    }

    if (keyIsDown(DOWN_ARROW)) {
      playerObject.moveY(1);
    }
  }
};

let gameController = {
  tick: function() {
    playerObject.updatePlusPhysics();
    this.tickNPCs();

    this.checkNPCCollisionsWithPlayer();

    this.cullNPCs();
  },
  cactusObjects: [],
  init: function() {
    this.cactusObjects.push(new CactusNPC(4));
  },
  checkNPCCollisionsWithPlayer: function() {
    for (let i = 0; i < this.cactusObjects.length; i++) {
      if (this.cactusObjects[i].collider.checkCollision(playerObject.collider)) {
        console.log("hit");
      }
    }
  },
  tickNPCs: function() {
    for (let i = 0; i < this.cactusObjects.length; i++) {
      this.cactusObjects[i].tick();
    }
  },
  cullNPCs: function() {
    for (let i = 0; i < this.cactusObjects.length; i++) {
      if(this.cactusObjects[i].position.x < -10) {
        this.cactusObjects.splice(i, 1);
        this.cactusObjects.push(new CactusNPC(4));
      }
    }
  }
};