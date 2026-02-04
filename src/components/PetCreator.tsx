import { FC, useState } from 'react';
import type { Pet } from '../App';

interface PetCreatorProps {
  onCreate: (name: string, species: Pet['species'], amount: number) => void;
}

const SPECIES_OPTIONS: { id: Pet['species']; name: string; emoji: string; desc: string; color: string }[] = [
  { id: 'glitch', name: 'Glitch', emoji: '👾', desc: 'Chaotic & unpredictable', color: '#ff2d95' },
  { id: 'neon', name: 'Neon', emoji: '🤖', desc: 'Bright & energetic', color: '#00f5d4' },
  { id: 'pixel', name: 'Pixel', emoji: '👽', desc: 'Classic & nostalgic', color: '#39ff14' },
  { id: 'cyber', name: 'Cyber', emoji: '🎮', desc: 'Futuristic & sleek', color: '#ffc700' },
];

export const PetCreator: FC<PetCreatorProps> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Pet['species']>('glitch');
  const [amount, setAmount] = useState(0.1);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) return;
    setIsCreating(true);
    setTimeout(() => {
      onCreate(name, species, amount);
      setIsCreating(false);
    }, 1500);
  };

  const selectedSpecies = SPECIES_OPTIONS.find(s => s.id === species);

  return (
    <div className="w-full max-w-lg animate-[float_3s_ease-in-out_infinite]">
      {/* Device Shell */}
      <div className="relative">
        {/* Outer Shell */}
        <div className="bg-gradient-to-b from-[#2a1f4e] to-[#1a0f2e] rounded-[40px] p-4 shadow-[0_0_60px_rgba(255,45,149,0.3),inset_0_2px_0_rgba(255,255,255,0.1)]">
          {/* Inner Screen Bezel */}
          <div className="bg-[#0a0612] rounded-[28px] p-6 border-4 border-[#3a2f5e] relative overflow-hidden">
            {/* Screen Glare */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[24px]" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-center mb-6 bg-gradient-to-r from-[#ff2d95] to-[#00f5d4] bg-clip-text text-transparent">
                Create Your AImagotchi
              </h2>

              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-[#00f5d4]/60 text-xs font-mono uppercase tracking-wider mb-2">
                  Name Your Pet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name..."
                  className="w-full bg-[#1a0f2e] border-2 border-[#ff2d95]/30 rounded-lg px-4 py-3 text-white font-mono placeholder:text-white/20 focus:outline-none focus:border-[#ff2d95] focus:shadow-[0_0_20px_rgba(255,45,149,0.3)] transition-all"
                  maxLength={20}
                />
              </div>

              {/* Species Selection */}
              <div className="mb-6">
                <label className="block text-[#00f5d4]/60 text-xs font-mono uppercase tracking-wider mb-2">
                  Choose Species
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SPECIES_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSpecies(s.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        species === s.id
                          ? 'border-[var(--color)] bg-[var(--color)]/10 shadow-[0_0_20px_var(--color)]'
                          : 'border-[#3a2f5e] bg-[#1a0f2e]/50 hover:border-[var(--color)]/50'
                      }`}
                      style={{ '--color': s.color } as React.CSSProperties}
                    >
                      <span className="text-3xl block mb-1">{s.emoji}</span>
                      <span className="text-white font-bold text-sm">{s.name}</span>
                      <span className="text-white/40 text-xs block">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stake Amount */}
              <div className="mb-6">
                <label className="block text-[#00f5d4]/60 text-xs font-mono uppercase tracking-wider mb-2">
                  Stake Amount
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="flex-1 accent-[#ff2d95]"
                  />
                  <div className="bg-[#1a0f2e] border border-[#ffc700]/30 rounded-lg px-3 py-2 min-w-[80px] text-center">
                    <span className="text-[#ffc700] font-black">{amount.toFixed(2)} Ξ</span>
                  </div>
                </div>
                <p className="text-white/30 text-xs mt-2 font-mono">
                  ⚠️ If your pet dies, bags go to the pool
                </p>
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreate}
                disabled={!name.trim() || isCreating}
                className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all relative overflow-hidden group ${
                  isCreating
                    ? 'bg-[#3a2f5e] text-white/50 cursor-wait'
                    : name.trim()
                    ? 'bg-gradient-to-r from-[#ff2d95] to-[#ffc700] text-white hover:shadow-[0_0_40px_rgba(255,45,149,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-[#3a2f5e] text-white/30 cursor-not-allowed'
                }`}
              >
                {isCreating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Minting...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Mint AImagotchi</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#ffc700] to-[#ff2d95] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 group-hover:text-white"> → {amount.toFixed(2)} Ξ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Device Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a2f5e] to-[#2a1f4e] border-2 border-[#4a3f6e] shadow-lg" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a2f5e] to-[#2a1f4e] border-2 border-[#4a3f6e] shadow-lg" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#3a2f5e] to-[#2a1f4e] border-2 border-[#4a3f6e] shadow-lg" />
        </div>

        {/* Keychain Loop */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 border-4 border-[#4a3f6e] rounded-full" />
        </div>
      </div>

      {/* Selected Species Preview */}
      {selectedSpecies && (
        <div className="mt-6 text-center opacity-60">
          <span className="text-6xl animate-bounce inline-block">{selectedSpecies.emoji}</span>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
