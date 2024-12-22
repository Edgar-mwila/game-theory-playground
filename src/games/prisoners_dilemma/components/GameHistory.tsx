import React from 'react';
import { useGame } from '../contexts/GameContext';
import '../styles/GameHistory.css';

const GameHistory: React.FC = () => {
  const { history } = useGame();

  return (
    <div className="history">
      <h3>Game History</h3>
      <div className="history-log">
        {history.map((entry, index) => (
          <div key={index} className="history-item">
            Round {history.length - index}: 
            Player 1 {entry[0]}d ({entry[2][0]}), 
            Player 2 {entry[1]}d ({entry[2][1]})
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;

