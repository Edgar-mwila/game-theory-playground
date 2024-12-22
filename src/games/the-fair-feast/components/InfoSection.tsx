import React from 'react';
import '../styles/InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2>Game Theory Concepts</h2>
      <div className="concept">
        <h3>Multi-Player Ultimatum Game</h3>
        <p>This game extends the classic two-player Ultimatum Game to multiple players, introducing more complex dynamics and strategic considerations.</p>
      </div>
      <div className="concept">
        <h3>Fairness vs. Self-Interest</h3>
        <p>Players must balance the desire for personal gain against the risk of having their offers rejected. This tension between fairness and self-interest is a key aspect of the game.</p>
      </div>
      <div className="concept">
        <h3>Coalition Formation</h3>
        <p>With multiple players, there's potential for informal coalitions to form, where players may favor each other in their offers to gain an advantage over others.</p>
      </div>
      <div className="concept">
        <h3>Reputation Effects</h3>
        <p>Over multiple rounds, players may develop reputations based on their past behavior, influencing how others interact with them in future rounds.</p>
      </div>
      <div className="concept">
        <h3>AI Strategies</h3>
        <p>The different AI types (Fair, Greedy, Random) showcase various approaches to decision-making, illustrating how different strategies can perform in a multi-player, repeated game scenario.</p>
      </div>
    </div>
  );
};

export default InfoSection;

