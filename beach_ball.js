/* Authored by Corey Talbert, January 2023 */

// Set up canvas
var canvas = document.getElementById("canvas");
canvas.width = 300;
canvas.height = 300;

// This listener increases the ball's rate of rotation 
// as the cursor moves across it
canvas.addEventListener('mousemove', (event) => { checkMousePos(event) });

// Set up context
const ctx = canvas.getContext("2d", { alpha: false });
ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

// A colorful beach ball that spins
const beach_ball = new Path2D();
beach_ball.arc(0, 0, 50, 0, 2 * Math.PI, false);

// A rainbow gradient painted onto the beach ball
const rainbow_grad = ctx.createConicGradient(0, 0, 0);
rainbow_grad.addColorStop(0, "red");
rainbow_grad.addColorStop(.1, "orangered");
rainbow_grad.addColorStop(.2, "orange");
rainbow_grad.addColorStop(.3, "yellow");
rainbow_grad.addColorStop(.4, "greenyellow");
rainbow_grad.addColorStop(.5, "green");
rainbow_grad.addColorStop(.6, "blue");
rainbow_grad.addColorStop(.7, "blueviolet");
rainbow_grad.addColorStop(.8, "violet");
rainbow_grad.addColorStop(.9, "mediumvioletred");
rainbow_grad.addColorStop(1, "red");

// A circle the same dimensions as the beach ball on which the mask is painted
const mask_circle = new Path2D();
mask_circle.arc(0, 0, 50, 0, 2 * Math.PI, false);

// A circular alpha mask with a white edge that goes over the beach ball
const mask_grad = ctx.createRadialGradient(0, 0, 20, 0, 0, 50);
mask_grad.addColorStop(0, "transparent");
mask_grad.addColorStop(1, "rgba(255, 255, 255, .4)");

// Stroboscopic effect at high spin rates
const MIN_SPIN_RATE = .03 * Math.PI;
const MAX_SPIN_RATE = Math.PI;
// The amount to rotate the ball each animation frame
var spin_rate = MIN_SPIN_RATE;

function checkMousePos(event) {
    const bound = canvas.getBoundingClientRect();
    const x = event.x - bound.x;
    const y = event.y - bound.y;
    if ( ctx.isPointInPath( beach_ball, x, y ) )
        faster();
    else
        slower();
}

function faster() {
    spin_rate += .01;
}

function slower() {
    spin_rate /= 1.1;
}

function draw() {
    ctx.clearRect(-150, -150, ctx.canvas.width, ctx.canvas.height);
    // A fiery corona, as if the beach ball is eclipsing the sun
    ctx.shadowColor = "orangered";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 50;
    // Draw the ball
    ctx.filter = "blur(1px)";
    ctx.fillStyle = rainbow_grad;
    ctx.fill(beach_ball);
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.stroke(beach_ball);
    // Draw the mask
    ctx.filter = "blur(2px)";
    ctx.fillStyle = mask_grad;
    ctx.fill(mask_circle);
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.stroke(mask_circle);
}

function spin() {
    ctx.rotate(spin_rate);
    draw();
    requestAnimationFrame(spin);
}
