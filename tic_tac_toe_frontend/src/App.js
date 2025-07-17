import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick, isWinner }) => (
  <button 
    className={`square ${isWinner ? 'winner' : ''}`}
    onClick={onClick}
  >
    {value}
  </button>
);

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square)) {
    status = "Game Draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <h1 className="game-header">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onClick={() => handleClick(i)}
            isWinner={winningLine.includes(i)}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
