import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/AnalysisPhase.css';

const AnalysisPhase: React.FC = () => {
  const { analysis, startNewRound } = useGame();

  return (
    <motion.div
      className="analysis-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Round Analysis</h3>
      <p>{analysis}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startNewRound}
        className="btn-primary"
      >
        Next Round
      </motion.button>
    </motion.div>
  );
};

export default AnalysisPhase;

