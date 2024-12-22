import React from 'react';
import { useGame } from '../contexts/GameContext';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';
import ContributionPhase from './ContributionPhase';
import EventPhase from './EventPhase';
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
          {gamePhase === 'contribution' && <ContributionPhase />}
          {gamePhase === 'event' && <EventPhase />}
          {gamePhase === 'analysis' && <AnalysisPhase />}
          <GameStats />
        </>
      )}
    </div>
  );
};

export default GameInterface;

