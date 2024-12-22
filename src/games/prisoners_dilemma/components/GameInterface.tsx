import React from 'react';
import { useGame } from '../contexts/GameContext';
import PayoffMatrix from './PayoffMatrix';
import PlayerControls from './PlayerControls';
import GameStats from './GameStats';
import GameHistory from './GameHistory';
import GameModeSelect from './GameModeSelect';
import '../styles/GameInterface.css';

interface GameInterfaceProps {
  onResetGame: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ onResetGame }) => {
  const { resetGame, setGameMode } = useGame();

  const handleResetGame = () => {
    resetGame();
    onResetGame();
  };

  return (
    <div className="game-section">
      <h2>Game Interface</h2>
      <div className="controls">
        <GameModeSelect onChange={(mode) => setGameMode(mode)} />
        <button onClick={handleResetGame} className="btn-primary">Start New Game</button>
      </div>
      <div className="current-game">
        <PayoffMatrix />
        <PlayerControls />
        <GameStats />
        <GameHistory />
      </div>
    </div>
  );
};

export default GameInterface;

