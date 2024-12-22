import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

const games = [
  {
    title: "Prisoner's Network",
    description: "Explore network effects and coordination in a prison environment. Make decisions that affect not just you, but your entire cell block!",
    image: "/placeholder.svg?height=200&width=300",
    link: "/games/prisoners-network"
  },
  {
    title: "Resource Allocation Dilemma",
    description: "Balance individual needs with collective sustainability in this resource management game. Can you prevent the tragedy of the commons?",
    image: "/placeholder.svg?height=200&width=300",
    link: "/games/resource-allocation"
  },
  {
    title: "Nash's Bargain",
    description: "Experience the Nash bargaining solution in action. Negotiate and find the optimal outcome in various scenarios.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/games/nash-bargain"
  }
]

export default function Games() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-8">
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Games
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-20 p-6 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={game.image} alt={game.title} width={300} height={200} className="rounded-lg mb-4" />
            <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
            <p className="mb-4">{game.description}</p>
            <motion.a
              href={game.link}
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Play Now
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/games')({
  component: Games,
})
