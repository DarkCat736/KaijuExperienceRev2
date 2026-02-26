let keyEngine = {
  update: function(playerObject) {
    if (keyIsDown(LEFT_ARROW)) {
      playerObject.moveX(-1);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      playerObject.moveX(1);
    }

    if (keyIsDown(UP_ARROW)) {
      playerObject.moveY(-30);
    }

    if (keyIsDown(DOWN_ARROW)) {
      playerObject.moveY(1);
    }
  }
};