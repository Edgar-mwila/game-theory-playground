import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/ActionPhase.css';

const ActionPhase: React.FC = () => {
  const { prisoners, currentPrisoner, chooseAction } = useGame();
  const [selectedAction, setSelectedAction] = useState<'cooperate' | 'defect' | null>(null);

  useEffect(() => {
    if (prisoners[currentPrisoner].type !== 'human') {
      let aiAction: 'cooperate' | 'defect';
      const prisoner = prisoners[currentPrisoner];
      switch (prisoner.type) {
        case 'loyal':
          aiAction = 'cooperate';
          break;
        case 'selfish':
          aiAction = 'defect';
          break;
        case 'adaptive':
          const cellBlockMates = prisoners.filter(p => p.cellBlock === prisoner.cellBlock);
          const cooperationRate = cellBlockMates.filter(p => p.action === 'cooperate').length / cellBlockMates.length;
          aiAction = Math.random() < cooperationRate ? 'cooperate' : 'defect';
          break;
        default:
          aiAction = Math.random() < 0.5 ? 'cooperate' : 'defect';
      }
      setTimeout(() => chooseAction(currentPrisoner, aiAction), 1000);
    }
  }, [currentPrisoner, prisoners, chooseAction]);

  if (prisoners[currentPrisoner].type !== 'human') {
    return <div className="ai-thinking">AI is deciding on action...</div>;
  }

  return (
    <motion.div
      className="action-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Choose Your Action</h3>
      <div className="action-buttons">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedAction('cooperate');
            chooseAction(currentPrisoner, 'cooperate');
          }}
          className={`btn-action ${selectedAction === 'cooperate' ? 'selected' : ''}`}
        >
          Cooperate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedAction('defect');
            chooseAction(currentPrisoner, 'defect');
          }}
          className={`btn-action ${selectedAction === 'defect' ? 'selected' : ''}`}
        >
          Defect
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ActionPhase;

