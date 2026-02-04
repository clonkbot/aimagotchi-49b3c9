import { FC, useState, useEffect } from 'react';
import type { Pet } from '../App';

interface PetDisplayProps {
  pet: Pet;
  onFeed: () => void;
  onPlay: () => void;
  onRest: () => void;
}

const SPECIES_EMOJIS: Record<Pet['species'], string[]> = {
  glitch: ['👾', '💀', '😈', '🤪'],
  neon: ['🤖', '🔋', '⚡', '😴'],
  pixel: ['👽', '🛸', '✨', '💫'],
  cyber: ['🎮', '🕹️', '🎯', '🔥'],
};

const SPECIES_COLORS: Record<Pet['species'], string> = {
  glitch: '#ff2d95',
  neon: '#00f5d4',
  pixel: '#39ff14',
  cyber: '#ffc700',
};

export const PetDisplay: FC<PetDisplayProps> = ({ pet, onFeed, onPlay, onRest }) => {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const emojis = SPECIES_EMOJIS[pet.species];
  const color = SPECIES_COLORS[pet.species];

  const getMood = () => {
    const avg = (pet.hunger + pet.happiness + pet.energy) / 3;
    if (avg > 70) return { emoji: emojis[0], text: 'Happy!' };
    if (avg > 40) return { emoji: emojis[1], text: 'Okay...' };
    if (avg > 20) return { emoji: emojis[2], text: 'Sad' };
    return { emoji: emojis[3], text: 'CRITICAL!' };
  };

  const mood = getMood();

  const handleAction = (action: () => void, feedback: string) => {
    action();
    setActionFeedback(feedback);
    setTimeout(() => setActionFeedback(null), 1000);
  };

  const StatBar: FC<{ label: string; value: number; icon: string; barColor: string }> = ({ label, value, icon, barColor }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono uppercase tracking-wider text-white/60 flex items-center gap-1">
          <span>{icon}</span> {label}
        </span>
        <span className="text-xs font-mono" style={{ color: value < 30 ? '#ff2d95' : barColor }}>{value}%</span>
      </div>
      <div className="h-3 bg-[#1a0f2e] rounded-full overflow-hidden border border-[#3a2f5e]">
        <div
          className="h-full transition-all duration-500 rounded-full relative"
          style={{
            width: `${value}%`,
            background: value < 30
              ? 'linear-gradient(90deg, #ff2d95, #ff6b6b)'
              : `linear-gradient(90deg, ${barColor}, ${barColor}88)`,
            boxShadow: value < 30 ? '0 0 10px #ff2d95' : `0 0 10px ${barColor}`,
          }}
        >
          {value < 30 && (
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.3)_5px,rgba(0,0,0,0.3)_10px)] animate-[moveStripes_1s_linear_infinite]" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-lg animate-[float_3s_ease-in-out_infinite]">
      {/* Device Shell */}
      <div className="relative">
        {/* Outer Shell */}
        <div
          className="rounded-[40px] p-4 shadow-[0_0_60px_var(--glow),inset_0_2px_0_rgba(255,255,255,0.1)]"
          style={{
            background: 'linear-gradient(to bottom, #2a1f4e, #1a0f2e)',
            '--glow': `${color}50`,
          } as React.CSSProperties}
        >
          {/* Inner Screen Bezel */}
          <div className="bg-[#0a0612] rounded-[28px] p-6 border-4 border-[#3a2f5e] relative overflow-hidden">
            {/* Screen Glare */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[24px]" />

            {/* LCD Screen Effect */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              {/* Pet Name & Status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black" style={{ color }}>{pet.name}</h2>
                  <p className="text-xs font-mono text-white/40 uppercase">{pet.species} • Age: {Math.floor(pet.age / 20)}d</p>
                </div>
                <div className="text-right">
                  <span className="text-[#ffc700] font-bold">{pet.stakedAmount.toFixed(2)} Ξ</span>
                  <p className="text-xs font-mono text-white/40">staked</p>
                </div>
              </div>

              {/* Pet Display Area */}
              <div
                className="relative h-48 rounded-xl mb-4 flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${color}20, transparent 70%)`,
                  border: `2px solid ${color}30`,
                }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full animate-pulse"
                      style={{
                        background: color,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Pet Character */}
                <div className={`text-8xl transition-transform duration-300 ${pet.isAlive ? '' : 'grayscale opacity-50 rotate-180'}`}>
                  {pet.isAlive ? (
                    <span className="inline-block animate-bounce" style={{ animationDuration: '1s' }}>
                      {mood.emoji}
                    </span>
                  ) : (
                    '💀'
                  )}
                </div>

                {/* Action Feedback */}
                {actionFeedback && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-ping"
                    style={{ animationDuration: '0.5s' }}
                  >
                    {actionFeedback}
                  </div>
                )}

                {/* Mood Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
                  <span className="text-xs font-mono" style={{ color }}>{mood.text}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4">
                <StatBar label="Hunger" value={pet.hunger} icon="🍔" barColor="#ff2d95" />
                <StatBar label="Happiness" value={pet.happiness} icon="💖" barColor="#00f5d4" />
                <StatBar label="Energy" value={pet.energy} icon="⚡" barColor="#ffc700" />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleAction(onFeed, '🍔')}
                  disabled={!pet.isAlive}
                  className="group relative py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-b from-[#ff2d95] to-[#cc2477] hover:from-[#ff4da6] hover:to-[#ff2d95] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_4px_0_#991d5a] hover:shadow-[0_2px_0_#991d5a] hover:translate-y-[2px]"
                >
                  <span className="block group-active:translate-y-[1px]">🍔 Feed</span>
                </button>
                <button
                  onClick={() => handleAction(onPlay, '🎮')}
                  disabled={!pet.isAlive || pet.energy < 20}
                  className="group relative py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-b from-[#00f5d4] to-[#00c4aa] hover:from-[#33f7dc] hover:to-[#00f5d4] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_4px_0_#009980] hover:shadow-[0_2px_0_#009980] hover:translate-y-[2px] text-[#0a0612]"
                >
                  <span className="block group-active:translate-y-[1px]">🎮 Play</span>
                </button>
                <button
                  onClick={() => handleAction(onRest, '😴')}
                  disabled={!pet.isAlive}
                  className="group relative py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-b from-[#ffc700] to-[#cc9f00] hover:from-[#ffd133] hover:to-[#ffc700] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_4px_0_#997700] hover:shadow-[0_2px_0_#997700] hover:translate-y-[2px] text-[#0a0612]"
                >
                  <span className="block group-active:translate-y-[1px]">😴 Rest</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Device Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a2f5e] to-[#2a1f4e] border-2 border-[#4a3f6e] shadow-lg hover:scale-95 active:scale-90 transition-transform" />
          <button className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a2f5e] to-[#2a1f4e] border-2 border-[#4a3f6e] shadow-lg hover:scale-95 active:scale-90 transition-transform" />
          <button className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a2f5e] to-[#2a1f4e] border-2 border-[#4a3f6e] shadow-lg hover:scale-95 active:scale-90 transition-transform" />
        </div>

        {/* Keychain Loop */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 border-4 border-[#4a3f6e] rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes moveStripes {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
      `}</style>
    </div>
  );
};
