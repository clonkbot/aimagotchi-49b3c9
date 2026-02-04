import { FC } from 'react';

interface HeaderProps {
  userBags: number;
  hasPet: boolean;
}

export const Header: FC<HeaderProps> = ({ userBags, hasPet }) => {
  return (
    <header className="relative">
      {/* Glitch Title */}
      <div className="text-center mb-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter relative inline-block">
          <span className="absolute inset-0 text-[#00f5d4] animate-[glitch_0.3s_infinite] opacity-70" style={{ clipPath: 'inset(0 0 50% 0)' }}>
            AImagotchi
          </span>
          <span className="absolute inset-0 text-[#ff2d95] animate-[glitch_0.3s_infinite_reverse] opacity-70" style={{ clipPath: 'inset(50% 0 0 0)', animationDelay: '0.1s' }}>
            AImagotchi
          </span>
          <span className="relative bg-gradient-to-r from-[#ff2d95] via-[#ffc700] to-[#00f5d4] bg-clip-text text-transparent">
            AImagotchi
          </span>
        </h1>
        <p className="text-[#00f5d4]/60 font-mono text-sm mt-2 tracking-widest uppercase">
          Feed it. Play with it. Or lose your bags.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex justify-center gap-4 flex-wrap">
        <div className="bg-[#1a0f2e]/80 border border-[#ff2d95]/30 rounded-lg px-4 py-2 backdrop-blur-sm">
          <span className="text-[#ff2d95]/60 text-xs font-mono uppercase tracking-wider">Your Bags</span>
          <p className="text-[#ffc700] font-black text-xl">{userBags.toFixed(2)} Ξ</p>
        </div>
        <div className="bg-[#1a0f2e]/80 border border-[#00f5d4]/30 rounded-lg px-4 py-2 backdrop-blur-sm">
          <span className="text-[#00f5d4]/60 text-xs font-mono uppercase tracking-wider">Status</span>
          <p className="text-white font-black text-xl flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${hasPet ? 'bg-[#39ff14] animate-pulse' : 'bg-[#ff2d95]'}`} />
            {hasPet ? 'Active' : 'No Pet'}
          </p>
        </div>
        <div className="bg-[#1a0f2e]/80 border border-[#ffc700]/30 rounded-lg px-4 py-2 backdrop-blur-sm">
          <span className="text-[#ffc700]/60 text-xs font-mono uppercase tracking-wider">Pool</span>
          <p className="text-[#39ff14] font-black text-xl">31.3 Ξ</p>
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
      `}</style>
    </header>
  );
};
