import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
  const { playerMove, computerMove, result } = useGame();

  const getEmoji = (move: string | null) => {
    switch (move) {
      case 'rock': return '🪨';
      case 'paper': return '📄';
      case 'scissors': return '✂️';
      case 'lizard': return '🦎';
      case 'spock': return '🖖';
      default: return '❓';
    }
  };

  return (
    <div className="game-board">
      <motion.div 
        className="player-move"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Your Move</h3>
        <div className="move-emoji">{getEmoji(playerMove)}</div>
      </motion.div>
      <motion.div 
        className="result"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {result && <h2>{result}</h2>}
      </motion.div>
      <motion.div 
        className="computer-move"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Computer's Move</h3>
        <div className="move-emoji">{getEmoji(computerMove)}</div>
      </motion.div>
    </div>
  );
};

export default GameBoard;

