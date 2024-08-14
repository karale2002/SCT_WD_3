let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isPlayerVsPlayer = true;

const boardElement = document.getElementById('board');
const resetButton = document.getElementById('resetBtn');
const modeToggleButton = document.getElementById('modeToggleBtn');
const statusDisplay = document.getElementById('status');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = `Game ended in a draw!`;
        isGameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (!isPlayerVsPlayer && currentPlayer === 'O' && isGameActive) {
        computerMove();
    }
}

function computerMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const computerCell = document.querySelector(`[data-index='${randomIndex}']`);
    
    handleCellPlayed(computerCell, randomIndex);
    handleResultValidation();
}

function handleReset() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = '';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

function handleModeToggle() {
    isPlayerVsPlayer = !isPlayerVsPlayer;
    handleReset();
    modeToggleButton.textContent = isPlayerVsPlayer ? 'Toggle Mode (Player vs Player)' : 'Toggle Mode (Player vs Computer)';
}

boardElement.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', handleReset);
modeToggleButton.addEventListener('click', handleModeToggle);