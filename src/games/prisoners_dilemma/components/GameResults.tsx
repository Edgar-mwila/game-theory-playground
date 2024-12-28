import { Player } from '../types'

interface GameResultsProps {
  players: Player[]
  onRestart: () => void
}

export function GameResults({ players, onRestart }: GameResultsProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-300">Game Results</h2>
      {sortedPlayers.map((player, index) => (
        <div key={player.id} className="bg-purple-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">
            {index === 0 ? '🏆 ' : ''}{player.name}
          </h3>
          <p className="text-purple-200 mb-2">Final Score: {player.score}</p>
          <p className="text-purple-200">
            Cooperation Rate: {(player.decisions.filter(d => d === 'cooperate').length / player.decisions.length * 100).toFixed(2)}%
          </p>
        </div>
      ))}
      <button
        onClick={onRestart}
        className="w-full py-2 px-4 bg-yellow-500 text-purple-900 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
      >
        Play Again
      </button>
    </div>
  )
}

