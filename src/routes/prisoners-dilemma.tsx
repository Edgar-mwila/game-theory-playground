import { createFileRoute } from '@tanstack/react-router'
import Game from '../games/prisoners_dilemma/App';

export const Route = createFileRoute('/prisoners-dilemma')({
  component: Game,
})

