interface LeaderboardProps {
  onRestart: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onRestart }) => {
  // This is a placeholder. In a real application, you'd fetch this data from a backend.
  const leaderboardData = [
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 88 },
    { name: 'Charlie', score: 82 },
    { name: 'David', score: 79 },
    { name: 'Eve', score: 75 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="text-left">Rank</th>
            <th className="text-left">Name</th>
            <th className="text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRestart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Start New Challenge
      </button>
    </div>
  );
};

export default Leaderboard;

