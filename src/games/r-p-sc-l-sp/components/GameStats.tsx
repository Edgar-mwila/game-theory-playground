import React from 'react';
import { useGame } from '../contexts/GameContext';
import '../styles/GameStats.css';

const GameStats: React.FC = () => {
  const { playerScore, computerScore, round } = useGame();

  return (
    <div className="game-stats">
      <div className="stat-card">
        <h3>Player Score</h3>
        <div className="stat-value">{playerScore}</div>
      </div>
      <div className="stat-card">
        <h3>Computer Score</h3>
        <div className="stat-value">{computerScore}</div>
      </div>
      <div className="stat-card">
        <h3>Round</h3>
        <div className="stat-value">{round}</div>
      </div>
    </div>
  );
};

export default GameStats;

