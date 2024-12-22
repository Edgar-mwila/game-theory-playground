import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type PlayerType = 'human' | 'fair' | 'greedy' | 'random';

interface Player {
  id: number;
  type: PlayerType;
  score: number;
}

interface Offer {
  from: number;
  to: number;
  amount: number;
}

interface GameContextType {
  players: Player[];
  currentPlayer: number;
  totalPizza: number;
  currentOffer: Offer | null;
  round: number;
  gamePhase: 'setup' | 'offer' | 'response' | 'analysis';
  setPlayers: (players: Player[]) => void;
  setTotalPizza: (total: number) => void;
  makeOffer: (from: number, to: number, amount: number) => void;
  respondToOffer: (accepted: boolean) => void;
  startNewRound: () => void;
  analysis: string;
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
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [totalPizza, setTotalPizza] = useState(0);
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);
  const [round, setRound] = useState(1);
  const [gamePhase, setGamePhase] = useState<'setup' | 'offer' | 'response' | 'analysis'>('setup');
  const [analysis, setAnalysis] = useState('');

  const makeOffer = useCallback((from: number, to: number, amount: number) => {
    setCurrentOffer({ from, to, amount });
    setGamePhase('response');
  }, []);

  const respondToOffer = useCallback((accepted: boolean) => {
    if (currentOffer && accepted) {
      setPlayers(prevPlayers => prevPlayers.map(player => {
        if (player.id === currentOffer.from) {
          return { ...player, score: player.score + (totalPizza - currentOffer.amount) };
        }
        if (player.id === currentOffer.to) {
          return { ...player, score: player.score + currentOffer.amount };
        }
        return player;
      }));
    }

    const offerPercentage = currentOffer ? (currentOffer.amount / totalPizza) * 100 : 0;
    let analysisText = `Player ${currentOffer?.from} offered ${offerPercentage.toFixed(1)}% of the pizza to Player ${currentOffer?.to}. `;
    analysisText += accepted ? "The offer was accepted. " : "The offer was rejected. ";

    if (offerPercentage < 30) {
      analysisText += "This was a very low offer, often rejected in real-world experiments.";
    } else if (offerPercentage < 40) {
      analysisText += "This was a low offer, sometimes rejected in favor of fairness.";
    } else if (offerPercentage >= 40 && offerPercentage <= 60) {
      analysisText += "This was a fair offer, commonly accepted in ultimatum games.";
    } else {
      analysisText += "This was a generous offer, almost always accepted in ultimatum games.";
    }

    setAnalysis(analysisText);
    setGamePhase('analysis');
  }, [currentOffer, totalPizza]);

  const startNewRound = useCallback(() => {
    setRound(prevRound => prevRound + 1);
    setCurrentPlayer(prevPlayer => (prevPlayer + 1) % players.length);
    setCurrentOffer(null);
    setGamePhase('offer');
    setTotalPizza(prevTotal => prevTotal + players.length); // Increase pizza each round
  }, [players.length]);

  useEffect(() => {
    if (players.length > 0 && totalPizza > 0 && gamePhase === 'setup') {
      setGamePhase('offer');
    }
  }, [players, totalPizza, gamePhase]);

  return (
    <GameContext.Provider value={{
      players,
      currentPlayer,
      totalPizza,
      currentOffer,
      round,
      gamePhase,
      setPlayers,
      setTotalPizza,
      makeOffer,
      respondToOffer,
      startNewRound,
      analysis
    }}>
      {children}
    </GameContext.Provider>
  );
};

