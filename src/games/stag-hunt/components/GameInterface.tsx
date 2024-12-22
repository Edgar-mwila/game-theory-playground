import React from 'react';
import { useGame } from '../contexts/GameContext';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';
import HuntPhase from './HuntPhase';
import AnalysisPhase from './AnalysisPhase';
import GameStats from './GameStats';
import '../styles/GameInterface.css';

const GameInterface: React.FC = () => {
  const { gamePhase } = useGame();

  return (
    <div className="game-section">
      {gamePhase === 'setup' && <GameSetup />}
      {gamePhase !== 'setup' && (
        <>
          <GameBoard />
          {gamePhase === 'hunt' && <HuntPhase />}
          {gamePhase === 'analysis' && <AnalysisPhase />}
          <GameStats />
        </>
      )}
    </div>
  );
};

export default GameInterface;

