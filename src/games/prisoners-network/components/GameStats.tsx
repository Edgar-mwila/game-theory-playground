import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameStats.css';

const GameStats: React.FC = () => {
  const { prisoners, round } = useGame();

  const cellBlocks = ['A', 'B', 'C', 'D'];

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
      {cellBlocks.map((block, index) => {
        const blockPrisoners = prisoners.filter(p => p.cellBlock === block);
        const avgSentence = blockPrisoners.reduce((sum, p) => sum + p.sentence, 0) / blockPrisoners.length;
        
        return (
          <motion.div 
            key={block}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <h3>Cell Block {block}</h3>
            <div className="stat-value">{avgSentence.toFixed(1)} years</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GameStats;

