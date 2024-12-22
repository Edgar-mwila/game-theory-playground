import React from 'react';
import '../styles/InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2>Game Theory Concepts</h2>
      <div className="concept">
        <h3>Public Goods Game</h3>
        <p>The Community Chest Dilemma is based on the Public Goods Game, which explores the tension between individual interests and the collective good.</p>
      </div>
      <div className="concept">
        <h3>Free-Rider Problem</h3>
        <p>This game demonstrates the free-rider problem, where some individuals might benefit from public goods without contributing their fair share.</p>
      </div>
      <div className="concept">
        <h3>Conditional Cooperation</h3>
        <p>Some players may adopt a strategy of conditional cooperation, adjusting their contributions based on the behavior of others.</p>
      </div>
      <div className="concept">
        <h3>Multiplier Effect</h3>
        <p>The multiplier in this game represents the increased value of collective action, showing how cooperation can lead to greater overall benefits.</p>
      </div>
      <div className="concept">
        <h3>External Shocks</h3>
        <p>Random events (disasters or windfalls) simulate real-world uncertainties and their impact on collective decision-making.</p>
      </div>
    </div>
  );
};

export default InfoSection;

