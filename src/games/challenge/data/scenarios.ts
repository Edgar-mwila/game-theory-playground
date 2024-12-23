export interface Scenario {
  id: number;
  title: string;
  category: string;
  description: string;
  choices: string[];
  feedback: string[];
  explanation: string;
  gameTheoryContent?: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Cuban Missile Crisis (1962)",
    description: "The U.S. and the USSR face off over missiles in Cuba. As the U.S. President, what action will you take?",
    choices: [
      "Demand missile removal (risk escalation)",
      "Launch a strike (immediate war)",
      "Negotiate secretly (trust-building)"
    ],
    feedback: [
      "This is a risky move that could lead to further escalation.",
      "This is an extreme action that could lead to devastating consequences.",
      "Great choice! This aligns with how Kennedy resolved the crisis through back-channel diplomacy."
    ],
    explanation: "The Cuban Missile Crisis was resolved through secret negotiations, avoiding a potentially catastrophic war. This scenario demonstrates concepts of brinkmanship and the importance of diplomatic channels in international conflicts.",
    gameTheoryContent: "This scenario illustrates the concept of brinkmanship in game theory, where two parties push dangerous events to the brink of disaster to achieve the most advantageous outcome. It also demonstrates the importance of finding a Nash equilibrium, where neither party has an incentive to deviate from their strategy given what the other party is doing.",
    category: "Political science"
  },
  {
    id: 2,
    title: "Prisoner's Dilemma: The Watergate Scandal (1972)",
    description: "You're one of Nixon's aides implicated in the Watergate scandal. Do you confess or stay silent?",
    choices: [
      "Confess and implicate Nixon",
      "Stay silent and hope others don't confess"
    ],
    feedback: [
      "Correct! Cooperating with prosecutors minimizes your prison sentence. The others defected, and silence would have been costly.",
      "This is a risky choice. If others confess, you could face a harsher sentence."
    ],
    explanation: "This scenario illustrates the Prisoner's Dilemma, a fundamental concept in game theory. The dominant strategy is to confess, as it provides the best outcome regardless of what others do.",
    gameTheoryContent: "The Prisoner's Dilemma is a classic example in game theory where two individuals might not cooperate even if it's in their best interests to do so. It demonstrates why two completely rational individuals might not cooperate, even when it appears that it is in their best interests to do so.",
    category: "Political science"
  },
  {
    id: 3,
    title: "Battle of the Sexes (Cold War Sports)",
    description: "A couple needs to decide which sports event to attend. The husband prefers a football game, while the wife prefers a ballet performance. What should they do?",
    choices: [
      "Attend the football game",
      "Attend the ballet performance",
      "Each goes to their preferred event separately"
    ],
    feedback: [
      "This choice favors one partner's preference. In game theory, this is one of two pure strategy Nash equilibria.",
      "This choice favors the other partner's preference. This is also a pure strategy Nash equilibrium.",
      "While this allows both to enjoy their preferred event, it results in a lower payoff as they don't get to spend time together."
    ],
    explanation: "This scenario, known as the 'Battle of the Sexes' in game theory, illustrates coordination games where players have different preferences but still benefit from coordinating their actions.",
    gameTheoryContent: "The 'Battle of the Sexes' game demonstrates the concept of multiple Nash equilibria in coordination games. It shows how social conventions or communication can help resolve conflicts when players have different preferences but still benefit from coordinating their actions.",
    category: "Relationships"
  },
  {
    id: 4,
    title: "The Tragedy of the Commons",
    description: "You and other villagers share a common grazing field. How many animals will you graze?",
    choices: [
      "Grail 1 animal (sustainable use)",
      "Graze 3 animals (maximize short-term benefit)",
      "Graze 5 animals (over-exploit for maximum gain)"
    ],
    feedback: [
      "A sustainable choice that helps preserve the common resource.",
      "This choice risks depleting the resource if everyone chooses similarly.",
      "Over-grazing leads to the rapid depletion of the common resource, harming everyone in the long run."
    ],
    explanation: "The 'Tragedy of the Commons' demonstrates how individual incentives can lead to the over-exploitation of shared resources, harming the group as a whole.",
    gameTheoryContent: "This scenario highlights the tension between individual rationality and collective welfare. Game theory shows that external regulation or agreements are often required to prevent overuse of shared resources.",
    category: "Social science"
  },
  {
    id: 5,
    title: "Chicken Game: Arms Race",
    description: "Two nations are in an arms race. Should you build more weapons or attempt disarmament?",
    choices: [
      "Build more weapons (escalation)",
      "Attempt disarmament (risk trust issues)",
      "Do nothing (maintain status quo)"
    ],
    feedback: [
      "Escalation increases tension and the risk of conflict.",
      "This approach requires trust and communication but can lead to stability.",
      "A neutral stance avoids immediate risks but may fail to address underlying tensions."
    ],
    explanation: "The Chicken Game models situations where players face off to see who will yield first. An arms race represents brinkmanship, with catastrophic risks if neither side yields.",
    gameTheoryContent: "This game illustrates the risks of escalation and the potential for mutually beneficial outcomes through cooperation and trust-building.",
    category: "Demographics"
  },
  {
    id: 6,
    title: "Monty Hall Problem",
    description: "You're on a game show. You pick one of three doors, one hides a car, and the others hide goats. After you choose, the host reveals a goat behind one of the remaining doors. Do you switch your choice?",
    choices: [
      "Stay with the original door",
      "Switch to the other door"
    ],
    feedback: [
      "Staying gives you a 1/3 chance of winning.",
      "Switching increases your chances to 2/3!"
    ],
    explanation: "The Monty Hall Problem demonstrates probability and decision-making under uncertainty. Switching doors improves your chances of winning due to conditional probabilities.",
    gameTheoryContent: "While not a traditional game theory scenario, it highlights strategic decision-making based on updated information.",
    category: "Life"
  },
  {
    id: 7,
    title: "Stag Hunt (Cooperative Hunting)",
    description: "You and a friend can hunt a stag together or each hunt rabbits individually. What will you do?",
    choices: [
      "Hunt stag (cooperate)",
      "Hunt rabbit (act alone)"
    ],
    feedback: [
      "Cooperating yields the highest joint payoff if both choose it.",
      "Acting alone ensures a smaller but guaranteed payoff."
    ],
    explanation: "The Stag Hunt models situations where cooperation yields the highest payoff, but requires trust.",
    gameTheoryContent: "The Stag Hunt game explores coordination and the risks of cooperation. It contrasts with the Prisoner's Dilemma, as the best outcomes occur when both parties trust each other.",
    category: "Community"
  },
  {
    id: 8,
    title: "Ultimatum Game",
    description: "You must propose how to split $100 with another player. If they reject your offer, neither gets anything. How much do you offer?",
    choices: [
      "$50 (fair split)",
      "$20 (keep more for yourself)",
      "$1 (maximize your share)"
    ],
    feedback: [
      "Fair offers are more likely to be accepted.",
      "Risky! The other player might reject this offer as unfair.",
      "Unlikely to be accepted, leaving both with nothing."
    ],
    explanation: "The Ultimatum Game explores fairness, negotiation, and the psychological factors influencing decision-making.",
    gameTheoryContent: "This game challenges the assumption of purely rational decision-making, incorporating elements of fairness and social preferences.",
    category: "Relationships"
  },
  {
    id: 9,
    title: "Colonial Negotiation (Berlin Conference)",
    description: "You're a European power negotiating colonial boundaries in Africa. Do you prioritize cooperation or maximize your territorial gains?",
    choices: [
      "Cooperate for stability",
      "Maximize gains at the expense of others"
    ],
    feedback: [
      "This approach fosters long-term stability but might result in smaller immediate gains.",
      "This aggressive approach risks future conflicts and instability."
    ],
    explanation: "The Berlin Conference demonstrates real-world applications of game theory in international negotiations.",
    gameTheoryContent: "This scenario illustrates zero-sum games and the potential benefits of cooperative strategies.",
    category: "Political science"
  },
  {
    id: 10,
    title: "Tit-for-Tat Strategy (Iterated Prisoner's Dilemma)",
    description: "You're in an ongoing interaction with another player. Do you cooperate or defect?",
    choices: [
      "Cooperate (build trust)",
      "Defect (maximize immediate gain)"
    ],
    feedback: [
      "Cooperation fosters trust and mutual benefit over time.",
      "Defection risks retaliation, reducing future payoffs."
    ],
    explanation: "Tit-for-Tat is a successful strategy in repeated interactions, promoting cooperation while punishing defection.",
    gameTheoryContent: "The Iterated Prisoner's Dilemma demonstrates the dynamics of trust, retaliation, and long-term strategy in repeated games.",
    category: "Relationships"
  },
  // Add more scenarios following this format...
];

export default scenarios;
