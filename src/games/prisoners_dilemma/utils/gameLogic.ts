import { Player, Decision } from '../types'

export function makeDecision(player: Player, allPlayers: Player[], currentRound: number): Decision {
  switch (player.aiMode) {
    case 'rational':
      return 'betray' // Always betray as it's the dominant strategy
    case 'random':
      return Math.random() < 0.5 ? 'cooperate' : 'betray'
    case 'adaptive':
      const cooperationRate = player.decisions.filter(d => d === 'cooperate').length / player.decisions.length
      return Math.random() < cooperationRate ? 'cooperate' : 'betray'
    case 'tit-for-tat':
      if (currentRound === 1) return 'cooperate'
      const lastRoundDecisions = allPlayers.map(p => p.decisions[p.decisions.length - 1])
      return lastRoundDecisions.every(d => d === 'cooperate') ? 'cooperate' : 'betray'
    default:
      return 'cooperate'
  }
}

export function calculateScores(decisions: Record<number, Decision>, playerCount: number): Record<number, number> {
  const scores: Record<number, number> = {}
  const players = Object.keys(decisions).map(Number)

  for (let i = 0; i < players.length; i++) {
    scores[players[i]] = 0
    for (let j = 0; j < players.length; j++) {
      if (i !== j) {
        scores[players[i]] += getScore(decisions[players[i]], decisions[players[j]], playerCount)
      }
    }
  }

  return scores
}

function getScore(myDecision: Decision, otherDecision: Decision, playerCount: number): number {
  if (myDecision === 'cooperate' && otherDecision === 'cooperate') return 3
  if (myDecision === 'cooperate' && otherDecision === 'betray') return 0
  if (myDecision === 'betray' && otherDecision === 'cooperate') return 5
  return 1 // Both betray
}

export function getInsight(decisions: Record<number, Decision>, scores: Record<number, number>, playerCount: number): string {
  const allCooperated = Object.values(decisions).every(d => d === 'cooperate')
  const allBetrayed = Object.values(decisions).every(d => d === 'betray')
  const mixed = !allCooperated && !allBetrayed

  let insight = ""

  if (allCooperated) {
    insight = "All players cooperated, leading to a positive outcome for everyone. This demonstrates the potential benefits of mutual cooperation in repeated games."
  } else if (allBetrayed) {
    insight = "All players chose to betray, resulting in a suboptimal outcome for everyone. This illustrates the 'tragedy of the commons' where individual rationality leads to collective irrationality."
  } else {
    const betrayers = Object.entries(decisions).filter(([_, d]) => d === 'betray').map(([id, _]) => id)
    const highestScore = Math.max(...Object.values(scores))
    const winners = Object.entries(scores).filter(([_, score]) => score === highestScore).map(([id, _]) => id)

    insight = `In this round, ${betrayers.length > 1 ? 'some players' : 'one player'} chose to betray while others cooperated. ${
      winners.length > 1 ? 'The players' : 'The player'
    } who gained the most this round ${winners.length > 1 ? 'were' : 'was'} ${winners.join(', ')}. 
    This outcome demonstrates the short-term benefits of betrayal, but consider how it might affect future rounds and overall game dynamics.`
  }

  insight += `\n\nWith ${playerCount} players, the game dynamics become more complex. `

  if (playerCount === 2) {
    insight += "In a two-player game, decisions have a direct and immediate impact on each other. The classic dilemma between self-interest and mutual benefit is most apparent."
  } else if (playerCount === 3) {
    insight += "In a three-player game, coalition forming becomes possible. Two players might cooperate against a third, or all three might try to outmaneuver each other."
  } else {
    insight += "With four players, the game becomes even more complex. Group dynamics play a larger role, and the impact of individual decisions can be less direct but potentially more far-reaching."
  }

  return insight
}

