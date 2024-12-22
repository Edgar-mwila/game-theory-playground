import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/HuntPhase.css';

const HuntPhase: React.FC = () => {
  const { players, currentPlayer, availablePrey, chooseTarget } = useGame();
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const handleTargetSelection = (target: string) => {
    setSelectedTarget(target);
    if (players[currentPlayer].type === 'human') {
      chooseTarget(currentPlayer, target as any);
    }
  };

  if (players[currentPlayer].type !== 'human') {
    return <div className="ai-thinking">AI is making a decision...</div>;
  }

  return (
    <motion.div
      className="hunt-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Choose Your Target</h3>
      <div className="target-options">
        {availablePrey.map((prey) => (
          <motion.button
            key={prey.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTargetSelection(prey.type)}
            className={`btn-target ${selectedTarget === prey.type ? 'selected' : ''}`}
          >
            {prey.type}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HuntPhase;

