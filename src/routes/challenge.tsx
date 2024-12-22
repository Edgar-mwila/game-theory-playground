import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenge')({
  component: RouteComponent,
})

function RouteComponent() {
  return 
    <div>
        <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            COMING SOON
        </h1>
    </div>
}
