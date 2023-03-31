let turn = 'X'
let cells = document.querySelectorAll('.cell');
let message = document.querySelector('#message');
let restart = document.querySelector('#restart');
let steps = {
    X: [],
    O: [],
}
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function changeTurn() {
    let winner = checkWinner();

    if (winner) {
        stopGame(`${winner}'s win`);
    }else if (!winner && steps.X.length + steps.O.length === 9) {
        stopGame('Draw!');
    }else {
        if (turn === 'X') {
            turn = 'O'
        }else {
            turn = 'X'
        }
        message.innerHTML = `${turn}'s turn`
    }
};
function checkWinner() {
    let winner = null;
    let win = null;
    if (turn === 'X') {
        win = winConditions.some(winConditions => {
            return winConditions.every(condition => steps.X.includes(condition));
        });
        if (win) winner ='X';
    }else if (turn === 'O') {
        win = winConditions.some(winConditions => {
            return winConditions.every(condition => steps.O.includes(condition));
        })
        if (win) winner = 'O';
    };
    return winner  
};
function stopGame(msg) {
    message.innerHTML = msg;
    
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none';
    })

};

function move(cell) {
    cell.innerHTML = turn;
    cell.style.pointerEvents = 'none';

    let cellIndex = parseInt(cell.getAttribute('data-cell'));

    if (turn === 'X') {
        steps.X.push(cellIndex);
    }else {
        steps.O.push(cellIndex);
    }

    changeTurn();
};

cells.forEach(cell => {
    cell.addEventListener('click', () => move(cell) )
});

restart.addEventListener('click', restartGame);
function restartGame() {
    steps.O = [];
    steps.X = [];
    turn = 'X';
    message.innerHTML = `${turn}'s turn`;
    cells.forEach(cell => {
        cell.innerHTML = null;
        cell.style.pointerEvents = 'auto'
    });
};