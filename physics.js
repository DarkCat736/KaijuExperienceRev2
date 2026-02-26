class Physics {
  constructor(particle) {
    this.particle = particle;
    this.groundHitLastFrame = false;
  }

  gravityForce() {
    this.particle.force.add(new p5.Vector(0, GRAVITY));
  }

  keyboardForce(x, y) {
    this.particle.force.add(p5.Vector.mult(new p5.Vector(x, y)));
  }

  wallsForce() {
    if (this.particle.position.y >= height) {
      this.particle.force.y += -this.particle.momentum.y - GRAVITY;
      this.particle.force.y += -(this.particle.position.y - height) * 500;
      if (this.particle.velocity.y > 0.5) {
        //audioEngine.sounds.groundHit.play();
      }
    }

    if (this.particle.position.y <= 0) {
      this.particle.force.y += -this.particle.momentum.y - GRAVITY;
      this.particle.force.y += -(this.particle.position.y - 0) * 500;
    }

    if (this.particle.position.x >= width) {
      this.particle.force.x += -this.particle.momentum.x - GRAVITY;
      this.particle.force.x += -(this.particle.position.x - width) * 500;
    }

    if (this.particle.position.x <= 0) {
      this.particle.force.x += -this.particle.momentum.x - GRAVITY;
      this.particle.force.x += -(this.particle.position.x - 0) * 500;
    }
  }

  airDrag(mag = 10) {
    this.particle.force.add(new p5.Vector(-this.particle.velocity.x*mag, -this.particle.velocity.y*mag));
  }

  calcVelocity() {
    //console.log(this.particle.velocity.x, this.particle.force.y);
    let deltaMomentum = p5.Vector.mult(this.particle.force, TIME_STEP);
    this.particle.momentum.add(deltaMomentum);
    this.particle.velocity = p5.Vector.div(this.particle.momentum, this.particle.mass);
  }

  calcMotion() {
    this.particle.position.add(this.particle.velocity.mult(TIME_STEP));
    this.particle.force.mult(0);
    //console.log(this.particle.velocity);
  }
}