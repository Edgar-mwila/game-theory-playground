import React from 'react';
import { useGame } from '../contexts/GameContext';
import '../styles/GameStats.css';

const GameStats: React.FC = () => {
  const { scores, round } = useGame();

  return (
    <div className="stats">
      <div className="stat-card">
        <div>Player 1 Score</div>
        <div className="stat-value">{scores[0]}</div>
      </div>
      <div className="stat-card">
        <div>Player 2 Score</div>
        <div className="stat-value">{scores[1]}</div>
      </div>
      <div className="stat-card">
        <div>Round</div>
        <div className="stat-value">{round}</div>
      </div>
    </div>
  );
};

export default GameStats;

