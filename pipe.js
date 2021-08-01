const COLOR = 90;
const GAP = 150;
const WIDTH_RECT = 40;
const SPEED = 5;
class Pipe {
    constructor(startingPoint)
    {
        this.position_x = startingPoint;
        this.startingPoint = startingPoint;
        this.length = random(100, height / 2 + 25);
        this.movementSpeed = 5;
    }
    /**
     * Check wether or not a circle on points X,Y with radius RADIUS is inside this pipe.
     * @returns true if it is, false otherwise
     */
    checkCollision(x, y, radius) {
        if (((x - radius >= this.position_x && x - radius <= this.position_x + WIDTH_RECT) || (x + radius >= this.position_x && x + radius <= this.position_x + WIDTH_RECT)) &&
            ((y - radius >= 0 && y - radius <= this.length) || (y + radius >= this.length + GAP && y + radius <= height)))
            return true;
        return false;
        
    }
    hasPassed(x) {
        if (x == this.position_x + WIDTH_RECT) return true;
        return false;
    }
    draw()
    {
        // Mark it as out of scope
        if (this.position_x < - 10 - WIDTH_RECT)
        {
            this.position_x = width;
            this.length = random(100, height / 2 + 50);
            return;
        }

        // Delete the previous rectangle (all of it)
        erase();
        rect(this.position_x + 0.5, 0, WIDTH_RECT - 1, height);
        noErase();
        // background(125);
        
        // Draw the first one
        strokeWeight(0);
        fill(COLOR);
        rect(this.position_x, 0, WIDTH_RECT, this.length);

        // Draw the gap
        fill(125);
        rect(this.position_x, this.length, WIDTH_RECT, GAP);

        // Draw the second one
        fill(COLOR);
        rect(this.position_x, GAP + this.length, WIDTH_RECT, height - this.length - GAP);
        


        // Update position
        this.position_x -=  this.movementSpeed;

    }

    drawStatic()
    {
        // Delete the previous rectangle (all of it)
        erase();
        rect(this.position_x + 0.5, 0, WIDTH_RECT - 1, height);
        noErase();
        // background(125);
        
        // Draw the first one
        strokeWeight(0);
        fill(COLOR);
        rect(this.position_x, 0, WIDTH_RECT, this.length);

        // Draw the gap
        fill(125);
        rect(this.position_x, this.length, WIDTH_RECT, GAP);

        // Draw the second one
        fill(COLOR);
        rect(this.position_x, GAP + this.length, WIDTH_RECT, height - this.length - GAP);
    }
}