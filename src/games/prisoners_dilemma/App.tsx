import React, { useState } from 'react';
import GameInterface from './components/GameInterface';
import InfoSection from './components/InfoSection';
import { GameProvider } from './contexts/GameContext';
import './styles/App.css';

const App: React.FC = () => {
  const [gameKey, setGameKey] = useState(0);

  const resetGame = () => {
    setGameKey(prevKey => prevKey + 1);
  };

  return (
    <div className="app">
      <h1>Prisoner's Dilemma Interactive Learning Platform</h1>
      <div className="container">
        <GameProvider key={gameKey}>
          <GameInterface onResetGame={resetGame} />
          <InfoSection />
        </GameProvider>
      </div>
    </div>
  );
};

export default App;

