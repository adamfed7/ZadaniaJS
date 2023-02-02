const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let numBalls = document.getElementById('numBalls').value;
let minDist = document.getElementById('minDist').value;
let balls = [];

class Ball {
    constructor(x, y, radius, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    draw() {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.xSpeed = -this.xSpeed;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.ySpeed = -this.ySpeed;
        }
        this.draw();
    }
}

function createBalls() {
    for (let i = 0; i < numBalls; i++) {
        let radius = (Math.random()*25)+5;
        let x = Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
        let y = Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;
        
        let xSpeed = Math.random() * 2;
        let ySpeed = Math.random() * 2;
        balls.push(new Ball(x, y, radius, xSpeed, ySpeed));
    }
}

function drawLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let distance = Math.sqrt(
                (balls[i].x - balls[j].x) ** 2 + (balls[i].y - balls[j].y) ** 2
            );
            if (distance < minDist) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
    }
    drawLines();
    requestAnimationFrame(animate);
}

document.getElementById('startBtn').addEventListener('click', function () {
    numBalls = document.getElementById('numBalls').value;
    minDist = document.getElementById('minDist').value;
    createBalls();
    animate();
});

document.getElementById('resetBtn').addEventListener('click', function () {
    location.reload();
});