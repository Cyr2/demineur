const board = document.querySelector('.board');

function constructGame() {
  for (let i = 0; i < (9 * 9); i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i);
    board.appendChild(cell);
  }

  const cells = document.querySelectorAll('.cell');
  const bombs = [];
  while (bombs.length < 10) {
    const randomIndex = Math.floor(Math.random() * 81);
    if (!bombs.includes(randomIndex)) {
      bombs.push(randomIndex);
      cells[randomIndex].classList.add('bomb');
    }
  }
  start();
};

function start() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (cell.classList.contains('bomb')) {
        cell.classList.add('bomb-exploded');
        cells.forEach(cell => {
          if (cell.classList.contains('bomb')) {
            cell.classList.add('bomb-exploded');
          } else {
            cell.classList.add('safe');
            cell.textContent = getAdjacentBombs(cell);
          }
        });
      } else {
        cell.classList.add('safe');
        cell.textContent = getAdjacentBombs(cell);
      }
    });
  });
}

function getAdjacentBombs(cell) {
  const cells = document.querySelectorAll('.cell');
  let adjacent = 0;
  const cellIndex = parseInt(cell.id);

  // Left
  if (cells[cellIndex - 1] && cells[cellIndex - 1].classList.contains('bomb')) {
    adjacent++;
  }
  // Left Top
  if (cells[cellIndex - 10] && cells[cellIndex - 10].classList.contains('bomb')) {
    adjacent++;
  }
  // Left Bottom
  if (cells[cellIndex + 8] && cells[cellIndex + 8].classList.contains('bomb')) {
    adjacent++;
  }
  // Right
  if (cells[cellIndex + 1] && cells[cellIndex + 1].classList.contains('bomb')) {
    adjacent++;
  }
  // Right Top
  if (cells[cellIndex - 8] && cells[cellIndex - 8].classList.contains('bomb')) {
    adjacent++;
  }
  // Right Bottom
  if (cells[cellIndex + 10] && cells[cellIndex + 10].classList.contains('bomb')) {
    adjacent++;
  }
  // Top
  if (cells[cellIndex - 9] && cells[cellIndex - 9].classList.contains('bomb')) {
    adjacent++;
  }
  // Top Left
  if (cells[cellIndex - 11] && cells[cellIndex - 11].classList.contains('bomb')) {
    adjacent++;
  }
  // Top Right
  if (cells[cellIndex - 7] && cells[cellIndex - 7].classList.contains('bomb')) {
    adjacent++;
  }
  // Bottom
  if (cells[cellIndex + 9] && cells[cellIndex + 9].classList.contains('bomb')) {
    adjacent++;
  }
  // Bottom Left
  if (cells[cellIndex + 7] && cells[cellIndex + 7].classList.contains('bomb')) {
    adjacent++;
  }
  // Bottom Right
  if (cells[cellIndex + 11] && cells[cellIndex + 11].classList.contains('bomb')) {
    adjacent++;
  }
  if(adjacent!=0){return adjacent};
}

constructGame();