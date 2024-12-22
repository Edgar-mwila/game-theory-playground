import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameSetup.css';

const GameSetup: React.FC = () => {
  const { setPrisoners } = useGame();
  const [numPrisoners, setNumPrisoners] = useState(8);

  const handleStartGame = () => {
    const cellBlocks: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const prisoners = Array(numPrisoners).fill(null).map((_, index) => ({
      id: index,
      type: index === 0 ? 'human' as const : ['loyal', 'selfish', 'adaptive'][Math.floor(Math.random() * 3)] as 'loyal' | 'selfish' | 'adaptive',
      cellBlock: cellBlocks[Math.floor(index / 2)],
      sentence: 10,
      action: null
    }));
    setPrisoners(prisoners);
  };

  return (
    <motion.div
      className="game-setup"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Game Setup</h2>
      <div className="setup-control">
        <label htmlFor="num-prisoners">Number of Prisoners:</label>
        <input
          id="num-prisoners"
          type="number"
          min="4"
          max="12"
          step="2"
          value={numPrisoners}
          onChange={(e) => setNumPrisoners(Math.max(4, Math.min(12, parseInt(e.target.value))))}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartGame}
        className="btn-primary"
      >
        Start Game
      </motion.button>
    </motion.div>
  );
};

export default GameSetup;

