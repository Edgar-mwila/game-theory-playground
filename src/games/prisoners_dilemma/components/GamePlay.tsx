import { useState, useEffect } from 'react'
import { Player, Decision, RoundResult } from '../types'
import { makeDecision, calculateScores, getInsight } from '../utils/gameLogic'

interface GamePlayProps {
  players: Player[]
  currentRound: number
  maxRounds: number
  onNextRound: () => void
  onGameEnd: () => void
}

export function GamePlay({ players, currentRound, maxRounds, onNextRound, onGameEnd }: GamePlayProps) {
  const [decisions, setDecisions] = useState<Record<number, Decision>>({})
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null)
  const [showAIDecisions, setShowAIDecisions] = useState(false)

  useEffect(() => {
    const humanPlayers = players.filter(p => p.type === 'human')
    const allHumansDecided = humanPlayers.every(p => decisions[p.id])

    if (allHumansDecided) {
      players.forEach(player => {
        if (player.type === 'ai' && !decisions[player.id]) {
          const aiDecision = makeDecision(player, players, currentRound)
          setDecisions(prev => ({ ...prev, [player.id]: aiDecision }))
        }
      })
      setShowAIDecisions(true)
    }

    if (Object.keys(decisions).length === players.length) {
      const scores = calculateScores(decisions, players.length)
      const insight = getInsight(decisions, scores, players.length)
      setRoundResult({ decisions, scores, insight })
    }
  }, [decisions, players, currentRound])

  const handleDecision = (playerId: number, decision: Decision) => {
    setDecisions(prev => ({ ...prev, [playerId]: decision }))
  }

  const handleNextRound = () => {
    players.forEach(player => {
      player.decisions.push(decisions[player.id])
      player.score += roundResult!.scores[player.id]
    })
    setDecisions({})
    setRoundResult(null)
    setShowAIDecisions(false)
    if (currentRound === maxRounds) {
      onGameEnd()
    } else {
      onNextRound()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-yellow-300">Round {currentRound} of {maxRounds}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(player => (
          <div key={player.id} className="bg-purple-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{player.name}</h3>
            <p className="text-purple-200 mb-4">Score: {player.score}</p>
            {player.type === 'human' && !decisions[player.id] && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDecision(player.id, 'cooperate')}
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
                >
                  Cooperate
                </button>
                <button
                  onClick={() => handleDecision(player.id, 'betray')}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                >
                  Betray
                </button>
              </div>
            )}
            {(player.type === 'human' || showAIDecisions) && decisions[player.id] && (
              <p className="text-lg font-medium">
                Decision: <span className={decisions[player.id] === 'cooperate' ? 'text-green-300' : 'text-red-300'}>
                  {decisions[player.id]}
                </span>
              </p>
            )}
            {player.type === 'ai' && !showAIDecisions && (
              <p className="text-lg font-medium">Decision: <span className="text-yellow-300">Pending...</span></p>
            )}
          </div>
        ))}
      </div>
      <div className="bg-purple-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-300">Reward Matrix</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-600 p-4 rounded-md text-center">
            <p className="font-semibold mb-2">Both Cooperate</p>
            <p className="text-2xl text-green-300">+3 points each</p>
          </div>
          <div className="bg-purple-600 p-4 rounded-md text-center">
            <p className="font-semibold mb-2">Both Betray</p>
            <p className="text-2xl text-red-300">+1 point each</p>
          </div>
          <div className="bg-purple-600 p-4 rounded-md text-center col-span-2">
            <p className="font-semibold mb-2">One Cooperates, One Betrays</p>
            <p className="text-2xl">
              <span className="text-red-300">+5 points</span> for betrayer, 
              <span className="text-green-300"> +0 points</span> for cooperator
            </p>
          </div>
        </div>
      </div>
      {roundResult && (
        <div className="bg-purple-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Round Result</h3>
          <p className="text-purple-200 mb-4">{roundResult.insight}</p>
          <button
            onClick={handleNextRound}
            className="w-full py-2 px-4 bg-yellow-500 text-purple-900 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
          >
            Next Round
          </button>
        </div>
      )}
    </div>
  )
}

