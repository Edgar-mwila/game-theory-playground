import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBrain, 
  FaBookOpen, 
  FaChalkboardTeacher, 
  FaSearch,
  FaCheckCircle,
  FaStar,
  FaLightbulb,
  FaQuoteRight,
  FaCode,
  FaChartLine,
  FaHandshake,
  FaGamepad,
  FaInfoCircle,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaBalanceScale,
  FaClock
} from 'react-icons/fa';

// Types
interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface DidYouKnow {
  fact: string;
  source: string;
  type: 'tv' | 'game' | 'person' | 'daily' | 'economics' | 'science';
}

interface Content {
  definition: string;
  keyPoints: string[];
  details: string;
  realWorldExample: string;
  relatedGames: string[];
  quiz: Quiz[];
  didYouKnow: DidYouKnow[];
}

interface Topic {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  content: Content;
}

interface Category {
  id: string;
  title: string;
  icon: JSX.Element;
  topics: Topic[];
}

// Enhanced concepts data with quizzes and "Did You Know" sections
const concepts: Category[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    icon: <FaBrain />,
    topics: [
      {
        id: 'what-is-game-theory',
        title: 'What is Game Theory?',
        difficulty: 'Beginner',
        readTime: '5 min',
        content: {
          definition: "Game theory is the study of mathematical models of strategic interaction among rational decision-makers.",
          keyPoints: [
            "Analyzes competitive and cooperative behavior",
            "Used in economics, political science, psychology, and more",
            "Focuses on decision-making under various conditions",
            "Incorporates probability and expected utility theory",
            "Considers both perfect and imperfect information scenarios"
          ],
          details: `Game theory provides a framework for understanding how rational agents make decisions when their choices affect each other's outcomes. It emerged in the 1940s through the work of John von Neumann and Oskar Morgenstern, who formalized the field in their groundbreaking book "Theory of Games and Economic Behavior."

The foundation of game theory rests on several key assumptions:
1. Players are rational and aim to maximize their utility
2. Players have knowledge of the game structure and possible outcomes
3. Players consider other players' potential actions when making decisions

Game theory has evolved to include various types of games:
- Static vs. Dynamic games: One-shot decisions vs. sequential choices
- Perfect vs. Imperfect information: Complete knowledge vs. partial knowledge
- Symmetric vs. Asymmetric games: Similar vs. different player roles
- Zero-sum vs. Non-zero-sum games: Total gains and losses sum to zero vs. variable total outcomes

The field has revolutionized our understanding of strategic behavior in numerous domains, from market competition to evolutionary biology. Modern applications include artificial intelligence, cybersecurity, and social network analysis.`,
          realWorldExample: "Consider businesses deciding whether to lower prices. Each firm's best strategy depends on what others might do. For instance, if Amazon considers offering free shipping, Walmart must decide whether to match this offer, understanding that their decision affects both companies' market shares.",
          relatedGames: ["Prisoner's Dilemma", "Stag Hunt", "Battle of the Sexes", "Chicken Game"],
          quiz: [
            {
              question: "Which of the following best describes game theory?",
              options: [
                "The study of board games",
                "The study of mathematical models of strategic interaction",
                "The study of probability in gambling",
                "The study of economic markets"
              ],
              correctAnswer: 1,
              explanation: "Game theory specifically focuses on analyzing strategic interactions between rational decision-makers using mathematical models."
            },
            {
              question: "What is NOT a key assumption in classical game theory?",
              options: [
                "Players are rational",
                "Players have perfect information",
                "Players aim to maximize utility",
                "Players are emotional decision-makers"
              ],
              correctAnswer: 3,
              explanation: "Classical game theory assumes rational decision-making rather than emotional responses, though behavioral game theory later incorporated psychological factors."
            },
            {
              question: "Which type of game involves players making decisions simultaneously?",
              options: [
                "Dynamic game",
                "Static game",
                "Perfect information game",
                "Cooperative game"
              ],
              correctAnswer: 1,
              explanation: "Static games involve simultaneous decision-making, while dynamic games involve sequential moves."
            }
          ],
          didYouKnow: [
            {
              fact: "The TV show 'The Big Bang Theory' featured game theory concepts in multiple episodes, including the famous 'prisoner's dilemma' in Season 2.",
              source: "The Big Bang Theory",
              type: "tv"
            },
            {
              fact: "John Nash, whose life inspired 'A Beautiful Mind', revolutionized game theory with the Nash Equilibrium concept.",
              source: "A Beautiful Mind (2001)",
              type: "person"
            },
            {
              fact: "Game theory was crucial in designing the US FCC spectrum auctions, which have generated over $60 billion in revenue.",
              source: "FCC Reports",
              type: "economics"
            },
            {
              fact: "Evolutionary game theory has helped explain animal behavior patterns, including the evolution of cooperation.",
              source: "Nature Journal",
              type: "science"
            }
          ]
        }
      },
      // ... [previous key-concepts topic remains the same]
      {
        id: 'game-representations',
        title: 'Game Representations',
        difficulty: 'Intermediate',
        readTime: '8 min',
        content: {
          definition: "Different mathematical formats used to represent and analyze games.",
          keyPoints: [
            "Normal form (strategic form) representation",
            "Extensive form (game tree) representation",
            "Characteristic function form",
            "Partition function form",
            "Different representations suit different types of analysis"
          ],
          details: `Game theory uses several formal mathematical representations to model strategic situations:

Normal Form (Strategic Form):
- Represented as a matrix showing players, strategies, and payoffs
- Best for simultaneous-move games
- Shows all possible strategy combinations and resulting payoffs
- Useful for finding Nash equilibria

Extensive Form:
- Tree structure showing sequential decisions
- Includes decision nodes, chance nodes, and information sets
- Shows the order of moves and information available to players
- Better for analyzing dynamic games and backward induction

Characteristic Function Form:
- Used primarily for cooperative games
- Assigns values to different possible coalitions
- Helps analyze fair division problems and coalition formation
- Important for studying voting power and resource allocation

Partition Function Form:
- Extends characteristic function to include externalities
- Values of coalitions depend on how others organize
- Used in environmental economics and public goods analysis
- Captures spillover effects between coalitions`,
          realWorldExample: "A chess game can be represented in extensive form, showing all possible moves and countermoves, while a simultaneous pricing decision by competing firms is better shown in normal form.",
          relatedGames: ["Chess", "Simultaneous Price Setting", "Coalition Formation"],
          quiz: [
            {
              question: "Which representation is best for analyzing sequential moves?",
              options: [
                "Normal form",
                "Extensive form",
                "Characteristic function form",
                "Partition function form"
              ],
              correctAnswer: 1,
              explanation: "Extensive form uses a tree structure that clearly shows the sequence of moves and information available at each decision point."
            }
          ],
          didYouKnow: [
            {
              fact: "The game tree for chess has approximately 10^120 possible positions, making it impossible to fully analyze.",
              source: "Mathematics Archives",
              type: "science"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'equilibrium-concepts',
    title: 'Equilibrium Concepts',
    icon: <FaBalanceScale />,
    topics: [
      {
        id: 'nash-equilibrium',
        title: 'Nash Equilibrium',
        difficulty: 'Advanced',
        readTime: '15 min',
        content: {
          definition: "A solution concept where no player can unilaterally improve their outcome by changing their strategy.",
          keyPoints: [
            "Fundamental solution concept in game theory",
            "May involve pure or mixed strategies",
            "Multiple Nash equilibria can exist",
            "Not all games have pure strategy Nash equilibria",
            "Relationship to social optimality"
          ],
          details: `Nash Equilibrium (NE) is a cornerstone concept in game theory, named after John Nash who proved that every finite game has at least one Nash equilibrium (possibly in mixed strategies).

Key Properties:
1. Stability: No player can benefit by unilaterally deviating
2. Self-enforcing: Once reached, players have no incentive to change
3. Existence: Guaranteed in finite games (Nash's theorem)
4. Multiplicity: Games may have multiple Nash equilibria
5. Efficiency: Nash equilibria may not be socially optimal

Types of Nash Equilibria:
- Pure Strategy: Players choose specific actions with certainty
- Mixed Strategy: Players randomize between different actions
- Symmetric: All players use the same strategy
- Asymmetric: Players use different strategies

Finding Nash Equilibria:
1. Identify dominated strategies
2. Find best responses for each player
3. Look for strategy profiles that are mutual best responses
4. Check for mixed strategy equilibria if no pure strategy NE exists

Limitations and Refinements:
- May not be unique
- Can be Pareto inefficient
- May require unrealistic assumptions
- Various refinements exist (perfect, proper, sequential equilibria)`,
          realWorldExample: "In the adoption of technology standards (like VHS vs. Betamax), companies and consumers reached a Nash equilibrium where everyone used VHS, making it costly for any individual to unilaterally switch to Betamax.",
          relatedGames: ["Prisoner's Dilemma", "Battle of the Sexes", "Matching Pennies"],
          quiz: [
            {
              question: "What characterizes a Nash Equilibrium?",
              options: [
                "The best possible outcome for all players",
                "No player can improve by changing strategy unilaterally",
                "All players use the same strategy",
                "The socially optimal outcome"
              ],
              correctAnswer: 1,
              explanation: "A Nash Equilibrium occurs when no player can improve their payoff by unilaterally changing their strategy, while holding other players' strategies fixed."
            }
          ],
          didYouKnow: [
            {
              fact: "John Nash proved the existence of mixed strategy Nash equilibria while a graduate student at Princeton.",
              source: "Nobel Prize Archives",
              type: "person"
            },
            {
              fact: "The concept of Nash Equilibrium has been applied to explain everything from animal territory marking to international arms races.",
              source: "Game Theory Review",
              type: "science"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'dynamic-games',
    title: 'Dynamic Games',
    icon: <FaClock />,
    topics: [
      {
        id: 'sequential-games',
        title: 'Sequential Games',
        difficulty: 'Intermediate',
        readTime: '10 min',
        content: {
          definition: "Games where players move in sequence rather than simultaneously, with later players observing earlier moves.",
          keyPoints: [
            "Players move in a predetermined order",
            "Later players observe earlier moves",
            "Use extensive form representation",
            "Backward induction solution method",
            "Important for strategic planning"
          ],
          details: `Sequential games, also known as dynamic games, are fundamental to understanding strategic interactions that unfold over time. These games capture situations where timing matters and information is revealed gradually.

Key Concepts:

1. Game Tree Structure:
- Nodes represent decision points
- Branches represent possible actions
- Paths show possible sequences of play
- Terminal nodes contain payoffs

2. Information Sets:
- Group nodes where player cannot distinguish position
- Perfect information: All singleton information sets
- Imperfect information: Some non-singleton sets

3. Backward Induction:
- Start analysis from terminal nodes
- Work backwards to determine optimal choices
- Assumes rational players
- Produces subgame perfect equilibria

4. Strategic Implications:
- First-mover advantage/disadvantage
- Credible vs. non-credible threats
- Commitment power
- Sequential rationality

Common Applications:
- Entry deterrence in markets
- Bargaining situations
- Chess and other board games
- Political campaigns
- Product launch timing`,
          realWorldExample: "In the pharmaceutical industry, companies decide sequentially whether to invest in R&D, with later movers observing whether earlier companies' drugs were successful.",
          relatedGames: ["Stackelberg Competition", "Entry Deterrence", "Ultimatum Game"],
          quiz: [
            {
              question: "What is the primary solution method for sequential games?",
              options: [
                "Forward induction",
                "Backward induction",
                "Lateral thinking",
                "Random sampling"
              ],
              correctAnswer: 1,
              explanation: "Backward induction involves starting from the end of the game and working backwards to determine optimal strategies at each decision point."
            }
          ],
          didYouKnow: [
            {
              fact: "The game of chess has a theoretical optimal strategy that could be found through backward induction, but the game tree is too large to compute completely.",
              source: "Computer Science Archives",
              type: "science"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'behavioral',
    title: 'Behavioral Game Theory',
    icon: <FaBrain />,
    topics: [
      {
        id: 'bounded-rationality',
        title: 'Bounded Rationality',
        difficulty: 'Advanced',
        readTime: '12 min',
        content: {
          definition: "Study of how cognitive limitations affect strategic decision-making, departing from classical assumptions of perfect rationality.",
          keyPoints: [
            "Limited computational capacity",
            "Cognitive biases and heuristics",
            "Satisficing behavior",
            "Learning and adaptation",
            "Role of emotions in decisions"
          ],
          details: `Bounded rationality, introduced by Herbert Simon, recognizes that human decision-makers have limited cognitive capabilities and incomplete information, leading to decisions that are rational but not optimal.

Key Aspects:

1. Cognitive Limitations:
- Processing capacity constraints
- Memory limitations
- Attention constraints
- Time pressure effects
- Information overload

2. Decision-Making Processes:
- Satisficing (finding satisfactory solutions)
- Use of heuristics (mental shortcuts)
- Rule-of-thumb strategies
- Pattern recognition
- Emotional influences

3. Implications for Game Theory:
- Simplified strategy spaces
- Level-k thinking
- Quantal response equilibrium
- Learning dynamics
- Evolution of conventions

4. Experimental Evidence:
- Laboratory studies
- Field experiments
- Neurological evidence
- Psychological studies
- Market behavior analysis

Applications:
- Consumer behavior
- Organizational decision-making
- Financial markets
- Political behavior
- Social interactions`,
          realWorldExample: "In stock markets, traders often use simple technical analysis rules rather than complex mathematical models, demonstrating bounded rationality in financial decision-making.",
          relatedGames: ["Beauty Contest Game", "Centipede Game", "Ultimatum Game"],
          quiz: [
            {
              question: "What is satisficing?",
              options: [
                "Finding the optimal solution",
                "Finding a satisfactory solution",
                "Avoiding all decisions",
                "Making random choices"
              ],
              correctAnswer: 1,
              explanation: "Satisficing, coined by Herbert Simon, refers to finding solutions that are 'good enough' rather than optimal, acknowledging cognitive limitations."
            }
          ],
          didYouKnow: [
            {
              fact: "Herbert Simon won the Nobel Prize in Economics for his pioneering research on bounded rationality in decision-making processes.",
              source: "Nobel Prize Archives",
              type: "person"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'types-of-games',
    title: 'Types of Games',
    icon: <FaGamepad />,
    topics: [
      {
        id: 'cooperative-games',
        title: 'Cooperative Games',
        difficulty: 'Intermediate',
        readTime: '8 min',
        content: {
          definition: "Cooperative games are games where players can form coalitions and share payoffs.",
          keyPoints: [
            "Focus on group strategies",
            "Payoff distribution methods",
            "Core, Shapley value, and Nash bargaining solutions"
          ],
          details: "Cooperative game theory analyzes how groups of players interact and distribute rewards among themselves.",
          realWorldExample: "In a labor union, workers collectively bargain with employers for better wages.",
          relatedGames: ["Bargaining Games"],
          quiz: [
            {
              question: "What distinguishes cooperative games from non-cooperative games?",
              options: [
                "The use of strategies",
                "The ability to form coalitions",
                "The presence of payoffs",
                "The use of randomness"
              ],
              correctAnswer: 1,
              explanation: "Cooperative games emphasize coalition formation and joint strategies, unlike non-cooperative games that focus on individual decision-making."
            }
          ],
          didYouKnow: [
            {
              fact: "The Shapley value, developed by Lloyd Shapley, provides a way to fairly distribute payoffs in cooperative games.",
              source: "Nobel Prize Archives",
              type: "person"
            }
          ]
        }
      },
      {
        id: 'non-cooperative-games',
        title: 'Non-Cooperative Games',
        difficulty: 'Intermediate',
        readTime: '7 min',
        content: {
          definition: "Non-cooperative games focus on individual strategies without forming binding agreements.",
          keyPoints: [
            "Players act independently",
            "Emphasis on Nash equilibrium",
            "Extensive-form and strategic-form games"
          ],
          details: "These games analyze competitive scenarios where each player maximizes their own payoff.",
          realWorldExample: "In a competitive auction, each bidder independently decides how much to bid to maximize their chance of winning.",
          relatedGames: ["Auction Theory", "Rock-Paper-Scissors"],
          quiz: [
            {
              question: "What is the key focus of non-cooperative games?",
              options: [
                "Coalition formation",
                "Individual strategies",
                "Random outcomes",
                "Reward sharing"
              ],
              correctAnswer: 1,
              explanation: "Non-cooperative games prioritize individual strategies and outcomes, without forming coalitions."
            }
          ],
          didYouKnow: [
            {
              fact: "John Nash developed the concept of Nash equilibrium, which is central to non-cooperative game theory.",
              source: "A Beautiful Mind (2001)",
              type: "person"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'applications',
    title: 'Applications of Game Theory',
    icon: <FaChartLine />,
    topics: [
      {
        id: 'economics',
        title: 'Game Theory in Economics',
        difficulty: 'Advanced',
        readTime: '12 min',
        content: {
          definition: "Game theory is extensively used to model economic behavior and markets.",
          keyPoints: [
            "Auction theory",
            "Market competition",
            "Behavioral economics"
          ],
          details: "Economists use game theory to predict market dynamics, pricing strategies, and consumer behavior.",
          realWorldExample: "Google's ad auction system is based on principles of auction theory and game theory.",
          relatedGames: ["Auction Games", "Market Games"],
          quiz: [
            {
              question: "Which of the following is a game theory application in economics?",
              options: [
                "Advertising auctions",
                "Weather forecasting",
                "Astrophysics modeling",
                "Art criticism"
              ],
              correctAnswer: 0,
              explanation: "Game theory plays a vital role in auction systems like those used by tech giants for ad placements."
            }
          ],
          didYouKnow: [
            {
              fact: "Nobel laureate William Vickrey developed key auction models using game theory principles.",
              source: "Nobel Prize Archives",
              type: "person"
            }
          ]
        }
      },
      {
        id: 'politics',
        title: 'Game Theory in Politics',
        difficulty: 'Advanced',
        readTime: '10 min',
        content: {
          definition: "Game theory explains strategic interactions in political systems, including voting and international relations.",
          keyPoints: [
            "Coalition formation",
            "Voting strategies",
            "Negotiation and diplomacy"
          ],
          details: "By analyzing the incentives of political players, game theory helps predict policy decisions and alliances.",
          realWorldExample: "The Cuban Missile Crisis is often modeled as a game of brinkmanship in game theory.",
          relatedGames: ["Brinkmanship", "Voting Games"],
          quiz: [
            {
              question: "How does game theory apply to politics?",
              options: [
                "Astrophysics modeling",
                "Predicting electoral outcomes",
                "Designing space missions",
                "Art criticism"
              ],
              correctAnswer: 1,
              explanation: "Game theory helps analyze and predict strategic interactions like voting and alliances in politics."
            }
          ],
          didYouKnow: [
            {
              fact: "The concept of brinkmanship during the Cold War is a classic example of game theory in international relations.",
              source: "History Texts",
              type: "daily"
            }
          ]
        }
      }
    ]
  }
];

const difficultyColors = {
  'Beginner': 'text-green-400',
  'Intermediate': 'text-yellow-400',
  'Advanced': 'text-red-400'
} as const;

// Custom hook for managing favorites
const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('favorites');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (topicId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  return { favorites, toggleFavorite };
};

// Quiz component
const Quiz: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
      <h4 className="text-lg font-semibold mb-4">{quiz.question}</h4>
      <div className="space-y-2">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-3 rounded-lg transition ${
              selectedAnswer === index
                ? selectedAnswer === quiz.correctAnswer
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
                : 'hover:bg-gray-600/50'
            }`}
            onClick={() => {
              setSelectedAnswer(index);
              setShowExplanation(true);
            }}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-600/50 rounded-lg">
          <p className="text-sm">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
};

// DidYouKnow component
const DidYouKnow: React.FC<{ fact: DidYouKnow }> = ({ fact }) => (
  <div className="bg-purple-500/20 p-4 rounded-lg mb-4">
    <div className="flex items-start gap-3">
      <FaLightbulb className="text-yellow-400 text-xl flex-shrink-0 mt-1" />
      <div>
        <p className="text-sm text-purple-300 mb-2">Did you know?</p>
        <p>{fact.fact}</p>
        <p className="text-sm text-gray-400 mt-2">Source: {fact.source}</p>
      </div>
    </div>
  </div>
);

// Mobile navigation drawer
const MobileNav: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => (
  <div
    className={`fixed inset-0 z-50 lg:hidden transition-opacity ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div className="absolute inset-0 bg-black/50" onClick={onClose} />
    <div
      className={`absolute top-0 left-0 w-64 h-full bg-gray-800 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={onClose}
      >
        <FaTimes size={24} />
      </button>
      <div className="p-4 overflow-y-auto h-full">
        {children}
      </div>
    </div>
  </div>
);

export default function Learn() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'favorites'>('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { favorites, toggleFavorite } = useFavorites();

  // Auto-select first topic on mount
  useEffect(() => {
    if (!selectedTopic && concepts.length > 0 && concepts[0].topics.length > 0) {
      setSelectedTopic(concepts[0].topics[0]);
    }
  }, []);

  const filteredConcepts = concepts.map(category => ({
    ...category,
    topics: category.topics.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.content.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorites = activeCategory === 'all' || favorites.has(topic.id);
      return matchesSearch && matchesFavorites;
    })
  })).filter(category => category.topics.length > 0);

  const findAdjacentTopic = (direction: 'prev' | 'next'): Topic | null => {
    if (!selectedTopic) return null;

    let allTopics: Topic[] = [];
    concepts.forEach(category => {
      allTopics = [...allTopics, ...category.topics];
    });

    const currentIndex = allTopics.findIndex(topic => topic.id === selectedTopic.id);
    if (currentIndex === -1) return null;

    const adjacentIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    return allTopics[adjacentIndex] || null;
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <motion.div 
        className="text-center mb-16 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Game Theory Learning Hub
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore the fascinating world of game theory through interactive lessons, 
          real-world examples, and hands-on exercises.
        </p>
      </motion.div>

      {/* Search and Navigation */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search concepts..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeCategory === 'all' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                All Topics
              </button>
              <button 
                onClick={() => setActiveCategory('favorites')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeCategory === 'favorites' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                My Favorites
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-700 p-2 rounded-lg"
        onClick={() => setIsMobileNavOpen(true)}
      >
        <FaBars size={24} />
      </button>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories and Topics - Desktop */}
          <div className="hidden lg:block lg:col-span-1 space-y-6 max-h-[90vh] overflow-y-auto">
            {filteredConcepts.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm"
              >
                <div className="p-4 bg-gray-700/50 flex items-center gap-3">
                  <span className="text-2xl text-purple-400">{category.icon}</span>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
                <div className="p-4 space-y-2">
                  {category.topics.map((topic) => (
                    <motion.button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopic(topic);
                        scrollToContent();
                      }}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedTopic?.id === topic.id 
                          ? 'bg-purple-600'
                          : 'hover:bg-gray-700/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <span>{topic.title}</span>
                        <span className={`text-sm ${difficultyColors[topic.difficulty]}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation Drawer */}
          <MobileNav
            isOpen={isMobileNavOpen}
            onClose={() => setIsMobileNavOpen(false)}
          >
            {filteredConcepts.map((category) => (
              <div key={category.id} className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl text-purple-400">{category.icon}</span>
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                </div>
                {category.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setIsMobileNavOpen(false);
                      scrollToContent();
                    }}
                    className={`w-full text-left p-3 rounded-lg transition mb-2 ${
                      selectedTopic?.id === topic.id 
                        ? 'bg-purple-600'
                        : 'hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{topic.title}</span>
                      <span className={`text-sm ${difficultyColors[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </MobileNav>

          {/* Selected Topic Content */}
          <div className="lg:col-span-2" ref={contentRef}>
            <AnimatePresence mode="wait">
              {selectedTopic && (
                <motion.div
                  key={selectedTopic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-800/50 rounded-xl backdrop-blur-sm p-6"
                >
                  {/* Topic Header */}
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold">{selectedTopic.title}</h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {selectedTopic.readTime} read
                      </span>
                      <button 
                        className={`transition ${
                          favorites.has(selectedTopic.id)
                            ? 'text-yellow-400'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                        onClick={() => toggleFavorite(selectedTopic.id)}
                      >
                        <FaStar />
                      </button>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="prose prose-invert max-w-none max-h-[70vh] overflow-y-auto p-4">
                    {/* Definition */}
                    <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                      <div className="flex items-start gap-3">
                        <FaQuoteRight className="text-purple-400 text-xl flex-shrink-0 mt-1" />
                        <p className="text-lg">{selectedTopic.content.definition}</p>
                      </div>
                    </div>

                    {/* Key Points */}
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                      <FaLightbulb className="text-purple-400" />
                      Key Points
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {selectedTopic.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-400 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                      <div className="flex items-start gap-3">
                        <p className="prose max-w-none text-lg">{`${selectedTopic.content.details}`}</p>
                      </div>
                    </div>

                    {/* Real World Example */}
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                      <FaChalkboardTeacher className="text-purple-400" />
                      Real World Example
                    </h3>
                    <p className="mb-6">{selectedTopic.content.realWorldExample}</p>

                    {/* Did You Know Section */}
                    {selectedTopic.content.didYouKnow.map((fact, index) => (
                      <DidYouKnow key={index} fact={fact} />
                    ))}

                    {/* Quiz Section */}
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                      <FaGamepad className="text-purple-400" />
                      Test Your Knowledge
                    </h3>
                    {selectedTopic.content.quiz.map((quiz, index) => (
                      <Quiz key={index} quiz={quiz} />
                    ))}

                    {/* Related Games */}
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                      <FaGamepad className="text-purple-400" />
                      Related Games
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTopic.content.relatedGames.map((game, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300"
                        >
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={() => {
                        const prevTopic = findAdjacentTopic('prev');
                        if (prevTopic) {
                          setSelectedTopic(prevTopic);
                          scrollToContent();
                        }
                      }}
                      className={`p-2 rounded-lg transition ${
                        findAdjacentTopic('prev')
                          ? 'hover:bg-gray-700/50'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!findAdjacentTopic('prev')}
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={() => {
                        const nextTopic = findAdjacentTopic('next');
                        if (nextTopic) {
                          setSelectedTopic(nextTopic);
                          scrollToContent();
                        }
                      }}
                      className={`p-2 rounded-lg transition ${
                        findAdjacentTopic('next')
                          ? 'hover:bg-gray-700/50'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      disabled={!findAdjacentTopic('next')}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/learn')({
  component: Learn,
});