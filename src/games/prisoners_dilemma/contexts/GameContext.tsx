import React, { createContext, useContext, useState, useCallback } from 'react';

type GameMode = 'human' | 'rational' | 'random' | 'adaptive' | 'tit-for-tat';

interface GameContextType {
  scores: [number, number];
  round: number;
  history: [string, string, [number, number]][];
  currentRoundDecisions: [string | null, string | null];
  gameMode: GameMode;
  makeDecision: (player: 1 | 2, decision: 'cooperate' | 'defect') => void;
  setGameMode: (mode: GameMode) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [round, setRound] = useState(0);
  const [history, setHistory] = useState<[string, string, [number, number]][]>([]);
  const [currentRoundDecisions, setCurrentRoundDecisions] = useState<[string | null, string | null]>([null, null]);
  const [gameMode, setGameMode] = useState<GameMode>('human');

  const payoffMatrix = {
    'cooperate': {
      'cooperate': [-1, -1],
      'defect': [-3, 0]
    },
    'defect': {
      'cooperate': [0, -3],
      'defect': [-2, -2]
    }
  };

  const getAIDecision = useCallback(() => {
    switch (gameMode) {
      case 'rational':
        return 'defect';
      case 'random':
        return Math.random() < 0.5 ? 'cooperate' : 'defect';
      case 'adaptive':
        if (history.length === 0) return 'cooperate';
        return history[history.length - 1][0] as 'cooperate' | 'defect';
      case 'tit-for-tat':
        if (history.length === 0) return 'cooperate';
        return history[history.length - 1][0] as 'cooperate' | 'defect';
      default:
        return 'defect';
    }
  }, [gameMode, history]);

  const makeDecision = useCallback((player: 1 | 2, decision: 'cooperate' | 'defect') => {
    setCurrentRoundDecisions(prev => {
      const newDecisions: [string | null, string | null] = [...prev];
      newDecisions[player - 1] = decision;

      if (gameMode !== 'human' && player === 1) {
        newDecisions[1] = getAIDecision();
      }

      if (newDecisions[0] && newDecisions[1]) {
        const payoffs = payoffMatrix[newDecisions[0] as 'cooperate' | 'defect'][newDecisions[1] as 'cooperate' | 'defect'];
        setScores(prev => [prev[0] + payoffs[0], prev[1] + payoffs[1]]);
        setRound(prev => prev + 1);
        setHistory(prev => [...prev, [newDecisions[0] as string, newDecisions[1] as string, payoffs]]);
        return [null, null];
      }

      return newDecisions;
    });
  }, [gameMode, getAIDecision]);

  const resetGame = useCallback(() => {
    setScores([0, 0]);
    setRound(0);
    setHistory([]);
    setCurrentRoundDecisions([null, null]);
  }, []);

  return (
    <GameContext.Provider value={{
      scores,
      round,
      history,
      currentRoundDecisions,
      gameMode,
      makeDecision,
      setGameMode,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

