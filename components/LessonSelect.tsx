
import React from 'react';
import { Category } from '../types';

interface LessonSelectProps {
  onSelect: (category: Category) => void;
}

const LessonSelect: React.FC<LessonSelectProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-4xl px-4 text-center">
      <h2 className="text-3xl font-fredoka text-green-800 mb-12">CHAGUA SOMO (Choose a Lesson)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard 
          icon="🐾" 
          title="WANYAMA" 
          subtitle="Animals" 
          color="bg-yellow-100" 
          borderColor="border-yellow-400"
          onClick={() => onSelect(Category.Wanyama)} 
        />
        <CategoryCard 
          icon="🍎" 
          title="MATUNDA" 
          subtitle="Fruits" 
          color="bg-red-100" 
          borderColor="border-red-400"
          onClick={() => onSelect(Category.Matunda)} 
        />
        <CategoryCard 
          icon="🔢" 
          title="NAMBARI" 
          subtitle="Numbers" 
          color="bg-blue-100" 
          borderColor="border-blue-400"
          onClick={() => onSelect(Category.Nambari)} 
        />
      </div>
    </div>
  );
};

interface CategoryCardProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, subtitle, color, borderColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} ${borderColor} border-4 border-dashed rounded-[4rem] p-8 transition-transform hover:scale-105 group relative overflow-hidden`}
  >
    <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-5xl mb-4 shadow-sm border-2 border-gray-100">
      {icon}
    </div>
    <h3 className="text-2xl font-fredoka text-green-900 leading-none">{title}</h3>
    <p className="text-gray-500 font-bold mt-1">{subtitle}</p>
    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-white text-xl">▶</span>
    </div>
  </button>
);

export default LessonSelect;
