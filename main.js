const boardDiv = document.querySelector('#game');
const boardSize = 9;
const board = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""]
];

function generateBoard() {
  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      board[i][j] = "";
    }
  }

  let bombCount = 0;
  while (bombCount < 10) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    if (board[x][y] !== 'B') {
      board[x][y] = 'B';
      bombCount++;
    }
  }

  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      if (board[i][j] !== 'B') {
        let count = 0;
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === 'B') {
              count++;
            }
          }
        }
        board[i][j] = count;
      }
    }
  }

  renderBoard();
}

function renderBoard() {
  boardDiv.innerHTML = "";
  for(let i = 0; i < boardSize; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    boardDiv.appendChild(row);
    for(let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.textContent = board[i][j];
      cell.classList.add('cell');
      row.appendChild(cell);
    }
  }
  initEvent();
}

function initEvent(){
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if(cell.classList.contains('open')) return;
      const x = Math.floor(index / boardSize);
      const y = index % boardSize;
      if (board[x][y] === 'B') {
        alert('Game Over!');
        end();
      } else {
        cell.classList.add('open');
        checkCell(x, y);
      }
    });
  });
}

function checkCell(x,y){
  if(board[x][y] !== 0) return;

  const cell = document.querySelector(`.row:nth-child(${x + 1}) .cell:nth-child(${y + 1})`);
  cell.classList.add('open');
  board[x][y] = -1;

  if(x + 1 < boardSize && board[x + 1][y] === 0) {
    const cellBelow = document.querySelector(`.row:nth-child(${x + 2}) .cell:nth-child(${y + 1})`);
    cellBelow.classList.add('open');
    checkCell(x + 1, y);
  }
  if(x - 1 >= 0 && board[x - 1][y] === 0) {
    const cellAbove = document.querySelector(`.row:nth-child(${x}) .cell:nth-child(${y + 1})`);
    cellAbove.classList.add('open');
    checkCell(x - 1, y);
  }
  if(y + 1 < boardSize && board[x][y + 1] === 0) {
    const cellRight = document.querySelector(`.row:nth-child(${x + 1}) .cell:nth-child(${y + 2})`);
    cellRight.classList.add('open');
    checkCell(x, y + 1);
  }
  if(y - 1 >= 0 && board[x][y - 1] === 0) {
    const cellLeft = document.querySelector(`.row:nth-child(${x + 1}) .cell:nth-child(${y})`);
    cellLeft.classList.add('open');
    checkCell(x, y - 1);
  }

  checkWin();
}

function end(){
  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      const cell = document.querySelector(`.row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
      cell.classList.add('open');
    }
  }
}

function checkWin(){
  let count = 0;
  for(let i = 0; i< boardSize; i++){
    for(let j = 0; j< boardSize; j++){
      if(board[i][j] === -1){
        count++;
      }
      if(count === ((boardSize * boardSize) - 10)){
        alert('You Win!');
        generateBoard();
      }
    }
  }
}

generateBoard();