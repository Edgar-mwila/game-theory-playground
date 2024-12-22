import React from 'react';
import '../styles/InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2>Game Theory Concepts</h2>
      <div className="concept">
        <h3>Nash Equilibrium</h3>
        <p>In Rock, Paper, Scissors, Lizard, Spock, the Nash Equilibrium is achieved when all players choose their moves randomly with equal probability.</p>
      </div>
      <div className="concept">
        <h3>Mixed Strategy</h3>
        <p>The optimal strategy in this game is to use a mixed strategy, where you randomly choose your move to be unpredictable to your opponent.</p>
      </div>
      <div className="concept">
        <h3>Game Complexity</h3>
        <p>Adding Lizard and Spock increases the game's complexity, making it harder for players to guess their opponent's next move and creating more interesting dynamics.</p>
      </div>
      <div className="concept">
        <h3>AI Strategies</h3>
        <p>The different AI modes (Random, Cyclic, Adaptive) showcase various approaches to game theory and decision-making in repeated games.</p>
      </div>
    </div>
  );
};

export default InfoSection;

