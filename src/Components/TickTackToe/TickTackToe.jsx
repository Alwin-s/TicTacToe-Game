import React, { useState } from 'react';
import './tick.css';
import cross from "../Assets/circle.png"
import circle from "../Assets/cross.png"

function TickTackToe() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    const toggle = (index) => {
        if (lock || board[index] !== '') return;
        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? 'X' : 'O';
        setBoard(newBoard);
        setCount(count + 1);
        checkWin(newBoard);
    };

    const checkWin = (board) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                won(board[a]);
                return;
            }
        }
        if (count === 8) {
            // If no winner and board is full, it's a draw
            setLock(true);
            document.getElementById('title').innerText = 'It\'s a draw!';
        }
    };
    const won = (winner) => {
        setLock(true);
        const winnerMessage = `Player <img src="${winner === 'X' ? 'https://www.freepnglogos.com/uploads/x-png/blue-x-letter-clipart-10.png' : 'https://png.pngtree.com/png-clipart/20230510/ourmid/pngtree-pink-blue-neon-border-light-effect-circle-png-image_7093035.png'}" alt="${winner}"> has won!`;
        document.getElementById('title').innerHTML = winnerMessage;
        showWinnerAlert(winner);
    };
    
    const showWinnerAlert = (winner) => {
        setTimeout(() => {
            if (winner === 'X') {
                alert("Player X has won!");
            } else if (winner === 'O') {
                alert("Player O has won!");
            }
        }, 70); // Adjust the timeout value as needed
    };
    
    

    const reset = () => {
        setLock(false);
        setBoard(Array(9).fill(''));
        setCount(0);
        document.getElementById('title').innerText = 'Tic Tac Toe';
    };
    const renderBoxes = () => {
        return board.map((value, index) => (
            <div className="boxes" key={index} onClick={() => toggle(index)}>
                {value === 'X' && <img src={cross} alt="X" />}
                {value === 'O' && <img src={circle} alt="O" />}
            </div>
        ));
    };
    
    return (
        <div>
            <div className="conatiner">
                <h1 className="title" id="title">Tic Tac Toe</h1>
                <div className="board">
                    <div className="row1">{renderBoxes().slice(0, 3)}</div>
                    <div className="row2">{renderBoxes().slice(3, 6)}</div>
                    <div className="row3">{renderBoxes().slice(6, 9)}</div>
                </div>
                <button className="reset" onClick={reset}>Reset Game</button>
            </div>
        </div>
    );
}

export default TickTackToe;
