import React from 'react';
import '../styles/InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2>Game Theory Concepts</h2>
      <div className="concept">
        <h3>Nash Equilibrium</h3>
        <p>In the Prisoner's Dilemma, mutual defection is the Nash Equilibrium - a state where no player can benefit by unilaterally changing their strategy.</p>
      </div>
      <div className="concept">
        <h3>Dominant Strategy</h3>
        <p>Defecting is the dominant strategy because it gives a better payoff regardless of what the other player does.</p>
      </div>
      <div className="concept">
        <h3>Social Optimum</h3>
        <p>Mutual cooperation leads to the best collective outcome, but it's unstable due to individual incentives to defect.</p>
      </div>
      <div className="concept">
        <h3>Iterated Prisoner's Dilemma</h3>
        <p>When the game is played repeatedly, new strategies like Tit-for-Tat can emerge, potentially leading to more cooperative outcomes.</p>
      </div>
    </div>
  );
};

export default InfoSection;

