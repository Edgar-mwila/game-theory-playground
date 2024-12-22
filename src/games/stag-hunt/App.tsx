import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameInterface from './components/GameInterface';
import InfoSection from './components/InfoSection';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>The Stag Hunt Dilemma</h1>
      <p className="subtitle">A Twist on Classic Game Theory</p>
      <GameProvider>
        <div className="container">
          <GameInterface />
          <InfoSection />
        </div>
      </GameProvider>
    </div>
  );
};

export default App;

