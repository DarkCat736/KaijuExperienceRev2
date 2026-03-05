let keyEngine = {
  update: function(playerObject) {
    if (keyIsDown(LEFT_ARROW)) {
      playerObject.moveX(-1);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      playerObject.moveX(1);
    }

    if (keyIsDown(UP_ARROW    )) {
      playerObject.moveY(-50);
    }

    if (keyIsDown(DOWN_ARROW)) {
      playerObject.moveY(1);
    }
  }
};

let gameController = {
  tick: function() {
    image(renderEngine.static_BG, 0, 0, 400, 400);

    playerObject.updatePlusPhysics();
    this.tickNPCs();

    this.checkNPCCollisionsWithPlayer();

    this.cullNPCs();

    this.currentGameSpeed += 0.0001;
  },
  currentGameSpeed: 4,
  cactusObjects: [],
  pterodactylObjects: [],
  init: function() {
    // this.cactusObjects.push(new CactusNPC(4));
    // this.pterodactylObjects.push(new PterodactylNPC(4));

    this.spawnNPC();
  },
  checkNPCCollisionsWithPlayer: function() {
    for (let i = 0; i < this.cactusObjects.length; i++) {
      if (this.cactusObjects[i].collider.checkCollision(playerObject.collider)) {
        console.log("hit cactus");
        lossScreen();
      }
    }

    for (let i = 0; i < this.pterodactylObjects.length; i++) {
      if (this.pterodactylObjects[i].collider.checkCollision(playerObject.collider)) {
        console.log("hit pterodactyl");
      }
    }
  },
  tickNPCs: function() {
    for (let i = 0; i < this.cactusObjects.length; i++) {
      this.cactusObjects[i].tick();
    }

    for (let i = 0; i < this.pterodactylObjects.length; i++) {
      this.pterodactylObjects[i].tick();
    }
  },
  cullNPCs: function() {
    for (let i = 0; i < this.cactusObjects.length; i++) {
      if(this.cactusObjects[i].position.x < -10) {
        this.cactusObjects.splice(i, 1);
        this.spawnNPC();
        //this.cactusObjects.push(new CactusNPC(4));
      }
    }

    for (let i = 0; i < this.pterodactylObjects.length; i++) {
      if(this.pterodactylObjects[i].position.x < -10) {
        this.pterodactylObjects.splice(i, 1);
        //this.pterodactylObjects.push(new PterodactylNPC(4));
      }
    }
  },
  spawnNPC: function() {
    let time = Math.random(1.500, 5.000)
    setTimeout(() => {
      this.cactusObjects.push(new CactusNPC(this.currentGameSpeed));
    }, time)
  },
  reset: function() {
    this.cactusObjects = [];
    this.pterodactylObjects = [];
    this.currentGameSpeed = 4;
  }
};