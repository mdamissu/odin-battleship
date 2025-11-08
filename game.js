import { Player } from './player.js';

export const Game = () => {
    const player = Player('You');
    const computer = Player('Computer', true);
    let currentPlayer = player;
    const switchTurn = () => {
        currentPlayer = currentPlayer === player ? computer : player;

    }  
    const takeTurn = (x, y) => {
        if (currentPlayer.isComputer) {
            currentPlayer.randomAttack(player);
        } else {
            player.attack(computer, x, y);
        }     
        if (player.gameboard.allShipsSunk()) return 'Computer wins!';
        if (computer.gameboard.allShipsSunk()) return 'Player wins!';

        switchTurn();          
    }  
    return { player, computer, takeTurn, currentPlayer };
}