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
        <option value="human">Human vs Human</option>
        <option value="rational">Human vs Rational AI</option>
        <option value="random">Human vs Random AI</option>
        <option value="adaptive">Human vs Adaptive AI</option>
        <option value="tit-for-tat">Human vs Tit-for-Tat AI</option>
      </select>
      <Tooltip content="Choose your opponent: another human player or different AI strategies">
        <span className="info-icon">ℹ️</span>
      </Tooltip>
    </div>
  );
};

export default GameModeSelect;

