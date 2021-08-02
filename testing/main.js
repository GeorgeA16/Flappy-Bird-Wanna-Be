// Global constants

function getBackgroundColor()
{
    return color(100, 200, 100, 255);
}

// Global variables

let bird;
let pipes = [];

function setup()
{
    createCanvas(800, 800);
    background(getBackgroundColor());
    frameRate(60);

    // Variable initialization
    bird = new Bird();

    for (i = 0; i < 3; i++)
        pipes[i] = new Pipe(width + i * 300);
}

function mouseClicked()
{
    bird.jump();
}

function draw()
{
    bird.move();
    bird.draw();

    // for (i = 0; i < 3; i++)
    //     pipes[i].draw();
}