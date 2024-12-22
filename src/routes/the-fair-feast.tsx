import { createFileRoute } from '@tanstack/react-router'
import Game from '../games/the-fair-feast/App'

export const Route = createFileRoute('/the-fair-feast')({
  component: Game,
})

