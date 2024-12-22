import React, { useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/ResponsePhase.css';

const ResponsePhase: React.FC = () => {
  const { players, currentOffer, respondToOffer } = useGame();

  useEffect(() => {
    if (currentOffer && players[currentOffer.to].type !== 'human') {
      const aiDecision = Math.random() > 0.2; // 80% chance to accept
      setTimeout(() => respondToOffer(aiDecision), 1000);
    }
  }, [currentOffer, players, respondToOffer]);

  if (!currentOffer) return null;

  if (players[currentOffer.to].type !== 'human') {
    return <div className="ai-thinking">AI is considering the offer...</div>;
  }

  return (
    <motion.div
      className="response-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Respond to Offer</h3>
      <p>Player {currentOffer.from + 1} offered you {currentOffer.amount} slices.</p>
      <div className="response-buttons">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => respondToOffer(true)}
          className="btn-success"
        >
          Accept
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => respondToOffer(false)}
          className="btn-danger"
        >
          Reject
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ResponsePhase;

