
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Category, VocabularyItem } from './types';
import { MAX_LIVES, RECHARGE_TIME_MS, VOCABULARY } from './constants';
import Header from './components/Header';
import LessonSelect from './components/LessonSelect';
import GameBoard from './components/GameBoard';
import Home from './components/Home';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('jambo_kids_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure time logic is consistent
      return {
        ...parsed,
        currentScreen: 'home'
      };
    }
    return {
      points: 0,
      lives: MAX_LIVES,
      lastLifeLostAt: null,
      level: 1,
      currentScreen: 'home',
      selectedCategory: null,
    };
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('jambo_kids_state', JSON.stringify(state));
  }, [state]);

  // Life recharge logic
  useEffect(() => {
    if (state.lives < MAX_LIVES && state.lastLifeLostAt) {
      const timer = setInterval(() => {
        const now = Date.now();
        const timeSinceLost = now - state.lastLifeLostAt!;
        if (timeSinceLost >= RECHARGE_TIME_MS) {
          setState(prev => ({
            ...prev,
            lives: Math.min(MAX_LIVES, prev.lives + 1),
            lastLifeLostAt: prev.lives + 1 < MAX_LIVES ? prev.lastLifeLostAt! + RECHARGE_TIME_MS : null
          }));
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.lives, state.lastLifeLostAt]);

  const handleStartGame = () => {
    setState(prev => ({ ...prev, currentScreen: 'lesson-select' }));
  };

  const selectCategory = (category: Category) => {
    setState(prev => ({ ...prev, selectedCategory: category, currentScreen: 'game' }));
  };

  const handleCorrectAnswer = () => {
    setState(prev => {
      const nextLevelPoints = 50 * prev.level;
      const isLevelUp = prev.points + 10 >= nextLevelPoints;
      return {
        ...prev,
        points: prev.points + 10,
        level: isLevelUp ? prev.level + 1 : prev.level
      };
    });
  };

  const handleWrongAnswer = () => {
    setState(prev => {
      const newLives = Math.max(0, prev.lives - 1);
      return {
        ...prev,
        lives: newLives,
        lastLifeLostAt: prev.lastLifeLostAt || Date.now(),
        currentScreen: newLives === 0 ? 'game-over' : prev.currentScreen
      };
    });
  };

  const goHome = () => {
    setState(prev => ({ ...prev, currentScreen: 'home', selectedCategory: null }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBE7]">
      <Header 
        points={state.points} 
        lives={state.lives} 
        level={state.level} 
        lastLifeLostAt={state.lastLifeLostAt}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {state.currentScreen === 'home' && <Home onStart={handleStartGame} />}
        
        {state.currentScreen === 'lesson-select' && (
          <LessonSelect onSelect={selectCategory} />
        )}
        
        {state.currentScreen === 'game' && state.selectedCategory && (
          <GameBoard 
            category={state.selectedCategory} 
            level={state.level} 
            onCorrect={handleCorrectAnswer}
            onWrong={handleWrongAnswer}
            onExit={goHome}
          />
        )}

        {state.currentScreen === 'game-over' && (
          <div className="text-center bg-white p-8 rounded-3xl shadow-xl border-4 border-red-400 max-w-sm">
            <h2 className="text-4xl font-fredoka text-red-500 mb-4">Lala Salama!</h2>
            <p className="text-xl text-gray-600 mb-6">Oh no! You've run out of lives. They will recharge soon!</p>
            <button 
              onClick={goHome}
              className="px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg"
            >
              Back Home
            </button>
          </div>
        )}
      </main>

      <footer className="bg-[#2E4F24] text-white py-4 px-6 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold">★</span>
          </div>
          <span className="font-fredoka">JAMBO KIDS!</span>
        </div>
        <p>© 2024 Jambo Kids. Asanteni sana!</p>
      </footer>
    </div>
  );
};

export default App;
