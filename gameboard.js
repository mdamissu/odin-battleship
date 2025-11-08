import Ship from './ship';

const Gameboard = () => {
    const board = Array.from({ length: 10 }, () => Array(10).fill(null));
    const ships = [];
    const missedAttacks = [];

    const placeShip = (ship, x, y, isVertical) => {
        if (isVertical) {
            for (let i = 0; i < ship.length; i++) board[x + i][y] = ship;
        } else {
            for (let i = 0; i < ship.length; i++) board[x][y + i] = ship;
        }
        ships.push({ ship, x, y, isVertical });
    };

    const receiveAttack = (x, y) => {
        const target = board[x][y];
        if (target && typeof target.hit === 'function') {
            target.hit();
            return true; 
        } else {
            missedAttacks.push([x, y]);
            return false; 
        }
    };

    const allShipsSunk = () => ships.every(s => s.ship.isSunk());

    return { placeShip, receiveAttack, allShipsSunk, missedAttacks, board, ships };
};

export default Gameboard;
