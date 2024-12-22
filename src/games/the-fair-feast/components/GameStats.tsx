import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameStats.css';

const GameStats: React.FC = () => {
  const { players, round, totalPizza } = useGame();

  return (
    <div className="game-stats">
      <motion.div 
        className="stat-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Round</h3>
        <div className="stat-value">{round}</div>
      </motion.div>
      <motion.div 
        className="stat-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3>Total Pizza</h3>
        <div className="stat-value">{totalPizza}</div>
      </motion.div>
      {players.map((player, index) => (
        <motion.div 
          key={player.id}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <h3>Player {player.id + 1}</h3>
          <div className="stat-value">{player.score}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default GameStats;

