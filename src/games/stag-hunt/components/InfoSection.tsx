import React from 'react';
import '../styles/InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2>Game Theory Concepts</h2>
      <div className="concept">
        <h3>Stag Hunt Dilemma</h3>
        <p>The Stag Hunt is a game that describes a conflict between safety and social cooperation. The dilemma exemplifies the tension between individual rationality and mutual benefit.</p>
      </div>
      <div className="concept">
        <h3>Nash Equilibrium</h3>
        <p>In this game, there are two pure strategy Nash equilibria: when both players choose to hunt stag and when both choose to hunt hare. This demonstrates how multiple equilibria can exist in a game.</p>
      </div>
      <div className="concept">
        <h3>Risk Dominance vs. Payoff Dominance</h3>
        <p>While hunting stag together provides the highest payoff (payoff dominant), hunting hare is less risky and might be chosen due to uncertainty about the other player's action (risk dominant).</p>
      </div>
      <div className="concept">
        <h3>Coordination and Trust</h3>
        <p>Success in hunting larger prey requires coordination and trust among players. This mirrors real-world scenarios where cooperation can lead to greater rewards but also carries higher risks.</p>
      </div>
      <div className="concept">
        <h3>Environmental Factors</h3>
        <p>The changing environment in each round demonstrates how external factors can influence game outcomes and strategy selection, a key consideration in applied game theory.</p>
      </div>
    </div>
  );
};

export default InfoSection;

