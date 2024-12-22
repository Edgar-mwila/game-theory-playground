import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
  const { players, round, communityChest, multiplier, eventType } = useGame();

  const getEventEmoji = (event: string) => {
    switch (event) {
      case 'disaster': return '🌪️';
      case 'windfall': return '🌟';
      default: return '🌈';
    }
  };

  return (
    <div className="game-board">
      <div className="game-info">
        <motion.div
          key={round}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Round {round}</h2>
        </motion.div>
        <motion.div
          key={communityChest}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="community-chest"
        >
          Community Chest: {communityChest} 💰
        </motion.div>
        <motion.div
          key={multiplier}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="multiplier"
        >
          Multiplier: x{multiplier}
        </motion.div>
        <motion.div
          key={eventType}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="event-type"
        >
          Event: {getEventEmoji(eventType)} {eventType}
        </motion.div>
      </div>
      <div className="players-container">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className={`player ${player.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="player-icon">{index === 0 ? '👤' : '🤖'}</div>
            <div className="player-info">
              <div>Player {player.id + 1}</div>
              <div>{player.type.charAt(0).toUpperCase() + player.type.slice(1)}</div>
              <div>Tokens: {player.tokens}</div>
              <div>Contribution: {player.contribution}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

