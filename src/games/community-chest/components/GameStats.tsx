import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameStats.css';

const GameStats: React.FC = () => {
  const { players, round, communityChest, multiplier } = useGame();

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
        <h3>Community Chest</h3>
        <div className="stat-value">{communityChest}</div>
      </motion.div>
      <motion.div 
        className="stat-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3>Multiplier</h3>
        <div className="stat-value">x{multiplier}</div>
      </motion.div>
      {players.map((player, index) => (
        <motion.div 
          key={player.id}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          <h3>Player {player.id + 1}</h3>
          <div className="stat-value">{player.tokens}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default GameStats;

