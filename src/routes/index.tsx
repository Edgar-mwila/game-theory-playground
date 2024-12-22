import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { FaChessKnight, FaBalanceScale, FaNetworkWired } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-8">
      <motion.h1 
        className="text-6xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Game Theory Playground
      </motion.h1>
      <motion.p 
        className="text-2xl mb-12 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Dive into the fascinating world of strategic decision-making through interactive games and simulations!
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Feature 
          icon={<FaChessKnight className="text-5xl mb-4" />}
          title="Strategic Thinking"
          description="Sharpen your decision-making skills with our thought-provoking games."
        />
        <Feature 
          icon={<FaBalanceScale className="text-5xl mb-4" />}
          title="Balance Choices"
          description="Learn to weigh individual gains against collective benefits."
        />
        <Feature 
          icon={<FaNetworkWired className="text-5xl mb-4" />}
          title="Network Effects"
          description="Explore how individual actions impact group dynamics."
        />
      </div>
    </div>
  )
}

const Feature = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white bg-opacity-20 p-6 rounded-lg text-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p>{description}</p>
  </motion.div>
)

export const Route = createFileRoute('/')({
  component: Home,
})

