import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChess, 
  FaUsers, 
  FaHandshake, 
  FaHandPaper,
  FaUtensils,
  FaUserFriends
} from 'react-icons/fa';
import { GiDeerHead } from 'react-icons/gi';


const games = [
  {
    title: "Prisoner's Network",
    description: "Discover how networks of trust and betrayal form in this multiplayer version of the classic prisoner's dilemma. Make decisions that ripple through your network of fellow inmates, forming alliances and rivalries. Will you maintain honor among thieves?",
    image: "/placeholder.svg?height=200&width=300",
    link: "/prisoners-network",
    difficulty: "Medium",
    players: "4-8",
    duration: "15-20 min",
    concepts: ["Network Effects", "Trust Building", "Coalition Formation"],
    icon: <FaUserFriends className="text-3xl" />
  },
  {
    title: "Community Chest",
    description: "Navigate the delicate balance between personal gain and community welfare in this resource management game. Each player must decide how much to take from a shared resource pool. Will your community thrive or fall victim to the tragedy of the commons?",
    image: "/placeholder.svg?height=200&width=300",
    link: "/community-chest",
    difficulty: "Easy",
    players: "3-12",
    duration: "10-15 min",
    concepts: ["Public Goods", "Collective Action", "Sustainability"],
    icon: <FaUsers className="text-3xl" />
  },
  {
    title: "Resource Allocation Dilemma",
    description: "Step into the shoes of a negotiator in this dynamic bargaining game. Balance competing interests and find optimal solutions across multiple scenarios. Perfect for understanding Nash bargaining and cooperative game theory.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/resource-allocation",
    difficulty: "Hard",
    players: "2-4",
    duration: "20-30 min",
    concepts: ["Nash Bargaining", "Pareto Efficiency", "Fair Division"],
    icon: <FaHandshake className="text-3xl" />
  },
  {
    title: "Prisoner's Dilemma",
    description: "Experience the most famous game theory scenario in this beautifully animated simulation. Cooperate or defect in multiple rounds against different AI strategies. Learn about the emergence of cooperation and the power of reciprocity.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/prisoners-dilemma",
    difficulty: "Easy",
    players: "2",
    duration: "5-10 min",
    concepts: ["Cooperation", "Defection", "Tit-for-Tat"],
    icon: <FaChess className="text-3xl" />
  },
  {
    title: "Rock-Paper-Scissors-Lizard-Spock",
    description: "The classic game evolved! Explore mixed strategies and circular dominance in this expanded version. Features an AI opponent that adapts to your playing style, teaching pattern recognition and strategic thinking.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/rpsls",
    difficulty: "Medium",
    players: "2",
    duration: "5-15 min",
    concepts: ["Mixed Strategies", "Cyclic Dominance", "Pattern Recognition"],
    icon: <FaHandPaper className="text-3xl" />
  },
  {
    title: "Stag Hunt",
    description: "Work together or go solo in this multiplayer coordination game. Hunt the stag for a bigger reward or settle for a rabbit? Learn about social cooperation, risk, and trust in this beautifully illustrated adventure.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/stag-hunt",
    difficulty: "Easy",
    players: "2-6",
    duration: "10-15 min",
    concepts: ["Coordination", "Risk vs Reward", "Social Trust"],
    icon: <GiDeerHead className="text-3xl" />
  },
  {
    title: "The Fair Feast",
    description: "Dive into fair division problems with this festive game about sharing resources. As the head chef, divide dishes among picky eaters with different preferences. Learn about envy-free allocation and social welfare.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/fair-feast",
    difficulty: "Medium",
    players: "3-8",
    duration: "15-20 min",
    concepts: ["Fair Division", "Envy-Freeness", "Social Choice"],
    icon: <FaUtensils className="text-3xl" />
  }
];

const difficultyColors = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400"
};

export default function Games() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGames = games.filter(game => {
    const matchesFilter = filter === "all" || game.difficulty.toLowerCase() === filter;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-20 px-4">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Game Library
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose your challenge from our collection of interactive games. Each game teaches different aspects of game theory through engaging gameplay.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex gap-4">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition ${filter === "all" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              All Games
            </button>
            <button 
              onClick={() => setFilter("easy")}
              className={`px-4 py-2 rounded-lg transition ${filter === "easy" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Easy
            </button>
            <button 
              onClick={() => setFilter("medium")}
              className={`px-4 py-2 rounded-lg transition ${filter === "medium" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Medium
            </button>
            <button 
              onClick={() => setFilter("hard")}
              className={`px-4 py-2 rounded-lg transition ${filter === "hard" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Hard
            </button>
          </div>
          <input
            type="text"
            placeholder="Search games..."
            className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-shadow"
            >
              <div className="relative h-48 bg-gray-700">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gray-900/80 p-2 rounded-lg backdrop-blur-sm">
                  {game.icon}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{game.title}</h2>
                  <span className={`${difficultyColors[game.difficulty]} font-medium`}>
                    {game.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{game.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.concepts.map((concept, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                  <span>{game.players} Players</span>
                  <span>{game.duration}</span>
                </div>
                <Link to={game.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Play Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/games')({
  component: Games,
});