import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  FaChessKnight,
  FaBalanceScale,
  FaNetworkWired,
  FaGamepad,
  FaLightbulb,
  FaTrophy,
} from 'react-icons/fa';
import { ReactNode } from 'react';

// Home Page Component
const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none">
          <FloatingIcon icon={<FaChessKnight />} />
          <FloatingIcon icon={<FaBalanceScale />} />
          <FloatingIcon icon={<FaNetworkWired />} />
          <FloatingIcon icon={<FaTrophy />} />
          <FloatingIcon icon={<FaLightbulb />} />
          <FloatingIcon icon={<FaGamepad />} />
        </div>
        <motion.div
          className="text-center z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Game Theory Playground
          </h1>
          <p className="text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Where strategy meets fun! Dive into interactive games that teach you the
            fascinating world of game theory.
          </p>
          <div className="flex justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              <Link to="/games">Play Now</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              <Link to="/about">Learn More</Link>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Game Theory Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaGamepad />}
              title="Learn by Playing"
              description="Experience complex concepts through fun, interactive games designed to challenge your strategic thinking."
            />
            <FeatureCard
              icon={<FaLightbulb />}
              title="Discover Patterns"
              description="Uncover the hidden patterns in decision-making that shape our world, from economics to evolution."
            />
            <FeatureCard
              icon={<FaTrophy />}
              title="Master Strategy"
              description="Develop your strategic thinking skills while competing with others in our carefully crafted games."
            />
            <FeatureCard
              icon={<FaBalanceScale />}
              title="Understand Fairness"
              description="Explore the principles of fairness and equity in resource allocation, negotiations, and beyond."
            />
            <FeatureCard
              icon={<FaChessKnight />}
              title="Anticipate Moves"
              description="Learn to predict opponents' actions and stay ahead in competitive scenarios, from boardrooms to battlefields."
            />
            <FeatureCard
              icon={<FaNetworkWired />}
              title="Analyze Networks"
              description="Discover how strategic connections and alliances influence outcomes in real-world systems."
            />
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Start Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <QuickStartCard
              title="Popular Games"
              items={["Prisoner's Dilemma", "Battle of the Sexes", "Stag Hunt", "Matching Pennies"]}
              buttonText="Play Now"
              to="/games"
            />
            <QuickStartCard
              title="Quick Lessons"
              items={["Nash Equilibrium", "Dominant Strategies", "Mixed Strategies", "Coalitions"]}
              buttonText="Start Learning"
              to="/learn"
            />
            <QuickStartCard
              title="Advanced Topics"
              items={["Zero-Sum Games", "Repeated Games", "Bargaining"]}
              buttonText="Explore Advanced"
              to="/learn"
            />
            <QuickStartCard
              title="Challenge Yourself"
              items={["Scenario Simulations", "Strategic Decision-Making Quizzes"]}
              buttonText="Take the Challenge"
              to="/challenge"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
  >
    <div className="text-4xl text-purple-400 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const QuickStartCard: React.FC<{
  title: string;
  items: string[];
  buttonText: string;
  to: string;
}> = ({ title, items, buttonText, to }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-8 bg-gray-800/30 rounded-xl backdrop-blur-sm"
  >
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <ul className="space-y-3 mb-6">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <Link to={to}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        {buttonText}
      </motion.button>
    </Link>
  </motion.div>
);

const FloatingIcon: React.FC<{ icon: ReactNode }> = ({ icon }) => (
  <motion.div
    className="text-9xl text-gray-500/20"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
  >
    {icon}
  </motion.div>
);

export const Route = createFileRoute('/')({
  component: Home,
});
