import { useState } from 'react';
import HeroSection from './components/HeroSection';
import ScenarioSection from './components/ScenarioSection';
import Leaderboard from './components/Leaderboard';
import scenarios from './data/scenarios';

function App() {
  const [currentScenarioId, setCurrentScenarioId] = useState<number | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const startChallenge = () => {
    setCurrentScenarioId(1);
    setShowLeaderboard(false);
  };

  const nextScenario = () => {
    if (currentScenarioId && currentScenarioId < scenarios.length) {
      setCurrentScenarioId(currentScenarioId + 1);
    } else {
      setShowLeaderboard(true);
    }
  };

  return (
    <div className="min-h-screen">
      {!currentScenarioId && !showLeaderboard && (
        <HeroSection onStart={startChallenge} />
      )}
      {currentScenarioId && (
        <ScenarioSection
          scenario={scenarios.find(s => s.id === currentScenarioId)!}
          onNext={nextScenario}
        />
      )}
      {showLeaderboard && (
        <Leaderboard onRestart={startChallenge} />
      )}
    </div>
  );
}

export default App;

