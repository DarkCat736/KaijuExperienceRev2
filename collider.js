class RectCollider {
    constructor(xOriginOffset, yOriginOffset, colliderWidth, colliderHeight, debug) {
        this.xOriginOffset = xOriginOffset;
        this.yOriginOffset = yOriginOffset;
        this.colliderWidth = colliderWidth;
        this.colliderHeight = colliderHeight;
        this.debug = debug;
    }

    tick(parentPosVector) {
        this.xColliderOrigin = parentPosVector.x + this.xOriginOffset;
        this.yColliderOrigin = parentPosVector.y + this.yOriginOffset;

        this.xNegLimit = this.xColliderOrigin;
        this.xPosLimit = this.xColliderOrigin + this.colliderWidth;
        this.yNegLimit = this.yColliderOrigin;
        this.yPosLimit = this.yColliderOrigin + this.colliderHeight;

        if (this.debug) {
            fill(255);
            rect(this.xColliderOrigin, this.yColliderOrigin, this.colliderWidth, this.colliderHeight);
        }
    }

    checkCollision(otherRectCollider) {
        if ((this.xNegLimit > otherRectCollider.xNegLimit && this.xNegLimit < otherRectCollider.xPosLimit) || (this.xPosLimit > otherRectCollider.xNegLimit && this.xPosLimit < otherRectCollider.xPosLimit)) {
            if ((this.yNegLimit > otherRectCollider.yNegLimit && this.yNegLimit < otherRectCollider.yPosLimit) || (this.yPosLimit > otherRectCollider.yNegLimit && this.yPosLimit < otherRectCollider.yPosLimit)) {
                return true;
            }
        }

        if ((this.yNegLimit > otherRectCollider.yNegLimit && this.yNegLimit < otherRectCollider.yPosLimit) || (this.yPosLimit > otherRectCollider.yNegLimit && this.yPosLimit < otherRectCollider.yPosLimit)) {
            if (this.xNegLimit < otherRectCollider.xNegLimit && this.xPosLimit > otherRectCollider.xPosLimit) {
                return true;
            }
        }

        if ((this.xNegLimit > otherRectCollider.xNegLimit && this.xNegLimit < otherRectCollider.xPosLimit) || (this.xPosLimit > otherRectCollider.xNegLimit && this.xPosLimit < otherRectCollider.xPosLimit)) {
            if (this.yNegLimit < otherRectCollider.yNegLimit && this.yPosLimit > otherRectCollider.yPosLimit) {
                return true;
            }
        }

        return false;
    }
}

//DEPENDS ON POSITION VECTOR ON PARENT OBJECT