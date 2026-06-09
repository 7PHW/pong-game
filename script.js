// Canvas setup
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game difficulty levels
const difficultyLevels = {
    easy: {
        aiSpeed: 3,
        ballSpeedMultiplier: 0.8,
        label: '简单'
    },
    medium: {
        aiSpeed: 5,
        ballSpeedMultiplier: 1.0,
        label: '中等'
    },
    hard: {
        aiSpeed: 7,
        ballSpeedMultiplier: 1.2,
        label: '困难'
    },
    extreme: {
        aiSpeed: 9,
        ballSpeedMultiplier: 1.5,
        label: '极难'
    }
};

let currentDifficulty = 'medium';

// Game objects dimensions
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;
const basePlayerSpeed = 6;
let computerAISpeed = difficultyLevels[currentDifficulty].aiSpeed;

let gameRunning = false;
let playerScore = 0;
let computerScore = 0;

// Player paddle (RIGHT side)
const player = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dx: 0,
    dy: 0,
    speed: basePlayerSpeed
};

// Computer AI paddle (LEFT side)
const computer = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    speed: computerAISpeed
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 5 * difficultyLevels[currentDifficulty].ballSpeedMultiplier,
    dy: 5 * difficultyLevels[currentDifficulty].ballSpeedMultiplier,
    speed: 5 * difficultyLevels[currentDifficulty].ballSpeedMultiplier
};

// Input handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse tracking for player paddle
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Move paddle towards mouse position (both X and Y)
    player.targetX = mouseX - player.width / 2;
    player.targetY = mouseY - player.height / 2;
});

// Button handlers
document.getElementById('startBtn').addEventListener('click', toggleGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('changeDifficultyBtn').addEventListener('click', changeDifficulty);

// Difficulty selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const difficulty = e.currentTarget.dataset.difficulty;
        selectDifficulty(difficulty);
    });
});

function selectDifficulty(difficulty) {
    currentDifficulty = difficulty;
    computerAISpeed = difficultyLevels[difficulty].aiSpeed;
    
    // Update display
    document.getElementById('difficultyDisplay').textContent = difficultyLevels[difficulty].label;
    document.getElementById('difficultyPanel').style.display = 'none';
    document.getElementById('gamePanel').style.display = 'block';
    
    resetGame();
}

function changeDifficulty() {
    gameRunning = false;
    document.getElementById('startBtn').textContent = 'Start Game';
    document.getElementById('gamePanel').style.display = 'none';
    document.getElementById('difficultyPanel').style.display = 'block';
}

function toggleGame() {
    gameRunning = !gameRunning;
    const btn = document.getElementById('startBtn');
    btn.textContent = gameRunning ? 'Pause Game' : 'Start Game';
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    resetBall();
    gameRunning = false;
    document.getElementById('startBtn').textContent = 'Start Game';
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    const speedMultiplier = difficultyLevels[currentDifficulty].ballSpeedMultiplier;
    ball.speed = 5 * speedMultiplier;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() * 2 - 1) * ball.speed;
}

// Update player paddle position (now on the right, can move in all directions)
function updatePlayer() {
    // Keyboard control - both horizontal and vertical
    const moveX = (keys['ArrowRight'] || keys['d'] || keys['D']) ? 1 : 
                  (keys['ArrowLeft'] || keys['a'] || keys['A']) ? -1 : 0;
    const moveY = (keys['ArrowUp'] || keys['w'] || keys['W']) ? -1 : 
                  (keys['ArrowDown'] || keys['s'] || keys['S']) ? 1 : 0;

    if (moveX !== 0) {
        player.dx = moveX * player.speed;
    } else {
        player.dx = 0;
    }

    if (moveY !== 0) {
        player.dy = moveY * player.speed;
    } else {
        player.dy = 0;
    }

    // Mouse control (smooth following with lerp)
    if (player.targetX !== undefined && player.targetY !== undefined) {
        const diffX = player.targetX - player.x;
        const diffY = player.targetY - player.y;
        
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        
        if (distance > 2) {
            const speed = player.speed;
            player.dx = (diffX / distance) * speed;
            player.dy = (diffY / distance) * speed;
        } else {
            player.dx = 0;
            player.dy = 0;
            player.x = player.targetX;
            player.y = player.targetY;
        }
    }

    player.x += player.dx;
    player.y += player.dy;

    // Boundary collision
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

// Update computer AI paddle (now on the left, follows ball)
function updateComputer() {
    const computerCenterX = computer.x + computer.width / 2;
    const computerCenterY = computer.y + computer.height / 2;
    const ballCenterX = ball.x;
    const ballCenterY = ball.y;

    // AI: follow the ball with some dead zone to make it beatable
    const deadZone = 40 / (computerAISpeed / 5); // Dead zone scales with difficulty
    
    // Vertical movement
    if (computerCenterY < ballCenterY - deadZone) {
        computer.y += computerAISpeed;
    } else if (computerCenterY > ballCenterY + deadZone) {
        computer.y -= computerAISpeed;
    }

    // Horizontal movement (paddle can now move left-right but limited)
    const targetX = ballCenterX - computer.width / 2;
    const moveDistance = Math.min(computerAISpeed * 0.5, Math.abs(targetX - computer.x));
    
    if (targetX > computer.x) {
        computer.x += moveDistance;
    } else if (targetX < computer.x) {
        computer.x -= moveDistance;
    }

    // Boundary collision
    if (computer.x < 0) computer.x = 0;
    if (computer.x + computer.width > canvas.width * 0.3) computer.x = canvas.width * 0.3 - computer.width;
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

// Update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom collision
    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.size, Math.min(canvas.height - ball.size, ball.y));
    }

    // Left and right collision (for side walls, optional)
    if (ball.x - ball.size < 0 || ball.x + ball.size > canvas.width) {
        // Will be handled by paddle collision detection below
    }

    // Computer paddle collision (left side)
    if (
        ball.x - ball.size < computer.x + computer.width &&
        ball.x + ball.size > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = Math.abs(ball.dx); // Ensure ball goes right
        ball.x = computer.x + computer.width + ball.size;
        // Add spin based on where ball hits paddle
        const hitPos = (ball.y - computer.y) / computer.height;
        ball.dy += (hitPos - 0.5) * 6;
    }

    // Player paddle collision (right side)
    if (
        ball.x + ball.size > player.x &&
        ball.x - ball.size < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = -Math.abs(ball.dx); // Ensure ball goes left
        ball.x = player.x - ball.size;
        // Add spin based on where ball hits paddle
        const hitPos = (ball.y - player.y) / player.height;
        ball.dy += (hitPos - 0.5) * 6;
    }

    // Score points
    if (ball.x < 0) {
        playerScore++;
        updateScore();
        resetBall();
    }

    if (ball.x > canvas.width) {
        computerScore++;
        updateScore();
        resetBall();
    }
}

// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('aiScore').textContent = computerScore;
}

// Draw functions
function drawPaddle(paddle, color) {
    ctx.fillStyle = color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Add border
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
    // Add glow effect
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    drawCenterLine();

    // Draw paddles and ball
    drawPaddle(computer, '#667eea'); // AI paddle - left side (blue)
    drawPaddle(player, '#764ba2');   // Player paddle - right side (purple)
    drawBall();
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        updatePlayer();
        updateComputer();
        updateBall();
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
