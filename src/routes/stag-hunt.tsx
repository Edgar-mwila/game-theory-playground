import { createFileRoute } from '@tanstack/react-router'
import Game from '../games/stag-hunt/App'

export const Route = createFileRoute('/stag-hunt')({
  component: Game,
})

