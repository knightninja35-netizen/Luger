
import React, { useEffect, useState } from 'react';
import { RECHARGE_TIME_MS } from '../constants';

interface HeaderProps {
  points: number;
  lives: number;
  level: number;
  lastLifeLostAt: number | null;
}

const Header: React.FC<HeaderProps> = ({ points, lives, level, lastLifeLostAt }) => {
  const [timerText, setTimerText] = useState('');

  useEffect(() => {
    if (lives < 5 && lastLifeLostAt) {
      const interval = setInterval(() => {
        const remaining = RECHARGE_TIME_MS - (Date.now() - lastLifeLostAt);
        if (remaining > 0) {
          const mins = Math.floor(remaining / 60000);
          const secs = Math.floor((remaining % 60000) / 1000);
          setTimerText(`${mins}:${secs.toString().padStart(2, '0')}`);
        } else {
          setTimerText('');
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimerText('');
    }
  }, [lives, lastLifeLostAt]);

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 py-3 px-6 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-1.5 rounded-full border-2 border-yellow-400 shadow-sm">
          <span className="text-2xl">⭐</span>
          <span className="font-fredoka text-yellow-700 text-lg">{points}</span>
        </div>
        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-2xl ${i < lives ? 'grayscale-0' : 'grayscale'}`}>❤️</span>
            ))}
          </div>
          {timerText && (
            <span className="text-xs font-bold text-red-400 ml-1">Next: {timerText}</span>
          )}
        </div>
        <div className="flex md:hidden items-center gap-1 bg-red-100 px-3 py-1 rounded-full border-2 border-red-300">
           <span className="text-xl">❤️</span>
           <span className="font-fredoka text-red-600">{lives}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:inline font-bold text-green-700">Kiungo (Level):</span>
        <div className="bg-green-600 text-white font-fredoka px-4 py-1 rounded-full shadow-inner border-b-4 border-green-800">
          {level}
        </div>
      </div>
    </header>
  );
};

export default Header;
