import { useState } from 'react'
import { Player, PlayerType, AIMode } from '../types'

interface GameSetupProps {
  onStart: (players: Player[], rounds: number) => void
}

export function GameSetup({ onStart }: GameSetupProps) {
  const [numPlayers, setNumPlayers] = useState(2)
  const [rounds, setRounds] = useState(10)
  const [players, setPlayers] = useState<Player[]>([])

  const handlePlayerChange = (index: number, field: keyof Player, value: string) => {
    const updatedPlayers = [...players]
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value,
      score: 0,
      decisions: []
    }
    setPlayers(updatedPlayers)
  }

  const handleStart = () => {
    if (players.length === numPlayers && players.every(p => p.name)) {
      onStart(players, rounds)
    }
  }

  return (
    <div className="space-y-6 bg-purple-700 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <label htmlFor="numPlayers" className="block text-sm font-medium text-purple-200 mb-1">
            Number of Players
          </label>
          <input
            id="numPlayers"
            type="number"
            min={2}
            max={4}
            value={numPlayers}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              setNumPlayers(value)
              setPlayers(Array(value).fill(null).map((_, i) => ({
                id: i,
                name: '',
                type: 'human',
                score: 0,
                decisions: []
              })))
            }}
            className="w-full px-3 py-2 bg-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="rounds" className="block text-sm font-medium text-purple-200 mb-1">
            Number of Rounds
          </label>
          <input
            id="rounds"
            type="number"
            min={5}
            max={20}
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-purple-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
      </div>
      {players.map((player, index) => (
        <div key={index} className="space-y-2 bg-purple-600 p-4 rounded-md">
          <label htmlFor={`player${index}`} className="block text-sm font-medium text-purple-200">
            Player {index + 1}
          </label>
          <input
            id={`player${index}`}
            value={player.name}
            onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
            placeholder="Player Name"
            className="w-full px-3 py-2 bg-purple-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <select
            value={player.type}
            onChange={(e) => handlePlayerChange(index, 'type', e.target.value as PlayerType)}
            className="w-full px-3 py-2 bg-purple-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <option value="human">Human</option>
            <option value="ai">AI</option>
          </select>
          {player.type === 'ai' && (
            <select
              value={player.aiMode}
              onChange={(e) => handlePlayerChange(index, 'aiMode', e.target.value as AIMode)}
              className="w-full px-3 py-2 bg-purple-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option value="rational">Rational</option>
              <option value="random">Random</option>
              <option value="adaptive">Adaptive</option>
              <option value="tit-for-tat">Tit-for-Tat</option>
            </select>
          )}
        </div>
      ))}
      <button
        onClick={handleStart}
        className="w-full py-2 px-4 bg-yellow-500 text-purple-900 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
      >
        Start Game
      </button>
    </div>
  )
}

