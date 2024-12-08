const gameBoard = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const pauseButton = document.getElementById('pause');
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

const gridSize = 20;
const cells = [];
let snake = [42, 41, 40];
let direction = 1;
let food = 0;
let score = 0;
let interval;
let isPaused = false;

for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    gameBoard.appendChild(cell);
}

function startGame() {
    clearInterval(interval);
    snake = [42, 41, 40];
    direction = 1;
    score = 0;
    placeFood();
    updateScore();
    isPaused = false;
    pauseButton.textContent = "Pause";
    interval = setInterval(moveSnake, 150);
}

function moveSnake() {
    if (isPaused) return;
    const head = snake[0];
    const newHead = head + direction;

    if (
        (newHead % gridSize === 0 && direction === 1) ||
        (head % gridSize === 0 && direction === -1) ||
        newHead < 0 || 
        newHead >= gridSize * gridSize || 
        cells[newHead].classList.contains('snake')
    ) {
        alert('Game Over! Skor Anda: ' + score);
        startGame();
        return;
    }

    if (newHead === food) {
        score++;
        updateScore();
        placeFood();
    } else {
        const tail = snake.pop();
        cells[tail].classList.remove('snake');
    }

    snake.unshift(newHead);
    cells[newHead].classList.add('snake');
}

function changeDirection(newDirection) {
    if (
        (newDirection === -1 && direction !== 1) || 
        (newDirection === 1 && direction !== -1) ||
        (newDirection === -gridSize && direction !== gridSize) || 
        (newDirection === gridSize && direction !== -gridSize)
    ) {
        direction = newDirection;
    }
}

function placeFood() {
    do {
        food = Math.floor(Math.random() * cells.length);
    } while (cells[food].classList.contains('snake'));
    cells.forEach(cell => cell.classList.remove('food'));
    cells[food].classList.add('food');
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

upButton.addEventListener('click', () => changeDirection(-gridSize));
downButton.addEventListener('click', () => changeDirection(gridSize));
leftButton.addEventListener('click', () => changeDirection(-1));
rightButton.addEventListener('click', () => changeDirection(1));

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

document.addEventListener('keydown', event => {
    const key = event.keyCode;
    if (key === 37) changeDirection(-1); 
    else if (key === 38) changeDirection(-gridSize);
    else if (key === 39) changeDirection(1); 
    else if (key === 40) changeDirection(gridSize);
});

startGame();