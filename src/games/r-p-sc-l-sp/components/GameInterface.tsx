import React from 'react';
import { useGame } from '../contexts/GameContext';
import GameControls from './GameControls';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import GameModeSelect from './GameModeSelect';
import '../styles/GameInterface.css';

const GameInterface: React.FC = () => {
  const { resetGame, setGameMode } = useGame();

  return (
    <div className="game-section">
      <div className="controls">
        <GameModeSelect onChange={(mode) => setGameMode(mode as any)} />
        <button onClick={resetGame} className="btn-primary">New Game</button>
      </div>
      <GameBoard />
      <GameControls />
      <GameStats />
    </div>
  );
};

export default GameInterface;

