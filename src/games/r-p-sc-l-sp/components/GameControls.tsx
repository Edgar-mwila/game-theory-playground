import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';
import '../styles/GameControls.css';

const GameControls: React.FC = () => {
  const { makeMove } = useGame();

  const moves = [
    { name: 'rock', emoji: '🪨', tooltip: 'Rock crushes Scissors and Lizard' },
    { name: 'paper', emoji: '📄', tooltip: 'Paper covers Rock and disproves Spock' },
    { name: 'scissors', emoji: '✂️', tooltip: 'Scissors cuts Paper and decapitates Lizard' },
    { name: 'lizard', emoji: '🦎', tooltip: 'Lizard eats Paper and poisons Spock' },
    { name: 'spock', emoji: '🖖', tooltip: 'Spock vaporizes Rock and smashes Scissors' },
  ];

  return (
    <div className="game-controls">
      {moves.map((move, index) => (
        <Tooltip key={move.name} content={move.tooltip}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => makeMove(move.name as any)}
            className="move-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {move.emoji}
          </motion.button>
        </Tooltip>
      ))}
    </div>
  );
};

export default GameControls;

