interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/cuban-missile-crisis.jpg')"}}></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('/watergate-scandal.jpg')", transform: 'translateY(100%)'}}></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage: "url('/battle-of-sexes.jpg')", transform: 'translateY(200%)'}}></div>
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Step Into History and Make the Call!</h1>
        <p className="text-xl mb-8">What would you do in the face of history? Learn game theory through real-world scenarios and see how your choices compare to the past!</p>
        <button onClick={onStart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Start Your Challenge
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

