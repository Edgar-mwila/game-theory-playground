import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';
import '../styles/GameBoard.css';

const GameBoard: React.FC = () => {
  const { prisoners, round } = useGame();

  const cellBlocks = ['A', 'B', 'C', 'D'];

  return (
    <div className="game-board">
      <motion.div
        key={round}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="round-info"
      >
        <h2>Round {round}</h2>
      </motion.div>
      <div className="prison-layout">
        {cellBlocks.map((block) => (
          <div key={block} className="cell-block">
            <h3>Cell Block {block}</h3>
            <div className="prisoners">
              {prisoners
                .filter((prisoner) => prisoner.cellBlock === block)
                .map((prisoner) => (
                  <motion.div
                    key={prisoner.id}
                    className={`prisoner ${prisoner.type}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="prisoner-icon">{prisoner.type === 'human' ? '👤' : '🤖'}</div>
                    <div className="prisoner-info">
                      <div>Prisoner {prisoner.id + 1}</div>
                      <div>{prisoner.type.charAt(0).toUpperCase() + prisoner.type.slice(1)}</div>
                      <div>Sentence: {prisoner.sentence} years</div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

