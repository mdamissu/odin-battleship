import { Gameboard } from './gameboard.js';

export const Player = (name, isComputer = false) => {
    const gameboard = Gameboard();
    const attack = (opponent, x, y) =>{
        return opponent.gameboard.receiveAttack(x, y);
    }
    const randomAttack = (opponent) => {
        let x, y;
        do{
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);            
        } while (
        opponent.gameboard.missedAttacks.some(([mx, my]) => mx === x && my === y)
        );

    }
    return { name, gameboard, attack, randomAttack, isComputer };    
}