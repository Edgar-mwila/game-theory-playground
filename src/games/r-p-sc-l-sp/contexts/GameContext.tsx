import React, { createContext, useContext, useState, useCallback } from 'react';

type Move = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
type GameMode = 'human' | 'random' | 'cyclic' | 'adaptive';

interface GameContextType {
  playerScore: number;
  computerScore: number;
  round: number;
  playerMove: Move | null;
  computerMove: Move | null;
  gameMode: GameMode;
  result: string | null;
  makeMove: (move: Move) => void;
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
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(0);
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [computerMove, setComputerMove] = useState<Move | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('random');
  const [result, setResult] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

  const rules: Record<Move, Move[]> = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors'],
  };

  const getComputerMove = useCallback((): Move => {
    const moves: Move[] = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    switch (gameMode) {
      case 'random':
        return moves[Math.floor(Math.random() * moves.length)];
      case 'cyclic':
        return moves[round % moves.length];
      case 'adaptive':
        if (moveHistory.length === 0) return moves[Math.floor(Math.random() * moves.length)];
        const lastPlayerMove = moveHistory[moveHistory.length - 1];
        const winningMoves = moves.filter(move => rules[move].includes(lastPlayerMove));
        return winningMoves[Math.floor(Math.random() * winningMoves.length)];
      default:
        return moves[Math.floor(Math.random() * moves.length)];
    }
  }, [gameMode, round, moveHistory]);

  const makeMove = useCallback((move: Move) => {
    const computerMoveResult = getComputerMove();
    setPlayerMove(move);
    setComputerMove(computerMoveResult);
    setMoveHistory(prev => [...prev, move]);

    if (move === computerMoveResult) {
      setResult("It's a tie!");
    } else if (rules[move].includes(computerMoveResult)) {
      setResult('You win!');
      setPlayerScore(prev => prev + 1);
    } else {
      setResult('Computer wins!');
      setComputerScore(prev => prev + 1);
    }

    setRound(prev => prev + 1);
  }, [getComputerMove]);

  const resetGame = useCallback(() => {
    setPlayerScore(0);
    setComputerScore(0);
    setRound(0);
    setPlayerMove(null);
    setComputerMove(null);
    setResult(null);
    setMoveHistory([]);
  }, []);

  return (
    <GameContext.Provider value={{
      playerScore,
      computerScore,
      round,
      playerMove,
      computerMove,
      gameMode,
      result,
      makeMove,
      setGameMode,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

