import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const topics = [
  {
    title: "What is Game Theory?",
    content: "Game theory is the study of strategic decision-making. It analyzes how individuals or groups make choices that affect each other's outcomes. Originally developed to model economic behavior, it now applies to diverse fields like politics, psychology, and biology."
  },
  {
    title: "History of Game Theory",
    content: "Game theory's foundations were laid in the 1920s by mathematicians Émile Borel and John von Neumann. It gained prominence with John Nash's work on non-cooperative games in the 1950s. Since then, it has evolved and expanded, earning several Nobel Prizes in Economics."
  },
  {
    title: "Why Learn Game Theory?",
    content: "Understanding game theory can improve your decision-making skills in various aspects of life. It helps in analyzing complex situations, predicting outcomes, and developing strategies. From business negotiations to social interactions, game theory provides valuable insights."
  },
  {
    title: "Our Approach",
    content: "At Game Theory Playground, we believe in learning through interaction. Our games and simulations bring abstract concepts to life, allowing you to experience game theory principles firsthand. By playing and analyzing these games, you'll develop an intuitive understanding of strategic thinking."
  }
]

export default function About() {
  const [activeTopic, setActiveTopic] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-8">
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Game Theory Playground
      </motion.h1>
      <div className="max-w-4xl w-full bg-white bg-opacity-20 rounded-lg p-8">
        <div className="flex mb-4">
          {topics.map((topic, index) => (
            <motion.button
              key={index}
              className={`flex-1 p-2 ${activeTopic === index ? 'bg-white text-purple-600' : 'text-white'} rounded-t-lg`}
              onClick={() => setActiveTopic(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {topic.title}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTopic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-purple-600 p-4 rounded-b-lg"
          >
            {topics[activeTopic].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})

