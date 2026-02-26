class CactusNPC {
    constructor(moveSpeed) {
        this.speed = moveSpeed;
        this.position = new p5.Vector(410, 365);

        this.collider = new RectCollider(5, 0, 25, 35, true);
    }

    tick() {
        this.position.x -= this.speed;
        this.collider.tick(this.position);

        this.render();
    }

    render() {
        image(
            renderEngine.static_CACTUS,
            this.position.x,
            this.position.y,
            35,
            35
        );
    }
}