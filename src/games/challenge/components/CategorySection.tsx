import React from 'react';

interface CategorySectionProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  onStart: () => void
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, onSelectCategory, onStart }) => {
  return (
    <div className="flex flex-1 flex-col mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Choose a Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
                onSelectCategory(category);
                onStart();
                }
            }

            className="p-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded shadow"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
