import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHistory, 
  FaLightbulb, 
  FaChalkboardTeacher, 
  FaUserGraduate,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaGamepad
} from 'react-icons/fa';

const topics = [
  {
    title: "What is Game Theory?",
    icon: <FaLightbulb className="text-3xl text-yellow-400" />,
    content: {
      main: "Game theory is the study of strategic decision-making. It analyzes how individuals or groups make choices that affect each other's outcomes. Originally developed to model economic behavior, it now applies to diverse fields like politics, psychology, and biology.",
      highlights: [
        "Mathematical modeling of strategic interactions",
        "Analysis of competitive and cooperative behavior",
        "Applications across multiple disciplines"
      ],
      stats: [
        { label: "Fields of Application", value: "15+" },
        { label: "Nobel Prizes", value: "8" },
        { label: "Years of Development", value: "100+" }
      ]
    }
  },
  {
    title: "History of Game Theory",
    icon: <FaHistory className="text-3xl text-blue-400" />,
    content: {
      main: "Game theory's foundations were laid in the 1920s by mathematicians Émile Borel and John von Neumann. It gained prominence with John Nash's work on non-cooperative games in the 1950s. Since then, it has evolved and expanded, earning several Nobel Prizes in Economics.",
      timeline: [
        { year: "1920s", event: "Foundation by Émile Borel" },
        { year: "1944", event: "von Neumann & Morgenstern's book" },
        { year: "1950s", event: "Nash Equilibrium concept" },
        { year: "1994", event: "Nash's Nobel Prize" },
        { year: "Present", event: "AI & Machine Learning applications" }
      ]
    }
  },
  {
    title: "Why Learn Game Theory?",
    icon: <FaUserGraduate className="text-3xl text-green-400" />,
    content: {
      main: "Understanding game theory can improve your decision-making skills in various aspects of life. It helps in analyzing complex situations, predicting outcomes, and developing strategies. From business negotiations to social interactions, game theory provides valuable insights.",
      applications: [
        {
          field: "Business",
          examples: ["Pricing strategies", "Market competition", "Negotiations"]
        },
        {
          field: "Politics",
          examples: ["Voting systems", "International relations", "Coalition formation"]
        },
        {
          field: "Social Sciences",
          examples: ["Behavioral economics", "Social choice theory", "Evolution"]
        }
      ]
    }
  },
  {
    title: "Our Approach",
    icon: <FaChalkboardTeacher className="text-3xl text-purple-400" />,
    content: {
      main: "At Game Theory Playground, we believe in learning through interaction. Our games and simulations bring abstract concepts to life, allowing you to experience game theory principles firsthand. By playing and analyzing these games, you'll develop an intuitive understanding of strategic thinking.",
      methodology: [
        {
          title: "Interactive Learning",
          description: "Learn by doing through our game simulations",
          icon: <FaGamepad />
        },
        {
          title: "Real-world Applications",
          description: "Connect theory to practical scenarios",
          icon: <FaChartLine />
        },
        {
          title: "Community Learning",
          description: "Engage with other learners and experts",
          icon: <FaUsers />
        }
      ],
      achievements: {
        students: "10,000+",
        institutions: "50+",
        papers: "25+"
      }
    }
  }
];

export default function About() {
  const [activeTopic, setActiveTopic] = useState(0);
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          About Game Theory Playground
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover the science of strategic thinking through interactive learning and practical applications.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl backdrop-blur-sm overflow-hidden">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap">
            {topics.map((topic, index) => (
              <motion.button
                key={index}
                className={`flex-1 min-w-[200px] p-4 flex items-center justify-center gap-3
                  ${activeTopic === index 
                    ? 'bg-gray-700/50 text-purple-400 border-b-2 border-purple-400' 
                    : 'text-gray-300 hover:bg-gray-700/30'}`}
                onClick={() => setActiveTopic(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {topic.icon}
                <span className="font-medium">{topic.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {/* Main Content */}
              <p className="text-lg text-gray-300 mb-8">
                {topics[activeTopic].content.main}
              </p>

              {/* Conditional Content Based on Active Topic */}
              {activeTopic === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {topics[0].content.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/30 p-6 rounded-lg text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-purple-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTopic === 1 && (
                <div className="relative">
                  <motion.div 
                    className="space-y-4"
                    onHoverStart={() => setIsHoveringTimeline(true)}
                    onHoverEnd={() => setIsHoveringTimeline(false)}
                  >
                    {topics[1].content.timeline.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-24 text-purple-400 font-bold">
                          {item.year}
                        </div>
                        <div className="flex-1 bg-gray-700/30 p-4 rounded-lg">
                          {item.event}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {activeTopic === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topics[2].content.applications.map((field, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/30 p-6 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-purple-400 mb-4">
                        {field.field}
                      </h3>
                      <ul className="space-y-2">
                        {field.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FaTrophy className="text-yellow-400" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTopic === 3 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {topics[3].content.methodology.map((method, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-700/30 p-6 rounded-lg text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-purple-400 text-2xl mb-4">
                          {method.icon}
                        </div>
                        <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                        <p className="text-gray-300">{method.description}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="bg-gray-700/30 p-6 rounded-lg text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Our Impact</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(topics[3].content.achievements).map(([key, value], index) => (
                        <div key={index}>
                          <div className="text-2xl font-bold text-purple-400">
                            {value}
                          </div>
                          <div className="text-gray-300 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/about')({
  component: About,
});