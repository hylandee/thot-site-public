const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e: KeyboardEvent) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e: KeyboardEvent) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    handleXWallCollision();
    handleYWallCollision();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

function handleXWallCollision() {
    // if ball is colliding with left or right wall.
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx *= -1;
    }
}

function handleYWallCollision() {
    if (shouldBounceOffTop()) {
        dy *= -1;
    } else if (ballIsCollidingWithBottom()) {
        if (ballIsAbovePaddle()) {
            dy *= -1;
        } else {
            alert('GAME OVER');
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }
}

const ballIsCollidingWithBottom = () => y + dy > canvas.height - ballRadius;
const ballIsAbovePaddle = () => x > paddleX && x < paddleX + paddleWidth;
const shouldBounceOffTop = () => y + dy < ballRadius;
const shouldEndGame = () => ballIsCollidingWithBottom() && !ballIsAbovePaddle();

let interval = setInterval(draw, 10);
