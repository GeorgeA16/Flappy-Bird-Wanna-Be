const MAXIMUM_VELOCITY = 15;

// Distance from the left border to the bird's center
const BIRD_DISTANCE = 120;

const DOWN_FORCE = 0.01;

class Bird {
    
    constructor() 
    {
        this.velocity = 2;
        this.isJumping = false;

        // The last position of the bird
        this.lastX = -1;
        this.lastY = -1;

        // The current position of the bird
        this.currentX = BIRD_DISTANCE;
        this.currentY = height / 2;

        // Bird size (diameter)
        this.size = 25;
    }

    /**
     * Getter for the bird's color.
     * @returns the bird's color
     */
    getColor()
    {
        return color(50, 50, 250, 255);
    }

    /**
     * Getter for the trail color.
     * @returns the trail color
     */
    getTrailColor()
    {
        return color(200, 40, 60, 150);
    }

    /** 
     * Tells whether or not the bird touches the lower margin.
     * @returns true if it is, false otherwise.
     */
    isOnLowerMargin() 
    {
        return this.currentY + this.size / 2 >= height;
    }

    /** 
     * Tells whether or not the bird touches the upper margin.
     * @returns true if it is, false otherwise.
     */
    isOnUpperMargin()
    {
        return this.currentY - this.size / 2 <= 0;
    }

    /**
     * Called when the jump button is pressed. Initiates the jumping animation.
     */
    jump()
    {
        this.isJumping = true;
        this.jumpingIntensity = 10;
    }

    /**
     * Calculates the next position based on the current state of events (whether the bird is jumping or not).
     */
    move()
    {
        this.lastX = this.currentX;
        this.lastY = this.currentY;

        if (this.isJumping)
        {
            this.currentY -= this.jumpingIntensity;
            this.jumpingIntensity -= 0.7;
            if (this.jumpingIntensity <= 0)
            {
                this.isJumping = false;
                this.velocity = 1;
            }
        }
        else 
        {
            this.currentY += this.velocity;
        }

        if (this.velocity < MAXIMUM_VELOCITY)
            this.velocity += 0.4;
        else
            this.velocity = MAXIMUM_VELOCITY;

        if (this.isOnLowerMargin())
            this.currentY = height - this.size / 2;
        else if (this.isOnUpperMargin())
            this.currentY = this.size / 2;
    }

    /**
     * Draws the object at the specified position.
     */ 
    draw()
    {
        noStroke();
        // Erase the last position of the trail and main circle
        fill(getBackgroundColor());
        if (this.isJumping)
        {
            circle(this.lastX, this.lastY + 14, this.size + 2);
            circle(this.lastX, this.lastY + 8, this.size + 2);
        }
        else
        {
            circle(this.lastX, this.lastY - 14, this.size + 2);
            circle(this.lastX, this.lastY - 8, this.size + 2);
        }
        circle(this.lastX, this.lastY, this.size + 2);

        // Draw the trail line
        fill(this.getTrailColor());
        if (this.isJumping)  
        {
            circle(this.currentX, this.currentY + 14, this.size * 50 / 100);
            circle(this.currentX, this.currentY + 8, this.size * 75 / 100);
        }
        else
        {
            circle(this.currentX, this.currentY - 14, this.size * 50 / 100);
            circle(this.currentX, this.currentY - 8, this.size * 75 / 100);
        }

        // Draw the bird at the new position
        fill(this.getColor());
        circle(this.currentX, this.currentY, this.size);
    }
    
}