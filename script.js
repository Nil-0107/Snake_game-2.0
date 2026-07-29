const board = document.querySelector('.board');
const a = 50;
const btn = document.querySelector('.btn');
const modal = document.querySelector('.modal');

const cols = Math.floor(board.clientWidth / a);
const rows = Math.floor(board.clientHeight / a);
let intervalId = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };


// for (let i=1; i < rows*cols; i++) {
//     const block = document.createElement('div');
//     block.classList.add('block'); 
//     board.appendChild(block);
// }
const blocks = [];
const snake = [
    { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }
];
let direction = 'down';


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = [`${row},${col}`];
        blocks[`${row},${col}`] = block;

    }
}

function render() {
    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.add('fill');
    })
    blocks[`${food.x},${food.y}`].classList.add('food');

}


 btn.addEventListener('click', () => {
    modal.style.display = 'none';
    intervalId = setInterval(() => {render()}, 300);
        
})

function restartGame() {
    
}

   


intervalId = setInterval(() => {
    let head = null
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


    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        alert('Game Over');
        clearInterval(intervalId);

    }

    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x},${food.y}`].classList.remove('food');
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[`${food.x},${food.y}`].classList.add('food');

        snake.unshift(head);
    }

    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.remove('fill');
    });

    snake.unshift(head);
    snake.pop();



    render();
}, 200);


addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        direction = 'left';
    }
    else if (e.key === 'ArrowRight' || e.key === 'd') {
        direction = 'right';
    }
    else if (e.key === 'ArrowUp' || e.key === 'w') {
        direction = 'up';
    }
    else if (e.key === 'ArrowDown' || e.key === 's') {
        direction = 'down';
    }
})