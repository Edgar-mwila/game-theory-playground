import { createFileRoute } from '@tanstack/react-router'
import Game from '../games/community-chest/App'

export const Route = createFileRoute('/community-chest')({
  component: Game,
})
