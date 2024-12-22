import React from 'react';
import '../styles/InfoSection.css';

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <h2>Game Theory Concepts</h2>
      <div className="concept">
        <h3>Network Effects</h3>
        <p>In this game, the actions of prisoners within a cell block affect each other, demonstrating how individual choices can have broader impacts in interconnected systems.</p>
      </div>
      <div className="concept">
        <h3>Coordination Problems</h3>
        <p>Prisoners face the challenge of coordinating their actions without direct communication, illustrating the difficulties of achieving optimal outcomes in group settings.</p>
      </div>
      <div className="concept">
        <h3>Prisoner's Dilemma</h3>
        <p>Each round presents a variation of the classic Prisoner's Dilemma, where individual incentives may conflict with group benefits.</p>
      </div>
      <div className="concept">
        <h3>Repeated Games</h3>
        <p>The multi-round nature of the game allows for the development of strategies over time, showing how repeated interactions can influence decision-making.</p>
      </div>
      <div className="concept">
        <h3>Emergent Behavior</h3>
        <p>The collective actions of prisoners can lead to emergent patterns of cooperation or defection, demonstrating how complex behaviors can arise from simple rules.</p>
      </div>
    </div>
  );
};

export default InfoSection;

