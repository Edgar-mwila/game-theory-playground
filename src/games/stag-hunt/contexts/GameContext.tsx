import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type PlayerType = 'human' | 'cooperative' | 'selfish' | 'adaptive';
type PreyType = 'stag' | 'deer' | 'rabbit' | 'squirrel';
type Environment = 'forest' | 'plains' | 'mountains';

interface Player {
  id: number;
  type: PlayerType;
  score: number;
}

interface Prey {
  type: PreyType;
  value: number;
  riskFactor: number;
  minHunters: number;
}

interface GameContextType {
  players: Player[];
  currentPlayer: number;
  environment: Environment;
  availablePrey: Prey[];
  round: number;
  timeLeft: number;
  gamePhase: 'setup' | 'hunt' | 'result' | 'analysis';
  setPlayers: (players: Player[]) => void;
  chooseTarget: (playerId: number, target: PreyType) => void;
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

const ROUND_TIME = 20; // seconds

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [environment, setEnvironment] = useState<Environment>('forest');
  const [availablePrey, setAvailablePrey] = useState<Prey[]>([]);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [gamePhase, setGamePhase] = useState<'setup' | 'hunt' | 'result' | 'analysis'>('setup');
  const [analysis, setAnalysis] = useState('');
  const [playerChoices, setPlayerChoices] = useState<Record<number, PreyType>>({});

  const generatePrey = useCallback((env: Environment): Prey[] => {
    const basePreys: Prey[] = [
      { type: 'stag', value: 100, riskFactor: 0.7, minHunters: 3 },
      { type: 'deer', value: 60, riskFactor: 0.5, minHunters: 2 },
      { type: 'rabbit', value: 20, riskFactor: 0.2, minHunters: 1 },
      { type: 'squirrel', value: 10, riskFactor: 0.1, minHunters: 1 },
    ];

    return basePreys.map(prey => {
      let envFactor = 1;
      switch (env) {
        case 'forest':
          envFactor = prey.type === 'squirrel' ? 1.2 : 1;
          break;
        case 'plains':
          envFactor = prey.type === 'deer' ? 1.2 : 1;
          break;
        case 'mountains':
          envFactor = prey.type === 'stag' ? 1.2 : 1;
          break;
      }
      return { ...prey, value: Math.round(prey.value * envFactor) };
    });
  }, []);

  const chooseTarget = useCallback((playerId: number, target: PreyType) => {
    setPlayerChoices(prev => ({ ...prev, [playerId]: target }));
    if (Object.keys(playerChoices).length === players.length - 1) {
      setGamePhase('result');
    }
  }, [players.length, playerChoices]);

  const calculateResults = useCallback(() => {
    const preyCount: Record<PreyType, number> = { stag: 0, deer: 0, rabbit: 0, squirrel: 0 };
    let analysisText = '';

    Object.values(playerChoices).forEach(choice => {
      preyCount[choice]++;
    });

    const updatedPlayers = players.map(player => {
      const choice = playerChoices[player.id];
      const chosenPrey = availablePrey.find(prey => prey.type === choice);
      if (!chosenPrey) return player;

      let success = Math.random() > chosenPrey.riskFactor;
      if (preyCount[choice] >= chosenPrey.minHunters) {
        success = true;
      }

      const newScore = success ? player.score + chosenPrey.value : player.score;
      analysisText += `Player ${player.id + 1} chose ${choice} and ${success ? 'succeeded' : 'failed'}. `;

      return { ...player, score: newScore };
    });

    setPlayers(updatedPlayers);
    analysisText += `\n\nIn this round, we saw ${preyCount.stag} players go for the stag, ${preyCount.deer} for deer, ${preyCount.rabbit} for rabbits, and ${preyCount.squirrel} for squirrels. `;
    
    if (preyCount.stag >= 3) {
      analysisText += "The stag hunters demonstrated successful cooperation, maximizing their collective gain. ";
    } else if (preyCount.stag > 0) {
      analysisText += "Some players aimed for the high-risk, high-reward stag but failed due to lack of coordination. ";
    }

    if (preyCount.deer >= 2) {
      analysisText += "Deer hunters showed a balanced approach between risk and reward. ";
    }

    if (preyCount.rabbit > 0 || preyCount.squirrel > 0) {
      analysisText += "Some players opted for safer, individual strategies with rabbits and squirrels. ";
    }

    analysisText += `\n\nThis round's environment (${environment}) affected the prey values, demonstrating how external factors can influence game outcomes.`;

    setAnalysis(analysisText);
  }, [players, playerChoices, availablePrey, environment]);

  const startNewRound = useCallback(() => {
    setRound(prev => prev + 1);
    setCurrentPlayer(0);
    setPlayerChoices({});
    setTimeLeft(ROUND_TIME);
    setGamePhase('hunt');
    const newEnvironment = ['forest', 'plains', 'mountains'][Math.floor(Math.random() * 3)] as Environment;
    setEnvironment(newEnvironment);
    setAvailablePrey(generatePrey(newEnvironment));
  }, [generatePrey]);

  useEffect(() => {
    if (gamePhase === 'hunt') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGamePhase('result');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === 'result') {
      calculateResults();
      setGamePhase('analysis');
    }
  }, [gamePhase, calculateResults]);

  useEffect(() => {
    if (players.length > 0 && gamePhase === 'setup') {
      startNewRound();
    }
  }, [players, gamePhase, startNewRound]);

  return (
    <GameContext.Provider value={{
      players,
      currentPlayer,
      environment,
      availablePrey,
      round,
      timeLeft,
      gamePhase,
      setPlayers,
      chooseTarget,
      startNewRound,
      analysis
    }}>
      {children}
    </GameContext.Provider>
  );
};

