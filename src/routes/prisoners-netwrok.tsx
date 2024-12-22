import { createFileRoute } from '@tanstack/react-router'
import Game from '../games/prisoners-network/App'

export const Route = createFileRoute('/prisoners-netwrok')({
  component: Game,
})
