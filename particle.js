class Particle {
  constructor({startX = 0, startY = 0, mass = 10, xForce = 0, yForce = 0, renderObject = null, renderFunction = null} = {}) {
    this.position = new p5.Vector(startX, startY);
    this.mass = mass;
    this.momentum = new p5.Vector(0, 0);
    this.velocity = new p5.Vector(0, 0);
    this.force = new p5.Vector(xForce, yForce);
    this.physics = new Physics(this);
    this.renderObject = renderObject;
    if (renderFunction != null) {
      this.render = renderFunction;
    }
  }

  render() {
    noStroke();
    //let limitedVel = constrain(this.velocity.mag(), 0, 10);
    //fill(color(180, map(limitedVel, 0, 10, 0, 255, true), 190));
    //circle(this.position.x, this.position.y, 10);
    this.renderObject.xPos = this.position.x;
    this.renderObject.yPos = this.position.y;

  }
}