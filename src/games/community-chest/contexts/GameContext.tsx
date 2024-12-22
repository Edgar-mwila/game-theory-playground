import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type PlayerType = 'human' | 'cooperative' | 'freerider' | 'conditional';
type EventType = 'normal' | 'disaster' | 'windfall';

interface Player {
  id: number;
  type: PlayerType;
  tokens: number;
  contribution: number;
}

interface GameContextType {
  players: Player[];
  currentPlayer: number;
  round: number;
  communityChest: number;
  multiplier: number;
  eventType: EventType;
  gamePhase: 'setup' | 'contribution' | 'event' | 'distribution' | 'analysis';
  setPlayers: (players: Player[]) => void;
  makeContribution: (playerId: number, amount: number) => void;
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
  const [round, setRound] = useState(1);
  const [communityChest, setCommunityChest] = useState(0);
  const [multiplier, setMultiplier] = useState(1.5);
  const [eventType, setEventType] = useState<EventType>('normal');
  const [gamePhase, setGamePhase] = useState<'setup' | 'contribution' | 'event' | 'distribution' | 'analysis'>('setup');
  const [analysis, setAnalysis] = useState('');

  const makeContribution = useCallback((playerId: number, amount: number) => {
    setPlayers(prevPlayers => prevPlayers.map(player => 
      player.id === playerId 
        ? { ...player, tokens: player.tokens - amount, contribution: amount }
        : player
    ));
    setCommunityChest(prev => prev + amount);

    if (playerId === players.length - 1) {
      setGamePhase('event');
    } else {
      setCurrentPlayer(prev => prev + 1);
    }
  }, [players.length]);

  const distributeRewards = useCallback(() => {
    const totalReward = communityChest * multiplier;
    const rewardPerPlayer = totalReward / players.length;

    setPlayers(prevPlayers => prevPlayers.map(player => ({
      ...player,
      tokens: player.tokens + rewardPerPlayer
    })));

    let analysisText = `Round ${round} results:\n`;
    analysisText += `Total contributions: ${communityChest}\n`;
    analysisText += `Multiplier: ${multiplier}\n`;
    analysisText += `Total reward: ${totalReward}\n`;
    analysisText += `Reward per player: ${rewardPerPlayer}\n\n`;

    players.forEach(player => {
      const netGain = rewardPerPlayer - player.contribution;
      analysisText += `Player ${player.id + 1} (${player.type}):\n`;
      analysisText += `  Contributed: ${player.contribution}\n`;
      analysisText += `  Received: ${rewardPerPlayer}\n`;
      analysisText += `  Net gain: ${netGain}\n\n`;
    });

    if (eventType === 'disaster') {
      analysisText += "A disaster struck! The community chest was reduced, highlighting the importance of cooperation in times of crisis.\n";
    } else if (eventType === 'windfall') {
      analysisText += "A windfall occurred! The community chest was increased, showing how unexpected positive events can benefit the entire community.\n";
    }

    analysisText += "This round demonstrates key concepts of the Public Goods Game:\n";
    analysisText += "1. The tension between individual and collective interests\n";
    analysisText += "2. The impact of different player strategies on overall outcomes\n";
    analysisText += "3. How external events can affect group dynamics and decision-making\n";

    setAnalysis(analysisText);
    setGamePhase('analysis');
  }, [communityChest, multiplier, players, round, eventType]);

  const handleEvent = useCallback(() => {
    const eventRoll = Math.random();
    if (eventRoll < 0.2) {
      setEventType('disaster');
      setCommunityChest(prev => Math.max(prev * 0.5, 0));
      setMultiplier(1.2);
    } else if (eventRoll > 0.8) {
      setEventType('windfall');
      setCommunityChest(prev => prev * 1.5);
      setMultiplier(1.8);
    } else {
      setEventType('normal');
      setMultiplier(1.5);
    }
    setGamePhase('distribution');
  }, []);

  const startNewRound = useCallback(() => {
    setRound(prev => prev + 1);
    setCurrentPlayer(0);
    setCommunityChest(0);
    setMultiplier(1.5);
    setEventType('normal');
    setPlayers(prevPlayers => prevPlayers.map(player => ({
      ...player,
      contribution: 0
    })));
    setGamePhase('contribution');
  }, []);

  useEffect(() => {
    if (gamePhase === 'event') {
      handleEvent();
    } else if (gamePhase === 'distribution') {
      distributeRewards();
    }
  }, [gamePhase, handleEvent, distributeRewards]);

  useEffect(() => {
    if (players.length > 0 && gamePhase === 'setup') {
      startNewRound();
    }
  }, [players, gamePhase, startNewRound]);

  return (
    <GameContext.Provider value={{
      players,
      currentPlayer,
      round,
      communityChest,
      multiplier,
      eventType,
      gamePhase,
      setPlayers,
      makeContribution,
      startNewRound,
      analysis
    }}>
      {children}
    </GameContext.Provider>
  );
};

