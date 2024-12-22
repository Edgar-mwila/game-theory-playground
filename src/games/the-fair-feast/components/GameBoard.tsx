import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
  const { players, totalPizza, currentPlayer, currentOffer } = useGame();

  return (
    <div className="game-board">
      <h2>Round {currentOffer ? `${currentOffer.from + 1} to ${currentOffer.to + 1}` : currentPlayer + 1}</h2>
      <div className="pizza-container">
        <AnimatePresence>
          {Array(totalPizza).fill(null).map((_, index) => (
            <motion.div
              key={index}
              className="pizza-slice"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, rotate: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              🍕
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="players-container">
        {players.map((player, index) => (
          <div key={player.id} className={`player ${index === currentPlayer ? 'current' : ''}`}>
            <div className="player-icon">{player.type === 'human' ? '👤' : '🤖'}</div>
            <div className="player-info">
              <div>Player {player.id + 1}</div>
              <div>{player.type.charAt(0).toUpperCase() + player.type.slice(1)}</div>
              <div>Score: {player.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

