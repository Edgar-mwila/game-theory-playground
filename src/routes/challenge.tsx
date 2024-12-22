import { createFileRoute } from '@tanstack/react-router'
import Challenge from '../games/challenge/App'

export const Route = createFileRoute('/challenge')({
  component:Challenge,
})

