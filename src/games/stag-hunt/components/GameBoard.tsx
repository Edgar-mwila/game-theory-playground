import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
  const { players, environment, availablePrey, round, timeLeft } = useGame();

  const getEnvironmentEmoji = (env: string) => {
    switch (env) {
      case 'forest': return '🌳';
      case 'plains': return '🌾';
      case 'mountains': return '⛰️';
      default: return '🌍';
    }
  };

  const getPreyEmoji = (preyType: string) => {
    switch (preyType) {
      case 'stag': return '🦌';
      case 'deer': return '🦌';
      case 'rabbit': return '🐰';
      case 'squirrel': return '🐿️';
      default: return '❓';
    }
  };

  return (
    <div className="game-board">
      <div className="game-info">
        <motion.div
          key={round}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Round {round}</h2>
        </motion.div>
        <motion.div
          key={environment}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="environment"
        >
          Environment: {getEnvironmentEmoji(environment)} {environment}
        </motion.div>
        <motion.div
          key={timeLeft}
          initial={{ scale: 1 }}
          animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
          className={`time-left ${timeLeft <= 5 ? 'urgent' : ''}`}
        >
          Time Left: {timeLeft}s
        </motion.div>
      </div>
      <div className="prey-list">
        {availablePrey.map((prey) => (
          <motion.div
            key={prey.type}
            className="prey-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="prey-emoji">{getPreyEmoji(prey.type)}</span>
            <span className="prey-name">{prey.type}</span>
            <span className="prey-value">Value: {prey.value}</span>
            <span className="prey-risk">Risk: {prey.riskFactor * 100}%</span>
            <span className="prey-min-hunters">Min Hunters: {prey.minHunters}</span>
          </motion.div>
        ))}
      </div>
      <div className="players-container">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className={`player ${index === 0 ? 'human' : player.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="player-icon">{index === 0 ? '👤' : '🤖'}</div>
            <div className="player-info">
              <div>Player {player.id + 1}</div>
              <div>{player.type.charAt(0).toUpperCase() + player.type.slice(1)}</div>
              <div>Score: {player.score}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

