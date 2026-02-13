
import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-5xl px-4 text-center">
      <div className="relative mb-12">
        <div className="absolute -top-12 -left-4 w-24 h-24 bg-blue-200/50 rounded-full blur-2xl -z-10 animate-pulse"></div>
        <h1 className="text-6xl md:text-8xl font-fredoka text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)]">
          LEARN <span className="text-yellow-400">SWAHILI</span> <br /> & MORE
        </h1>
        <p className="mt-6 text-2xl font-bold text-green-800 bg-white/60 inline-block px-8 py-2 rounded-full backdrop-blur-sm">
          Are you ready to explore Africa?
        </p>
      </div>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center gap-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-fredoka text-4xl px-12 py-6 rounded-full border-b-8 border-yellow-600 transition-all hover:-translate-y-1 active:translate-y-2 active:border-b-0 shadow-2xl"
      >
        ANZA
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 transition-transform group-hover:translate-x-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-90">
         <div className="bg-white p-4 rounded-3xl shadow-lg border-2 border-yellow-200 w-48 animate-bounce-slow">
            <span className="text-6xl block mb-2">🦒</span>
            <p className="font-bold text-green-800">Twiga</p>
         </div>
         <div className="bg-white p-4 rounded-3xl shadow-lg border-2 border-yellow-200 w-48 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
            <span className="text-6xl block mb-2">🐒</span>
            <p className="font-bold text-green-800">Kima</p>
         </div>
         <div className="bg-white p-4 rounded-3xl shadow-lg border-2 border-yellow-200 w-48 animate-bounce-slow" style={{ animationDelay: '1s' }}>
            <span className="text-6xl block mb-2">🦁</span>
            <p className="font-bold text-green-800">Simba</p>
         </div>
      </div>
    </div>
  );
};

export default Home;
