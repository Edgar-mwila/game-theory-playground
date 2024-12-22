import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';
import '../styles/GameControls.css';

const GameControls: React.FC = () => {
  const { totalPizza, playerOffer, setPlayerOffer, makeComputerDecision, computerResponse } = useGame();

  return (
    <div className="game-controls">
      <div className="offer-control">
        <Tooltip content="Adjust your offer to the computer player">
          <label htmlFor="offer-slider">Your Offer: {playerOffer} slices</label>
        </Tooltip>
        <input
          id="offer-slider"
          type="range"
          min={1}
          max={totalPizza - 1}
          value={playerOffer}
          onChange={(e) => setPlayerOffer(parseInt(e.target.value))}
          className="offer-slider"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={makeComputerDecision}
        className="btn-primary"
        disabled={computerResponse !== null}
      >
        Make Offer
      </motion.button>
    </div>
  );
};

export default GameControls;

