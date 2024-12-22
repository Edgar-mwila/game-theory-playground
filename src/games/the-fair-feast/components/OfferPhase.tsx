import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/OfferPhase.css';

const OfferPhase: React.FC = () => {
  const { players, currentPlayer, totalPizza, makeOffer } = useGame();
  const [offer, setOffer] = useState(Math.floor(totalPizza / 2));
  const [recipient, setRecipient] = useState(currentPlayer === 0 ? 1 : 0);

  useEffect(() => {
    if (players[currentPlayer].type !== 'human') {
      const aiOffer = Math.floor(Math.random() * (totalPizza - 1)) + 1;
      const aiRecipient = (currentPlayer + 1) % players.length;
      setTimeout(() => makeOffer(currentPlayer, aiRecipient, aiOffer), 1000);
    }
  }, [currentPlayer, players, totalPizza, makeOffer]);

  if (players[currentPlayer].type !== 'human') {
    return <div className="ai-thinking">AI is making an offer...</div>;
  }

  return (
    <motion.div
      className="offer-phase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Make Your Offer</h3>
      <div className="offer-control">
        <label htmlFor="offer-amount">Offer Amount:</label>
        <input
          id="offer-amount"
          type="range"
          min="1"
          max={totalPizza - 1}
          value={offer}
          onChange={(e) => setOffer(parseInt(e.target.value))}
        />
        <span>{offer} slices</span>
      </div>
      <div className="offer-control">
        <label htmlFor="recipient">Offer To:</label>
        <select
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(parseInt(e.target.value))}
        >
          {players.map((player, index) => (
            index !== currentPlayer && (
              <option key={player.id} value={index}>
                Player {index + 1}
              </option>
            )
          ))}
        </select>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => makeOffer(currentPlayer, recipient, offer)}
        className="btn-primary"
      >
        Make Offer
      </motion.button>
    </motion.div>
  );
};

export default OfferPhase;

