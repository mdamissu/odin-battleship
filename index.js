import { Game } from './game.js';
import { DOM } from './dom.js';

const game = Game();

game.player.gameboard.placeShip(3, [[0, 0], [0, 1], [0, 2]]);
game.player.gameboard.placeShip(2, [[2, 0], [2, 1]]);

game.computer.gameboard.placeShip(3, [[5, 5], [5, 6], [5, 7]]);
game.computer.gameboard.placeShip(2, [[7, 0], [7, 1]]);

DOM.createBoard(DOM.playerBoardDiv, game.player.gameboard.board);
DOM.createBoard(DOM.computerBoardDiv, game.computer.gameboard.board, true);

DOM.computerBoardDiv.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) return;

    const pos = DOM.getCellPosition(e.target, true);
    if (!pos) return;
    const [x, y] = pos;

    game.takeTurn(x, y);

    DOM.updateBoard(DOM.playerBoardDiv, game.player.gameboard.board);
    DOM.updateBoard(DOM.computerBoardDiv, game.computer.gameboard.board, true);

    if (game.player.gameboard.allShipsSunk()) {
        alert('Computer wins!');
    } else if (game.computer.gameboard.allShipsSunk()) {
        alert('Player wins!');
    }
});
