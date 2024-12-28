export type AIMode = 'rational' | 'random' | 'adaptive' | 'tit-for-tat'
export type PlayerType = 'human' | 'ai'
export type Decision = 'cooperate' | 'betray'
export type GameState = 'setup' | 'play' | 'results'

export interface Player {
  id: number
  name: string
  type: PlayerType
  aiMode?: AIMode
  score: number
  decisions: Decision[]
}

export interface RoundResult {
  decisions: Record<number, Decision>
  scores: Record<number, number>
  insight: string
}

