import { FC, useState, useEffect } from 'react';
import type { Pet } from '../App';

interface DeadPetModalProps {
  pet: Pet;
  onClose: () => void;
}

export const DeadPetModal: FC<DeadPetModalProps> = ({ pet, onClose }) => {
  const [glitchText, setGlitchText] = useState(pet.name);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Glitch effect on name
    const chars = 'ΩΣΨΞ░▒▓█▄▀■□●○◆◇';
    let iterations = 0;
    const interval = setInterval(() => {
      setGlitchText(
        pet.name
          .split('')
          .map((char, i) => {
            if (i < iterations) return pet.name[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iterations += 1 / 3;
      if (iterations > pet.name.length) clearInterval(interval);
    }, 50);

    // Show content after dramatic pause
    setTimeout(() => setShowContent(true), 500);

    return () => clearInterval(interval);
  }, [pet.name]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-[#1a0f2e] to-[#0a0612] border-2 border-[#ff2d95] rounded-2xl p-8 max-w-md w-full shadow-[0_0_100px_rgba(255,45,149,0.5)] animate-[scaleIn_0.3s_ease-out]">
        {/* Glitch Lines */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-[#ff2d95]/50 animate-[glitchLine_0.1s_infinite]"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Death Icon */}
          <div className="text-8xl mb-4 animate-[shake_0.5s_ease-in-out_infinite]">
            💀
          </div>

          {/* Title */}
          <h2 className="text-4xl font-black text-[#ff2d95] mb-2 animate-[flicker_0.15s_infinite]">
            GAME OVER
          </h2>

          {/* Pet Name with Glitch */}
          <p className="text-2xl font-mono text-white/80 mb-6">
            <span className="text-[#ff2d95]">{glitchText}</span> has died
          </p>

          {showContent && (
            <div className="animate-[fadeSlideUp_0.5s_ease-out]">
              {/* Stats */}
              <div className="bg-black/50 rounded-xl p-4 mb-6 border border-[#ff2d95]/30">
                <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                  <div>
                    <span className="text-white/40">Age</span>
                    <p className="text-white font-bold">{Math.floor(pet.age / 20)} days</p>
                  </div>
                  <div>
                    <span className="text-white/40">Species</span>
                    <p className="text-white font-bold capitalize">{pet.species}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-white/40">Bags Lost</span>
                    <p className="text-[#ff2d95] font-black text-2xl">{pet.stakedAmount.toFixed(2)} Ξ</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-white/60 text-sm mb-6 font-mono">
                Your bags have been distributed to the pool.
                <br />
                <span className="text-[#00f5d4]">Other AImagotchi owners thank you.</span>
              </p>

              {/* Try Again Button */}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider bg-gradient-to-r from-[#ff2d95] to-[#ffc700] text-white hover:shadow-[0_0_40px_rgba(255,45,149,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Try Again 💸
              </button>
            </div>
          )}
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff2d95]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff2d95]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff2d95]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff2d95]" />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes glitchLine {
          0%, 100% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
