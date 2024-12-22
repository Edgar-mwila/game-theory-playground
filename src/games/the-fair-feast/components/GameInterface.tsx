import React from 'react';
import { useGame } from '../contexts/GameContext';
import GameSetup from './GameSetup';
import GameBoard from './GameBoard';
import OfferPhase from './OfferPhase';
import ResponsePhase from './ResponsePhase';
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
          {gamePhase === 'offer' && <OfferPhase />}
          {gamePhase === 'response' && <ResponsePhase />}
          {gamePhase === 'analysis' && <AnalysisPhase />}
          <GameStats />
        </>
      )}
    </div>
  );
};

export default GameInterface;

