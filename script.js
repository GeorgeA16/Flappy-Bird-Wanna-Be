const LEFT_DISTANCE = 150;
const GRAVITY_MULTIPLIER = 1.5;
const RADIUS = 15;

const JUMPING_SPEED = 5;

let y;
let velocity;
let speed;
let score;
let pipes = [];
let isGameOver;
let gameStarted;

function setup() {
    createCanvas(800,600);
    background(255);
    frameRate(60);
    init();
} 
function init() {
    
    gameStarted = false;
    isGameOver = false;
    y = height / 2;
    velocity = -5;
    speed = 2;
    

    for (i = 0; i < 3; i++)
        pipes[i] = new Pipe(width + i * 300);

    score = 0;
}

function mouseClicked(){
    if (!gameStarted) {
        gameStarted = true;
        return;
    }
    if (isGameOver)
    {
        init();
        return;
    }
    if (y == RADIUS)
        return;
    velocity = 7;
    speed = 5;
    
}

/** 
 * Called when the game is over.
 * Displays a message and a restart button (TODO).
*/
function gameOver()
{
    // console.log("Game over!");
    isGameOver = true;
    // console.log("Score: " + score);

    fill(0);
    noStroke();
    text("GAME OVER!", width / 2 - 100, height / 2);
    text("PRESS CLICK TO START AGAIN!", width / 2 - 200, height / 2 + 100);
}

function drawBird()
{
    // strokeWeight(1);
    // stroke(125);
    // fill(125);
    erase();
    circle(LEFT_DISTANCE, y, 2 * RADIUS);
    noErase();
    y = y - GRAVITY_MULTIPLIER * velocity;
    if (y + RADIUS >= height) // lower bound
    {
        y = height - RADIUS;
        gameOver();
    }
    else if (y - RADIUS <= 0) // Upper bound
    {
        y = RADIUS;
    }
    // console.log(y);
    stroke(255);
    strokeWeight(1);
    fill(0);
    circle(LEFT_DISTANCE, y, RADIUS * 2);
}

function drawBirdStatic()
{
    stroke(255);
    strokeWeight(1);
    fill(0);
    circle(LEFT_DISTANCE, y, RADIUS * 2);
}
function displayScore()
{
    noStroke();
    textSize(25);
    textStyle(ITALIC);
    text('Score: ' + score, width-150, 50);
    

}

function draw(){
    
    if (isGameOver)
    {

        // if (y < height - RADIUS)
        // {
        //     //background(125);

        //     stroke(125);
        //     strokeWeight(1);
        //     fill(125);
        //     circle(LEFT_DISTANCE, y, 2 * RADIUS);
            

        //     y = y + 10; 
        //     stroke(255);
        //     strokeWeight(1);
        //     fill(0);
        //     circle(LEFT_DISTANCE, y, RADIUS * 2);
        // }
        return;
    }
    background(125);

    if (!gameStarted)
    {
        // Text drawing
        text("PRESS CLICK TO START!", width / 2 - 40, height / 2 + 10);
        // Bird drawing
        drawBirdStatic();
        // Score drawing
        displayScore();
        return;
    }

    // Pipe drawing
    for (i = 0; i < 3; i++)
        pipes[i].draw();
    // Bird drawing
    drawBird();
    // Score drawing
    displayScore();

    // Speed update
    if (velocity != -5)
        velocity -= 0.5;

    // Score update
    for (i = 0; i < 3; i++)
    {
        if (pipes[i].hasPassed(LEFT_DISTANCE)) score++;
    }
 
    // Checks if the game is over or not 
    for (i = 0; i < 3; i++) {
        if ( pipes[i].checkCollision(LEFT_DISTANCE, y, RADIUS - 1))
            gameOver();
    }
}

