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
      playerObject.moveY(5);
    }
  }
};

let gameController = {
  tick: function() {
    image(renderEngine.static_BG, 0, 0, 400, 400);

    playerObject.updatePlusPhysics();

    this.spawnNPC.tick();

    this.tickNPCs();

    this.checkNPCCollisionsWithPlayer();

    this.cullNPCs();

    this.currentGameSpeed += 0.001;

    this.points += 0.25;
    text("Points: "+Math.ceil(this.points), width/2, height/20);
  },
  currentGameSpeed: 4,
  cactusObjects: [],
  pterodactylObjects: [],
  points: 0,
  init: function() {
    // this.cactusObjects.push(new CactusNPC(4));
    // this.pterodactylObjects.push(new PterodactylNPC(4));
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
        lossScreen();
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
  spawnNPC:  {
    tick: function() {
      this.decideSpawnTime();
      this.ticksSinceLastNPCSpawn++;
      this.ticksSinceLastPterodactylSpawn++;
      this.spawn();
    },
    ticksSinceLastNPCSpawn: 0,
    spawnNPCOnTick: 0,
    decideSpawnTime: function() {
      if (this.ticksSinceLastNPCSpawn == 0) {
        this.spawnNPCOnTick = Math.ceil(random(70, 130));
        console.log("spawn will happen in "+this.spawnNPCOnTick+" ticks.")
      }
    },
    spawn: function() {
      if (this.ticksSinceLastNPCSpawn == this.spawnNPCOnTick) {
        console.log("spawning npc at speed "+gameController.currentGameSpeed);
        if (Math.ceil(random(0.5, 9)) <= 3) {
          gameController.pterodactylObjects.push(new PterodactylNPC(gameController.currentGameSpeed));
        } else {
          gameController.cactusObjects.push(new CactusNPC(gameController.currentGameSpeed));
        }
        this.ticksSinceLastNPCSpawn = 0;
      }
    }
  },
  reset: function() {
    this.cactusObjects = [];
    this.pterodactylObjects = [];
    this.currentGameSpeed = 4;
    this.points = 0;
  }
};