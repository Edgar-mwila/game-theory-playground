import React, { useState } from 'react';
import scenarios from '../data/scenarios'; // Import the scenarios
import CategorySection from './CategorySection';

interface HeroSectionProps {
  onStart: () => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const uniqueCategories = Array.from(new Set(scenarios.map(s => s.category)));

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 text-black">Step Into History and Make the Call!</h1>
        <p className="text-xl mb-8">What would you do in the face of history? Learn game theory through real-world scenarios and see how your choices compare to the past!</p>
        <CategorySection  
          categories={uniqueCategories}
          onSelectCategory={setSelectedCategory}
          onStart={onStart} 
        />
      </div>
    </div>
  );
};

export default HeroSection;
