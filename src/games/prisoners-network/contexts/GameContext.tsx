import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type PrisonerType = 'human' | 'loyal' | 'selfish' | 'adaptive';
type Action = 'cooperate' | 'defect';
type CellBlock = 'A' | 'B' | 'C' | 'D';

interface Prisoner {
  id: number;
  type: PrisonerType;
  cellBlock: CellBlock;
  sentence: number;
  action: Action | null;
}

interface GameContextType {
  prisoners: Prisoner[];
  currentPrisoner: number;
  round: number;
  gamePhase: 'setup' | 'action' | 'outcome' | 'analysis';
  setPrisoners: (prisoners: Prisoner[]) => void;
  chooseAction: (prisonerId: number, action: Action) => void;
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
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
  const [currentPrisoner, setCurrentPrisoner] = useState(0);
  const [round, setRound] = useState(1);
  const [gamePhase, setGamePhase] = useState<'setup' | 'action' | 'outcome' | 'analysis'>('setup');
  const [analysis, setAnalysis] = useState('');

  const chooseAction = useCallback((prisonerId: number, action: Action) => {
    setPrisoners(prevPrisoners => prevPrisoners.map(prisoner => 
      prisoner.id === prisonerId 
        ? { ...prisoner, action: action }
        : prisoner
    ));

    if (prisonerId === prisoners.length - 1) {
      setGamePhase('outcome');
    } else {
      setCurrentPrisoner(prev => prev + 1);
    }
  }, [prisoners.length]);

  const calculateOutcome = useCallback(() => {
    const newPrisoners = prisoners.map(prisoner => {
      let sentenceChange = 0;
      const cellBlockMates = prisoners.filter(p => p.cellBlock === prisoner.cellBlock);
      const cooperators = cellBlockMates.filter(p => p.action === 'cooperate').length;
      const totalInCellBlock = cellBlockMates.length;

      if (prisoner.action === 'cooperate') {
        sentenceChange = -2 * (cooperators / totalInCellBlock);
      } else {
        sentenceChange = cooperators === 0 ? 1 : -1 * (cooperators / totalInCellBlock);
      }

      return {
        ...prisoner,
        sentence: Math.max(0, prisoner.sentence + sentenceChange),
        action: null
      };
    });

    setPrisoners(newPrisoners);

    let analysisText = `Round ${round} results:\n\n`;
    for (const cellBlock of ['A', 'B', 'C', 'D'] as CellBlock[]) {
      const cellBlockPrisoners = newPrisoners.filter(p => p.cellBlock === cellBlock);
      const cooperators = cellBlockPrisoners.filter(p => p.action === 'cooperate').length;
      const totalInCellBlock = cellBlockPrisoners.length;

      analysisText += `Cell Block ${cellBlock}:\n`;
      analysisText += `Cooperation rate: ${(cooperators / totalInCellBlock * 100).toFixed(2)}%\n`;
      analysisText += `Average sentence change: ${cellBlockPrisoners.reduce((sum, p) => sum + (p.sentence - prisoners.find(op => op.id === p.id)!.sentence), 0) / totalInCellBlock}\n\n`;
    }

    analysisText += "This round demonstrates key concepts of network effects and coordination:\n";
    analysisText += "1. The impact of individual choices on the group outcome\n";
    analysisText += "2. The importance of coordination within cell blocks\n";
    analysisText += "3. The potential for both positive and negative network effects\n";
    analysisText += "4. The tension between short-term individual gain and long-term collective benefit\n";

    setAnalysis(analysisText);
    setGamePhase('analysis');
  }, [prisoners, round]);

  const startNewRound = useCallback(() => {
    setRound(prev => prev + 1);
    setCurrentPrisoner(0);
    setPrisoners(prevPrisoners => prevPrisoners.map(prisoner => ({ ...prisoner, action: null })));
    setGamePhase('action');
  }, []);

  useEffect(() => {
    if (gamePhase === 'outcome') {
      calculateOutcome();
    }
  }, [gamePhase, calculateOutcome]);

  useEffect(() => {
    if (prisoners.length > 0 && gamePhase === 'setup') {
      startNewRound();
    }
  }, [prisoners, gamePhase, startNewRound]);

  return (
    <GameContext.Provider value={{
      prisoners,
      currentPrisoner,
      round,
      gamePhase,
      setPrisoners,
      chooseAction,
      startNewRound,
      analysis
    }}>
      {children}
    </GameContext.Provider>
  );
};

