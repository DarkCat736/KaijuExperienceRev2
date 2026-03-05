let renderEngine = {
  getDrawIndex: function(renderObject) {
    if (frameCount % renderObject.framesPerCell == 0) {
      if (renderObject.drawIndex >= (renderObject.xCells * renderObject.yCells) - 1) {
        renderObject.drawIndex = 0;
      } else {
        renderObject.drawIndex += 1;
      }
    }
  },
  renderSprite: function(renderObject, renderFunction = null) {
    this.getDrawIndex(renderObject);

    if (renderFunction != null) {
      renderFunction(renderObject);
      return;
    }

    image(
        renderObject.spriteImages[renderObject.drawIndex],
        renderObject.xPos,
        renderObject.yPos,
        renderObject.size,
        renderObject.size
    );
  },
  loadSpritesheet: function(spritesheet, xCells, yCells, cellSize, exportArray) {
    let x, y;
    for (y = 0; y < yCells; y++) {
      for (x = 0; x < xCells; x++) {
        exportArray.push(
            spritesheet.get(
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize
            )
        );
      }
    }
  },
  staticImages: [],
  loadStaticImages: async function() {
    //CACTUS
    this.staticImages.push(await loadImage("./cactus.png"));
    this.static_CACTUS = this.staticImages[0];

    this.staticImages.push(await loadImage("./media/pterodactyl.png"));
    this.static_PTERODACTYL = this.staticImages[1];

    this.staticImages.push(await loadImage("./media/bg.png"));
    this.static_BG = this.staticImages[2];
  }
};