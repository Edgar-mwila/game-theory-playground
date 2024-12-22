import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameSetup.css';

const GameSetup: React.FC = () => {
  const { setPlayers, setTotalPizza } = useGame();
  const [numPlayers, setNumPlayers] = useState(3);
  const [pizzaSlices, setPizzaSlices] = useState(10);

  const handleStartGame = () => {
    const players = [
      { id: 0, type: 'human' as const, score: 0 },
      ...Array(numPlayers - 1).fill(null).map((_, index) => ({
        id: index + 1,
        type: ['fair', 'greedy', 'random'][Math.floor(Math.random() * 3)] as 'fair' | 'greedy' | 'random',
        score: 0
      }))
    ];
    setPlayers(players);
    setTotalPizza(pizzaSlices);
  };

  return (
    <motion.div
      className="game-setup"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Game Setup</h2>
      <div className="setup-control">
        <label htmlFor="num-players">Number of Players:</label>
        <input
          id="num-players"
          type="number"
          min="3"
          max="5"
          value={numPlayers}
          onChange={(e) => setNumPlayers(Math.max(3, Math.min(5, parseInt(e.target.value))))}
        />
      </div>
      <div className="setup-control">
        <label htmlFor="pizza-slices">Initial Pizza Slices:</label>
        <input
          id="pizza-slices"
          type="number"
          min="5"
          max="20"
          value={pizzaSlices}
          onChange={(e) => setPizzaSlices(Math.max(5, Math.min(20, parseInt(e.target.value))))}
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartGame}
        className="btn-primary"
      >
        Start Game
      </motion.button>
    </motion.div>
  );
};

export default GameSetup;

