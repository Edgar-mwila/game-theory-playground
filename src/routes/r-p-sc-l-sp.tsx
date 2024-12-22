import { createFileRoute } from '@tanstack/react-router'
import Game from '../games/r-p-sc-l-sp/App'

export const Route = createFileRoute('/r-p-sc-l-sp')({
  component: Game,
})

