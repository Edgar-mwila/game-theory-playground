'use client'

import { useState } from 'react'
import { GameSetup } from './components/GameSetup'
import { GamePlay } from './components/GamePlay'
import { GameResults } from './components/GameResults'
import { Player, GameState } from './types'

export default function PrisonersDilemmaPage() {
  const [gameState, setGameState] = useState<GameState>('setup')
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [maxRounds, setMaxRounds] = useState(10)

  const startGame = (setupPlayers: Player[], rounds: number) => {
    setPlayers(setupPlayers)
    setMaxRounds(rounds)
    setGameState('play')
  }

  const endGame = () => {
    setGameState('results')
  }

  const resetGame = () => {
    setGameState('setup')
    setPlayers([])
    setCurrentRound(1)
  }

  return (
    <div className="min-h-screen bg-purple-800 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-300">Enhanced Prisoner's Dilemma</h1>
        {gameState === 'setup' && <GameSetup onStart={startGame} />}
        {gameState === 'play' && (
          <GamePlay
            players={players}
            currentRound={currentRound}
            maxRounds={maxRounds}
            onNextRound={() => setCurrentRound(prev => prev + 1)}
            onGameEnd={endGame}
          />
        )}
        {gameState === 'results' && <GameResults players={players} onRestart={resetGame} />}
      </div>
    </div>
  )
}

