
import React, { useState, useEffect, useCallback } from 'react';
import { Category, VocabularyItem, Question } from '../types';
import { VOCABULARY } from '../constants';
import { speakSwahili } from '../services/audioService';

interface GameBoardProps {
  category: Category;
  level: number;
  onCorrect: () => void;
  onWrong: () => void;
  onExit: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ category, level, onCorrect, onWrong, onExit }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const generateQuestion = useCallback(() => {
    const items = VOCABULARY.filter(v => v.category === category);
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const correct = shuffled[0];
    const options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
    
    // Level difficulty logic
    let type: Question['type'] = 'word-to-image';
    if (level > 2) type = Math.random() > 0.5 ? 'image-to-word' : 'word-to-image';
    if (level > 5) type = Math.random() > 0.7 ? 'audio-to-image' : type;

    setQuestion({ correct, options, type });
    setFeedback('none');
  }, [category, level]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSpeech = async (text: string) => {
    setIsTalking(true);
    await speakSwahili(text);
    setIsTalking(false);
  };

  const handleOptionClick = (item: VocabularyItem) => {
    if (feedback !== 'none') return;

    if (item.id === question?.correct.id) {
      setFeedback('correct');
      onCorrect();
      handleSpeech(`Nzuri sana! Huyu ni ${item.swahili}.`);
      setTimeout(() => generateQuestion(), 2000);
    } else {
      setFeedback('wrong');
      onWrong();
      handleSpeech(`Pole! Jaribu tena.`);
      setTimeout(() => setFeedback('none'), 1500);
    }
  };

  if (!question) return null;

  return (
    <div className="w-full max-w-4xl px-4 flex flex-col items-center">
      {/* Animated Talker */}
      <div className="mb-12 relative">
        <div className={`text-9xl transition-all duration-300 ${isTalking ? 'talking' : 'animate-bounce-slow'}`}>
          {question.correct.imageUrl}
        </div>
        <div className="absolute -top-12 -right-24 bg-white border-4 border-green-500 p-4 rounded-3xl rounded-bl-none shadow-xl max-w-xs animate-pulse">
           <p className="font-fredoka text-green-700 text-lg">
             {question.type === 'word-to-image' ? `Yuko wapi "${question.correct.swahili}"?` : `Hii ni nini?`}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {question.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleOptionClick(opt)}
            className={`
              p-6 rounded-3xl shadow-lg border-b-8 transition-all hover:-translate-y-1 active:translate-y-1 active:border-b-0
              ${feedback === 'correct' && opt.id === question.correct.id ? 'bg-green-400 border-green-600' : 
                feedback === 'wrong' && opt.id !== question.correct.id ? 'bg-white border-gray-200' :
                'bg-white hover:bg-yellow-50 border-yellow-200'}
            `}
          >
            {question.type === 'word-to-image' ? (
              <span className="text-5xl">{opt.imageUrl}</span>
            ) : (
              <span className="text-2xl font-fredoka text-green-900">{opt.swahili}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 flex gap-4">
        <button 
          onClick={onExit}
          className="px-6 py-2 bg-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-300 transition-colors"
        >
          Toka (Exit)
        </button>
        <button 
          onClick={() => handleSpeech(question.correct.swahili)}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          🔊 Sikiliza (Listen)
        </button>
      </div>

      {feedback === 'correct' && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
           <div className="text-8xl animate-bounce">🎊</div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
