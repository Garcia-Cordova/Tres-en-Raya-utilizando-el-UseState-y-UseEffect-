import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false); // Estado para el empate

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const currentWinner = calculateWinner(board);
    setWinner(currentWinner);
    
    // Comprobar si hay un empate
    if (!currentWinner && board.every(square => square !== null)) {
      setIsDraw(true);
    } else {
      setIsDraw(false);
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false); // Reiniciar el estado de empate
  };

  return (
    <div className="board">
      <h1>3 en Raya</h1>
      <div className="turn">
        {winner ? `Ganador: ${winner}` : isDraw ? "¡Empate!" : `Turno de: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className={`game ${winner ? 'winner' : ''}`}>
        {board.map((square, index) => (
          <button key={index} className={`square ${square ? 'is-selected' : ''}`} onClick={() => handleClick(index)}>
            {square}
          </button>
        ))}
      </div>
      {(winner || isDraw) && (
        <div className="winner">
          <div className="text">
            <h2>{winner ? "¡Ganador!" : "¡Empate!"}</h2>
            {winner && <div className="win">{winner}</div>}
            <button onClick={handleRestart}>Reiniciar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
