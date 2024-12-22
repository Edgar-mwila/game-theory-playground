import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/ContributionPhase.css';

const ContributionPhase: React.FC = () => {
  const { players, currentPlayer, makeContribution } = useGame();
  const [contribution, setContribution] = useState(0);

  useEffect(() => {
    if (players[currentPlayer].type !== 'human') {
      let aiContribution = 0;
      const player = players[currentPlayer];
      switch (player.type) {
        case 'cooperative':
          aiContribution = Math.floor(player.tokens * 0.7);
          break;
        case 'freerider':
          aiContribution = Math.floor(player.tokens * 0.1);
          break;
        case 'conditional':
          const averageContribution = players.reduce((sum, p) => sum + p.contribution, 0) / players.length;
          aiContribution = Math.min(averageContribution, player.tokens);
          break;
      }
      setTimeout(() => makeContribution(currentPlayer, aiContribution), 1000);
    }
  }, [currentPlayer, players, makeContribution]);

  if (players[currentPlayer].type !== 'human') {
    return <div className="ai-thinking">AI is deciding on contribution...</div>;
  }

  return (
    <motion.div
      className="contribution-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Make Your Contribution</h3>
      <div className="contribution-control">
        <label htmlFor="contribution-amount">Contribution Amount:</label>
        <input
          id="contribution-amount"
          type="range"
          min="0"
          max={players[currentPlayer].tokens}
          value={contribution}
          onChange={(e) => setContribution(parseInt(e.target.value))}
        />
        <span>{contribution} tokens</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => makeContribution(currentPlayer, contribution)}
        className="btn-primary"
      >
        Contribute
      </motion.button>
    </motion.div>
  );
};

export default ContributionPhase;

