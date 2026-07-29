const board = document.querySelector('.board');
const a = 50;
const btn = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const gameOverModal = document.querySelector('.game_over');
const startGamemodal = document.querySelector('.start_game');
const restartBtn = document.querySelector('.game_over .btn');

// Matches your updated HTML IDs exactly
const highScoreElement = document.getElementById('High_Score');
const scoreElement = document.getElementById('Score');
const timeElement = document.getElementById('Time');

const cols = Math.floor(board.clientWidth / a) || 12;
const rows = Math.floor(board.clientHeight / a) || 12;

let intervalId = null;
let timerIntervalId = null;
let lastDirection = 'down';
// let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

// State Variables
let highScoreVal = parseInt(localStorage.getItem("highScore")) || 0;
let CurrentScore = 0;
let Spendtime = "00:00";
let elapsedSeconds = 0;

// Initialize high score display
if (highScoreElement) highScoreElement.innerText = highScoreVal;

const blocks = [];
let snake = [
    { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }
];
let direction = 'down';

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}
let food = generateFood(); // Initialize food position
// Create Grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row},${col}`] = block;
    }
}

function render() {
    snake.forEach((segment) => {
        const block = blocks[`${segment.x},${segment.y}`];
        if (block) block.classList.add('fill');
    });
    const foodBlock = blocks[`${food.x},${food.y}`];
    if (foodBlock) foodBlock.classList.add('food');
}

// Timer counting logic
function startTimer() {
    if (timerIntervalId) clearInterval(timerIntervalId);
    elapsedSeconds = 0;
    Spendtime = "00:00";
    if (timeElement) timeElement.innerText = Spendtime;

    timerIntervalId = setInterval(() => {
        elapsedSeconds++;
        const mins = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (elapsedSeconds % 60).toString().padStart(2, '0');
        Spendtime = `${mins}:${secs}`;
        if (timeElement) timeElement.innerText = Spendtime;
    }, 1000);
}

// Separate function to manage and start the game loop
function startGameLoop() {
    if (intervalId) clearInterval(intervalId); 
    startTimer(); 

    intervalId = setInterval(() => {
        lastDirection = direction;
        let head = null;
        if (direction === 'left') {
            head = { x: snake[0].x, y: snake[0].y - 1 };
        }
        else if (direction === 'right') {
            head = { x: snake[0].x, y: snake[0].y + 1 };
        }
        else if (direction === 'up') {
            head = { x: snake[0].x - 1, y: snake[0].y };
        }
        else {
            head = { x: snake[0].x + 1, y: snake[0].y };
        }

        // Check if head hit a wall
        const hitWall = head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols;

        // Check if head hit any part of the snake's body
        const hitSelf = snake.some(segment => segment.x === head.x && segment.y === head.y);

        if (hitWall || hitSelf) {
            // alert('Game Over');
            clearInterval(intervalId);
            clearInterval(timerIntervalId);
            modal.style.display = 'flex';
            startGamemodal.style.display = 'none';
            gameOverModal.style.display = 'flex';
            return;
        }

        if (head.x === food.x && head.y === food.y) {
            const foodBlock = blocks[`${food.x},${food.y}`];
            if (foodBlock) foodBlock.classList.remove('food');
            
            food = generateFood();
            
            const newFoodBlock = blocks[`${food.x},${food.y}`];
            if (newFoodBlock) newFoodBlock.classList.add('food');

            snake.unshift(head);
            CurrentScore += 1;
            if (scoreElement) scoreElement.innerText = CurrentScore;

            if (CurrentScore > highScoreVal) {
                highScoreVal = CurrentScore;
                localStorage.setItem("highScore", highScoreVal.toString());
                if (highScoreElement) highScoreElement.innerText = highScoreVal;
            }
        }

        snake.forEach((segment) => {
            const block = blocks[`${segment.x},${segment.y}`];
            if (block) block.classList.remove('fill');
        });

        snake.unshift(head);
        snake.pop();

        render();
    }, 200);
}

// Click to Start
btn.addEventListener('click', () => {
    modal.style.display = 'none';
    startGameLoop();
});

// Click to Restart (restarts game instantly)
restartBtn.addEventListener('click', () => {
    gameOverModal.style.display = 'none';
    restartGame();
});

function restartGame() {
    // 1. Clear old styles (snake body & food) from the grid blocks
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const block = blocks[`${row},${col}`];
            if (block) block.classList.remove('fill', 'food');
        }
    }

    // 2. Reset snake, directions, and food position
    snake = [
        { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }
    ];
    direction = 'down';
    lastDirection = 'down';
    food = generateFood();
    
    // Reset Score state and UI
    CurrentScore = 0;
    if (scoreElement) scoreElement.innerText = CurrentScore;

    // Reset Time state and UI
    Spendtime = "00:00";
    if (timeElement) timeElement.innerText = Spendtime;

    // 3. Hide modal & start the game loop
    modal.style.display = 'none';
    render();
    startGameLoop();
}

addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowLeft' || e.key === 'a') && lastDirection !== 'right') {
        direction = 'left';
    }
    else if ((e.key === 'ArrowRight' || e.key === 'd') && lastDirection !== 'left') {
        direction = 'right';
    }
    else if ((e.key === 'ArrowUp' || e.key === 'w') && lastDirection !== 'down') {
        direction = 'up';
    }
    else if ((e.key === 'ArrowDown' || e.key === 's') && lastDirection !== 'up') {
        direction = 'down';
    }
});