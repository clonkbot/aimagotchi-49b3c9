import { useState, useEffect, useCallback } from 'react';
import { PetCreator } from './components/PetCreator';
import { PetDisplay } from './components/PetDisplay';
import { DeadPetModal } from './components/DeadPetModal';
import { Leaderboard } from './components/Leaderboard';
import { Header } from './components/Header';

export interface Pet {
  id: string;
  name: string;
  species: 'glitch' | 'neon' | 'pixel' | 'cyber';
  hunger: number;
  happiness: number;
  energy: number;
  age: number;
  isAlive: boolean;
  lastFed: number;
  lastPlayed: number;
  createdAt: number;
  stakedAmount: number;
}

export interface LeaderboardEntry {
  name: string;
  bags: number;
  avatar: string;
}

const DECAY_RATE = 2;
const DEATH_THRESHOLD = 10;

function App() {
  const [pet, setPet] = useState<Pet | null>(null);
  const [showDeadModal, setShowDeadModal] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { name: '0xDead...Beef', bags: 12.5, avatar: '👾' },
    { name: '0xCafe...Babe', bags: 8.2, avatar: '🤖' },
    { name: '0xFeed...Face', bags: 5.7, avatar: '👽' },
    { name: '0xC0de...D00d', bags: 3.1, avatar: '🎮' },
    { name: '0xB00B...1337', bags: 1.8, avatar: '🕹️' },
  ]);
  const [userBags, setUserBags] = useState(0);

  const updateStats = useCallback(() => {
    if (!pet || !pet.isAlive) return;

    const now = Date.now();
    const timeSinceLastFed = (now - pet.lastFed) / 1000 / 60;
    const timeSinceLastPlayed = (now - pet.lastPlayed) / 1000 / 60;

    const newHunger = Math.max(0, pet.hunger - (timeSinceLastFed > 1 ? DECAY_RATE : 0));
    const newHappiness = Math.max(0, pet.happiness - (timeSinceLastPlayed > 1 ? DECAY_RATE : 0));
    const newEnergy = Math.max(0, Math.min(100, pet.energy + 1));

    const isDead = newHunger <= DEATH_THRESHOLD || newHappiness <= DEATH_THRESHOLD;

    if (isDead && pet.isAlive) {
      setPet({ ...pet, hunger: newHunger, happiness: newHappiness, energy: newEnergy, isAlive: false });
      setShowDeadModal(true);
      const distributed = pet.stakedAmount / leaderboard.length;
      setLeaderboard(prev => prev.map(entry => ({ ...entry, bags: entry.bags + distributed })));
    } else {
      setPet(prev => prev ? { ...prev, hunger: newHunger, happiness: newHappiness, energy: newEnergy, age: prev.age + 1 } : null);
    }
  }, [pet, leaderboard.length]);

  useEffect(() => {
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, [updateStats]);

  const createPet = (name: string, species: Pet['species'], amount: number) => {
    const newPet: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      species,
      hunger: 100,
      happiness: 100,
      energy: 100,
      age: 0,
      isAlive: true,
      lastFed: Date.now(),
      lastPlayed: Date.now(),
      createdAt: Date.now(),
      stakedAmount: amount,
    };
    setPet(newPet);
    setUserBags(prev => prev + amount * 0.1);
  };

  const feedPet = () => {
    if (!pet || !pet.isAlive) return;
    setPet({ ...pet, hunger: Math.min(100, pet.hunger + 30), lastFed: Date.now() });
  };

  const playWithPet = () => {
    if (!pet || !pet.isAlive || pet.energy < 20) return;
    setPet({ ...pet, happiness: Math.min(100, pet.happiness + 25), energy: pet.energy - 20, lastPlayed: Date.now() });
  };

  const restPet = () => {
    if (!pet || !pet.isAlive) return;
    setPet({ ...pet, energy: Math.min(100, pet.energy + 40) });
  };

  const resetGame = () => {
    setPet(null);
    setShowDeadModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0612] text-white relative overflow-hidden">
      {/* CRT Scanlines Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0.15)_1px,transparent_1px,transparent_2px)] opacity-30" />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,45,149,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,45,149,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-[#ff2d95] rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-[#00f5d4] rounded-full blur-[150px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed top-1/2 left-1/2 w-48 h-48 bg-[#ffc700] rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <Header userBags={userBags} hasPet={!!pet} />

        <main className="flex-1 flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1 flex items-center justify-center">
            {!pet ? (
              <PetCreator onCreate={createPet} />
            ) : (
              <PetDisplay
                pet={pet}
                onFeed={feedPet}
                onPlay={playWithPet}
                onRest={restPet}
              />
            )}
          </div>

          <aside className="lg:w-80">
            <Leaderboard entries={leaderboard} />
          </aside>
        </main>

        {showDeadModal && pet && (
          <DeadPetModal pet={pet} onClose={resetGame} />
        )}

        {/* Footer */}
        <footer className="mt-12 pb-4 text-center">
          <p className="text-xs text-[#ff2d95]/40 tracking-wider font-mono">
            Requested by <span className="text-[#00f5d4]/50">@0xPaulius</span> · Built by <span className="text-[#00f5d4]/50">@clonkbot</span>
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes pulse-neon {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px currentColor); }
          50% { opacity: 0.8; filter: drop-shadow(0 0 20px currentColor); }
        }
      `}</style>
    </div>
  );
}

export default App;
