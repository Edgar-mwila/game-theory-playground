import { useState, useEffect } from "react";
import { BookOpen, Award, Home, Shuffle, ChevronRight } from "lucide-react";
import scenarios from "./data/scenarios";

type Scenario = {
  id: number;
  title: string;
  description: string;
  choices: string[];
  feedback: string[];
  explanation: string;
  gameTheoryContent?: string;
  category: string;
};

type ScenarioSectionProps = {
  scenario: Scenario;
  onNext: () => void;
  onUpdateScore: (points: number) => void;
  currentScore: number;
  progress: string;
};

type LeaderboardProps = {
  finalScore: number;
  totalScenarios: number;
  category: string | null;
  onRestart: () => void;
};

const App: React.FC = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredScenarios, setAnsweredScenarios] = useState<number[]>([]);

  const categories = [...new Set(scenarios.map((s) => s.category)), "Random"];

  const filteredScenarios = selectedCategory === "Random"
    ? scenarios
    : scenarios.filter((scenario) => scenario.category === selectedCategory);

  const startChallenge = () => {
    if (filteredScenarios.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredScenarios.length);
      setCurrentScenarioId(filteredScenarios[randomIndex].id);
      setShowLeaderboard(false);
      setScore(0);
      setAnsweredScenarios([]);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setTimeout(startChallenge, 0);
  };

  const nextScenario = () => {
    if (currentScenarioId) {
      const remainingScenarios = filteredScenarios.filter(
        (s) => !answeredScenarios.includes(s.id)
      );

      if (remainingScenarios.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingScenarios.length);
        setCurrentScenarioId(remainingScenarios[randomIndex].id);
        setAnsweredScenarios([...answeredScenarios, currentScenarioId]);
      } else {
        setShowLeaderboard(true);
      }
    }
  };

  const resetGame = () => {
    setSelectedCategory(null);
    setCurrentScenarioId(null);
    setShowLeaderboard(false);
    setScore(0);
    setAnsweredScenarios([]);
  };

  return (
    <div className="min-h-screen">
      {!currentScenarioId && !showLeaderboard && (
        <div className="flex flex-1 flex-col mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Game Theory Through History
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience historical decisions through the lens of game theory. Choose your path and see how your choices compare to actual historical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => handleCategorySelect(category)}
                  className="w-full h-full bg-white p-8 text-left transition-all duration-300 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                    {category === "Random" ? (
                      <Shuffle className="w-6 h-6 text-blue-500" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {category === "Random"
                      ? "Experience scenarios from all categories"
                      : `Explore scenarios from ${category}`}
                  </p>
                  <div className="flex items-center text-blue-500 group-hover:translate-x-2 transition-transform duration-300">
                    Start Challenge
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentScenarioId && (
        <ScenarioSection
          scenario={filteredScenarios.find((s) => s.id === currentScenarioId)!}
          onNext={nextScenario}
          onUpdateScore={(points) => setScore(score + points)}
          currentScore={score}
          progress={`${answeredScenarios.length + 1}/${filteredScenarios.length}`}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          finalScore={score}
          totalScenarios={filteredScenarios.length}
          category={selectedCategory}
          onRestart={resetGame}
        />
      )}

      {(currentScenarioId || showLeaderboard) && (
        <button
          onClick={resetGame}
          className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Home className="w-6 h-6 text-blue-600" />
        </button>
      )}
    </div>
  );
};

const ScenarioSection: React.FC<ScenarioSectionProps> = ({
  scenario,
  onNext,
  onUpdateScore,
  currentScore,
  progress,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChoice = (choiceIndex: number) => {
    setIsAnimating(true);
    setSelectedChoice(choiceIndex);
    setTimeout(() => {
      setShowFeedback(true);
      setIsAnimating(false);
      // Award points based on the choice (example scoring logic)
      const points = choiceIndex === 2 ? 10 : choiceIndex === 1 ? 5 : 3;
      onUpdateScore(points);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-blue-500/20 rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium text-gray-500">{progress}</div>
          <div className="flex items-center">
            <Award className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="font-semibold">{currentScore} points</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">{scenario.title}</h2>
        <p className="text-lg mb-8">{scenario.description}</p>

        {!showFeedback ? (
          <div className="space-y-4">
            {scenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                disabled={isAnimating}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300
                  ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:border-black hover:bg-blue-800'}
                  ${selectedChoice === index ? 'border-black bg-blue-800' : 'border-gray-200'}`}
              >
                <span className="font-medium">{choice}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-black mb-2">Feedback</h3>
              <p>{scenario.feedback[selectedChoice!]}</p>
            </div>

            <div className="p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Historical Context</h3>
              <p>{scenario.explanation}</p>
            </div>

            {scenario.gameTheoryContent && (
              <div className="p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-green-800 mb-2">Game Theory Insight</h3>
                <p>{scenario.gameTheoryContent}</p>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedChoice(null);
                setShowFeedback(false);
                onNext();
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Next Scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Leaderboard: React.FC<LeaderboardProps> = ({
  finalScore,
  totalScenarios,
  category,
  onRestart,
}) => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="bg-gray-700 rounded-xl shadow-lg p-8 text-center">
        <div className="mb-8">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
          <p className="text-black">
            You've completed the {category} challenge with {finalScore} points
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{finalScore}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((finalScore / (totalScenarios * 10)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Performance</div>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Try Another Category
        </button>
      </div>
    </div>
  );
};

export default App;
