import React from 'react';
import { Tooltip } from './Tooltip';
import '../styles/GameModeSelect.css';

interface GameModeSelectProps {
  onChange: (mode: string) => void;
}

const GameModeSelect: React.FC<GameModeSelectProps> = ({ onChange }) => {
  return (
    <div className="game-mode-select">
      <select onChange={(e) => onChange(e.target.value)} className="mode-select">
        <option value="random">Random AI</option>
        <option value="cyclic">Cyclic AI</option>
        <option value="adaptive">Adaptive AI</option>
      </select>
      <Tooltip content="Choose your opponent's strategy">
        <span className="info-icon">ℹ️</span>
      </Tooltip>
    </div>
  );
};

export default GameModeSelect;

