export interface Scenario {
  id: number;
  title: string;
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
    gameTheoryContent: "This scenario illustrates the concept of brinkmanship in game theory, where two parties push dangerous events to the brink of disaster to achieve the most advantageous outcome. It also demonstrates the importance of finding a Nash equilibrium, where neither party has an incentive to deviate from their strategy given what the other party is doing."
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
    gameTheoryContent: "The Prisoner's Dilemma is a classic example in game theory where two individuals might not cooperate even if it's in their best interests to do so. It demonstrates why two completely rational individuals might not cooperate, even when it appears that it is in their best interests to do so."
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
    gameTheoryContent: "The 'Battle of the Sexes' game demonstrates the concept of multiple Nash equilibria in coordination games. It shows how social conventions or communication can help resolve conflicts when players have different preferences but still benefit from coordinating their actions."
  }
];

export default scenarios;

