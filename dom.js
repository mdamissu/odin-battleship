export const DOM = (() => {
    const playerBoardDiv = document.getElementById('player-board');
    const computerBoardDiv = document.getElementById('computer-board');

    // Lưu tất cả các cell vào mảng 2D thay vì dùng dataset
    const playerCells = [];
    const computerCells = [];

    const createBoard = (boardDiv, boardData, isEnemy = false) => {
        boardDiv.innerHTML = '';

        const cellGrid = [];

        for (let x = 0; x < 10; x++) {
            cellGrid[x] = [];
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                const target = boardData[x][y];
                if (!isEnemy && target && typeof target === 'object') {
                    cell.classList.add('ship');
                }

                boardDiv.appendChild(cell);
                cellGrid[x][y] = cell;
            }
        }

        if (isEnemy) computerCells.splice(0, computerCells.length, ...cellGrid);
        else playerCells.splice(0, playerCells.length, ...cellGrid);
    };

    const updateBoard = (boardDiv, boardData, isEnemy = false) => {
        const grid = isEnemy ? computerCells : playerCells;

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = grid[x][y];
                const target = boardData[x][y];

                cell.classList.remove('hit', 'miss');

                if (target && typeof target === 'object' && target.hits > 0) {
                    cell.classList.add('hit');
                } else if (!target) {
                    if (isEnemy && boardData.missedAttacks) {
                        const missed = boardData.missedAttacks.some(([mx, my]) => mx === x && my === y);
                        if (missed) cell.classList.add('miss');
                    }
                }
            }
        }
    };

    const getCellPosition = (clickedCell, isEnemy = false) => {
        const grid = isEnemy ? computerCells : playerCells;
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (grid[x][y] === clickedCell) return [x, y];
            }
        }
        return null;
    };

    return { 
        createBoard, 
        updateBoard, 
        getCellPosition, 
        playerBoardDiv, 
        computerBoardDiv,
        playerCells, 
        computerCells 
    };
})();