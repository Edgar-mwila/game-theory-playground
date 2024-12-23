import { useState } from 'react';
import { Scenario } from '../data/scenarios';

interface ScenarioSectionProps {
  scenario: Scenario;
  onNext: () => void;
}

const ScenarioSection: React.FC<ScenarioSectionProps> = ({ scenario, onNext }) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{scenario.title}</h2>
      <p className="mb-4">{scenario.description}</p>
      
      {!showFeedback ? (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Make your choice:</h3>
          <div className="space-y-2">
            {scenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="block w-full text-left p-2 bg-blue-500 hover:bg-blue-700 border rounded"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Feedback:</h3>
          <p>{scenario.feedback[selectedChoice || 0]}</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Explanation:</h3>
          <p>{scenario.explanation}</p>
          {scenario.gameTheoryContent && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Game Theory Insight:</h4>
              <p>{scenario.gameTheoryContent}</p>
            </div>
          )}
        </div>
      )}
      
      {showFeedback && (
        <button onClick={() => {
            setSelectedChoice(null); 
            setShowFeedback(false); 
            onNext();
          }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Next Scenario
        </button>
      )}
    </div>
  );
};

export default ScenarioSection;

