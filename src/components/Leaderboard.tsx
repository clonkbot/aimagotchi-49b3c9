import { FC } from 'react';
import type { LeaderboardEntry } from '../App';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard: FC<LeaderboardProps> = ({ entries }) => {
  const sortedEntries = [...entries].sort((a, b) => b.bags - a.bags);
  const totalBags = sortedEntries.reduce((sum, e) => sum + e.bags, 0);

  return (
    <div className="bg-[#1a0f2e]/80 backdrop-blur-sm border border-[#3a2f5e] rounded-2xl p-6 sticky top-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black uppercase tracking-wider text-[#00f5d4]">
          🏆 Leaderboard
        </h3>
        <span className="text-xs font-mono text-white/40">Top Survivors</span>
      </div>

      {/* Total Pool */}
      <div className="bg-gradient-to-r from-[#ff2d95]/10 to-[#00f5d4]/10 rounded-xl p-4 mb-4 border border-[#ff2d95]/20">
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono text-white/60">Total Pool</span>
          <span className="text-2xl font-black text-[#39ff14]">{totalBags.toFixed(2)} Ξ</span>
        </div>
        <div className="mt-2 h-1 bg-[#0a0612] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff2d95] via-[#ffc700] to-[#00f5d4] animate-pulse"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {sortedEntries.map((entry, index) => (
          <div
            key={entry.name}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 ${
              index === 0 ? 'bg-[#ffc700]/10 border border-[#ffc700]/30' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Rank */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                index === 0
                  ? 'bg-gradient-to-br from-[#ffc700] to-[#ff8c00] text-[#0a0612]'
                  : index === 1
                  ? 'bg-gradient-to-br from-[#c0c0c0] to-[#808080] text-[#0a0612]'
                  : index === 2
                  ? 'bg-gradient-to-br from-[#cd7f32] to-[#8b4513] text-white'
                  : 'bg-[#3a2f5e] text-white/60'
              }`}
            >
              {index + 1}
            </div>

            {/* Avatar */}
            <span className="text-2xl">{entry.avatar}</span>

            {/* Name & Bags */}
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm text-white truncate">{entry.name}</p>
              <p className="text-xs text-white/40">
                {((entry.bags / totalBags) * 100).toFixed(1)}% of pool
              </p>
            </div>

            {/* Bags Amount */}
            <div className="text-right">
              <p className="font-black text-[#39ff14]">{entry.bags.toFixed(2)}</p>
              <p className="text-xs text-white/40">Ξ</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-4 pt-4 border-t border-[#3a2f5e]">
        <p className="text-xs text-white/30 font-mono text-center">
          💀 Dead pets drop bags to survivors
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#00f5d4]/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#ff2d95]/5 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
