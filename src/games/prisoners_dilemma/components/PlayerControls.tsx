import React from 'react';
import { useGame } from '../contexts/GameContext';
import '../styles/PlayerControls.css';

const PlayerControls: React.FC = () => {
  const { makeDecision, currentRoundDecisions, gameMode } = useGame();

  const renderPlayerControls = (player: 1 | 2) => (
    <div className="player-controls">
      <h3>{`Player ${player} Decision`}</h3>
      <button
        className="btn-success"
        onClick={() => makeDecision(player, 'cooperate')}
        disabled={currentRoundDecisions[player - 1] !== null}
      >
        Cooperate
      </button>
      <button
        className="btn-danger"
        onClick={() => makeDecision(player, 'defect')}
        disabled={currentRoundDecisions[player - 1] !== null}
      >
        Defect
      </button>
    </div>
  );

  return (
    <div>
      {renderPlayerControls(1)}
      {gameMode === 'human' && renderPlayerControls(2)}
    </div>
  );
};

export default PlayerControls;

