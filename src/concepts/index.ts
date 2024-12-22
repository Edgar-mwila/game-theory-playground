import { FaBrain, FaChartLine, FaHandshake, FaInfoCircle } from 'react-icons/fa';

export const concepts = [
    {
      id: 'foundations',
      title: 'Foundations',
      icon: <FaBrain />,
      topics: [
        {
          id: 'what-is-game-theory',
          title: 'What is Game Theory?',
          type: 'theory',
          difficulty: 'Beginner',
          readTime: '15 min',
          content: {
            definition: "Game theory is the study of mathematical models of strategic interaction among rational decision-makers.",
            keyPoints: [
              "Analyzes competitive and cooperative behavior",
              "Used in economics, political science, psychology, and more",
              "Focuses on decision-making under various conditions"
            ],
            realWorldExample: "Consider businesses deciding whether to lower prices. Each firm's best strategy depends on what others might do.",
            relatedGames: ["Prisoner's Dilemma", "Stag Hunt"],
            details: {
              history: `Game theory's foundations were laid by John von Neumann and Oskar Morgenstern in their 1944 book "Theory of Games and Economic Behavior". The field gained prominence in the 1950s with John Nash's groundbreaking work on equilibrium concepts.`,
              keyFigures: [
                {
                  name: "John von Neumann",
                  contribution: "Co-founded the field and developed the minimax theorem",
                  year: "1928"
                },
                {
                  name: "John Nash",
                  contribution: "Developed the concept of Nash Equilibrium",
                  year: "1950"
                }
              ],
              implications: [
                "Revolutionized economic theory by providing tools to analyze strategic behavior",
                "Influenced military strategy during the Cold War",
                "Applied to evolutionary biology to explain animal behavior"
              ]
            },
            quiz: [
              {
                question: "What is the primary focus of game theory?",
                options: [
                  "Understanding board games",
                  "Strategic decision-making",
                  "Video game design",
                  "Psychological therapy"
                ],
                correct: 1,
                explanation: "Game theory primarily focuses on analyzing strategic decision-making between rational actors."
              }
            ]
          }
        },
        {
          id: 'basic-concepts',
          title: 'Basic Concepts and Terminology',
          type: 'fundamentals',
          difficulty: 'Beginner',
          readTime: '20 min',
          content: {
            definition: "Core concepts and terminology essential for understanding game theory analysis.",
            keyPoints: [
              "Players: Decision-makers in the game",
              "Strategy: Complete plan of action",
              "Payoff: Outcome or utility for each player",
              "Information: What players know and when they know it"
            ],
            realWorldExample: "In a salary negotiation, the employer and employee are players, their strategies are different salary proposals, and payoffs are the final agreed-upon terms.",
            details: {
              concepts: [
                {
                  term: "Strategy Space",
                  definition: "The complete set of possible actions available to a player",
                  example: "In Rock-Paper-Scissors, the strategy space is {Rock, Paper, Scissors}"
                },
                {
                  term: "Payoff Matrix",
                  definition: "A table showing outcomes for all possible strategy combinations",
                  example: "2×2 matrix showing profits for two competing firms based on their pricing decisions"
                }
              ],
              terminology: [
                {
                  term: "Pure Strategy",
                  definition: "A strategy that involves playing one action with certainty"
                },
                {
                  term: "Mixed Strategy",
                  definition: "A strategy that involves randomizing between different actions"
                }
              ]
            },
            quiz: [
              {
                question: "What is a strategy in game theory?",
                options: [
                  "A player's emotion",
                  "A complete plan of action",
                  "The final outcome",
                  "The game rules"
                ],
                correct: 1,
                explanation: "A strategy is a complete plan of action that specifies what a player will do in any situation they might face."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'equilibrium-concepts',
      title: 'Equilibrium Concepts',
      icon: '<Balance />',
      topics: [
        {
          id: 'nash-equilibrium',
          title: 'Nash Equilibrium',
          type: 'advanced-theory',
          difficulty: 'Intermediate',
          readTime: '30 min',
          content: {
            definition: "A situation where no player can unilaterally improve their outcome by changing their strategy.",
            keyPoints: [
              "Each player's strategy is optimal given others' strategies",
              "May involve pure or mixed strategies",
              "Multiple Nash equilibria may exist",
              "Not all Nash equilibria are efficient"
            ],
            realWorldExample: "Traffic choosing which side of the road to drive on - everyone driving on the right is a Nash equilibrium, as is everyone driving on the left.",
            details: {
              mathematics: {
                definition: "For strategies s*, ∀i: ui(s*i, s*-i) ≥ ui(si, s*-i) ∀si",
                explanation: "No player i can achieve a better payoff by deviating from s*i given others' strategies s*-i"
              },
              properties: [
                "Existence theorem for finite games",
                "May not be unique",
                "Can be in pure or mixed strategies",
                "Computationally challenging to find"
              ],
              applications: [
                "Market competition",
                "International relations",
                "Environmental agreements",
                "Network protocols"
              ]
            },
            quiz: [
              {
                question: "What characterizes a Nash Equilibrium?",
                options: [
                  "Best outcome for all players",
                  "No unilateral improvement possible",
                  "Cooperation between players",
                  "Maximum total payoff"
                ],
                correct: 1,
                explanation: "In a Nash Equilibrium, no player can improve their payoff by unilaterally changing their strategy."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Topics',
      icon: '<Graduate />',
      topics: [
        {
          id: 'mechanism-design',
          title: 'Mechanism Design',
          type: 'theoretical-applications',
          difficulty: 'Advanced',
          readTime: '45 min',
          content: {
            definition: "The art of designing the rules of a game to achieve a specific desired outcome.",
            keyPoints: [
              "Reverse game theory - designing games for desired outcomes",
              "Incentive compatibility",
              "Implementation theory",
              "Mechanism design in auctions and markets"
            ],
            realWorldExample: "Designing auction mechanisms for spectrum allocation by governments to telecom companies.",
            details: {
              principles: [
                {
                  name: "Revelation Principle",
                  description: "Any mechanism can be replicated by a truthful direct mechanism"
                },
                {
                  name: "Incentive Compatibility",
                  description: "Mechanisms where telling the truth is optimal"
                }
              ],
              applications: [
                "Auction design",
                "Matching markets",
                "Voting systems",
                "Contract theory"
              ],
              keyResults: [
                {
                  theorem: "Revenue Equivalence",
                  description: "Under certain conditions, different auction formats yield same expected revenue"
                },
                {
                  theorem: "Myerson-Satterthwaite",
                  description: "Impossibility of efficient trade with private values"
                }
              ]
            },
            quiz: [
              {
                question: "What is the main focus of mechanism design?",
                options: [
                  "Analyzing existing games",
                  "Creating games with desired outcomes",
                  "Solving puzzles",
                  "Mathematical proofs"
                ],
                correct: 1,
                explanation: "Mechanism design focuses on creating games or mechanisms that will result in desired outcomes when played by rational agents."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'applications',
      title: 'Applications',
      icon: '<Briefcase />',
      topics: [
        {
          id: 'economic-applications',
          title: 'Economic Applications',
          type: 'applied',
          difficulty: 'Intermediate',
          readTime: '25 min',
          content: {
            definition: "Application of game theory to economic problems and market behavior.",
            keyPoints: [
              "Industrial organization",
              "Market competition",
              "Bargaining theory",
              "Information economics"
            ],
            realWorldExample: "Analysis of OPEC's decision-making regarding oil production quotas.",
            details: {
              applications: [
                {
                  field: "Industrial Organization",
                  examples: [
                    "Market entry decisions",
                    "Product differentiation",
                    "Price competition"
                  ]
                },
                {
                  field: "Labor Markets",
                  examples: [
                    "Wage bargaining",
                    "Job search",
                    "Employment contracts"
                  ]
                }
              ],
              models: [
                {
                  name: "Cournot Competition",
                  description: "Firms compete on quantity"
                },
                {
                  name: "Bertrand Competition",
                  description: "Firms compete on price"
                }
              ]
            },
            quiz: [
              {
                question: "Which is not a typical application of game theory in economics?",
                options: [
                  "Market competition",
                  "Weather forecasting",
                  "Wage negotiation",
                  "Trade agreements"
                ],
                correct: 1,
                explanation: "Weather forecasting is primarily based on meteorological science rather than strategic interaction."
              }
            ]
          }
        }
      ]
    }
  ];
  