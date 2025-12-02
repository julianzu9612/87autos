"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Gift, Sparkles, Star, Wallet } from "lucide-react";
import Link from "next/link";
import { teams } from "@/lib/teams";
import { cn } from "@/lib/utils";

type Challenge = {
  id: string;
  title: string;
  description: string;
  reward: number;
  claimed: boolean;
};

type RewardItem = {
  id: string;
  name: string;
  cost: number;
  tag: string;
};

export default function RewardsPage() {
  const [points, setPoints] = useState(1250);
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: "c1", title: "Arma tu lineup", description: "Completa un 7 titular en Fantasy", reward: 150, claimed: false },
    { id: "c2", title: "Pick ganador", description: "Acerta el resultado de un partido destacado", reward: 100, claimed: false },
    { id: "c3", title: "Check-in Estadio", description: "Escanea QR en un partido de Liga Estelar", reward: 200, claimed: false },
  ]);
  const [store] = useState<RewardItem[]>([
    { id: "r1", name: "Merch 87 (gorra)", cost: 400, tag: "Featured" },
    { id: "r2", name: "Descuento BMW Weekend", cost: 800, tag: "Premium" },
    { id: "r3", name: "Pases VIP (2)", cost: 1200, tag: "VIP" },
  ]);

  const progress = useMemo(() => Math.min(100, Math.round((points / 2000) * 100)), [points]);

  const handleClaim = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, claimed: true } : c))
    );
    const challenge = challenges.find((c) => c.id === id);
    if (challenge && !challenge.claimed) {
      setPoints((p) => p + challenge.reward);
    }
  };

  const handleRedeem = (item: RewardItem) => {
    if (points < item.cost) return;
    setPoints((p) => p - item.cost);
  };

  const topTeams = teams.filter((t) => t.players.length > 0).slice(0, 3);

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-primary uppercase tracking-widest font-semibold flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>87 Rewards</span>
          </p>
          <h1 className="text-2xl font-black tracking-tight">Gana premios jugando</h1>
          <p className="text-sm text-muted-foreground">Completa retos, juega fantasy y redime tu saldo.</p>
        </div>
        <Link
          href="/fantasy"
          className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-semibold"
        >
          <span>Ir a Fantasy</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-primary/25 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Saldo actual</p>
              <h2 className="text-2xl font-black">{points} pts</h2>
              <p className="text-xs text-muted-foreground">Cada 500 pts = 1 ticket de sorteo 87</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Nivel</p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="font-semibold">Elite 87</span>
            </div>
            <div className="mt-2 w-32 h-2 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Retos activos</p>
              <h2 className="text-lg font-bold">Suma puntos esta semana</h2>
            </div>
            <div className="text-xs text-primary">Se reinician lunes 09:00</div>
          </div>
          <div className="space-y-2">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/60"
              >
                <div>
                  <div className="font-semibold">{challenge.title}</div>
                  <div className="text-xs text-muted-foreground">{challenge.description}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary font-semibold">+{challenge.reward} pts</span>
                  <button
                    onClick={() => handleClaim(challenge.id)}
                    disabled={challenge.claimed}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-sm font-semibold transition-colors",
                      challenge.claimed
                        ? "border-border text-muted-foreground cursor-not-allowed bg-black/20"
                        : "border-primary/50 bg-primary/10 hover:bg-primary/20"
                    )}
                  >
                    {challenge.claimed ? "Reclamado" : "Reclamar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Tienda</p>
              <h2 className="text-lg font-bold">Canjea tus puntos</h2>
            </div>
            <div className="text-xs text-muted-foreground">Entrega coordinada por 87</div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {store.map((item) => {
              const canRedeem = points >= item.cost;
              return (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/60">
                  <div>
                    <div className="font-semibold flex items-center space-x-2">
                      <span>{item.name}</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">{item.tag}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.cost} pts</div>
                  </div>
                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!canRedeem}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-sm font-semibold transition-colors",
                      canRedeem
                        ? "border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary"
                        : "border-border text-muted-foreground cursor-not-allowed bg-black/20"
                    )}
                  >
                    {canRedeem ? "Canjear" : "Faltan puntos"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-secondary rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Destacado 87</p>
              <h2 className="text-lg font-bold">Equipos aliados</h2>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {topTeams.map((team) => (
              <div key={team.id} className="p-3 rounded-lg border border-border bg-background/60 flex items-center justify-between">
                <div>
                  <div className="font-bold">{team.name}</div>
                  <div className="text-xs text-muted-foreground">{team.city ?? "Colombia"}</div>
                </div>
                <div className="text-xs text-primary font-semibold">
                  {team.players.length} jugadores
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary rounded-xl border border-border p-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Escanea QR en estadio o participa en Fantasy para acumular 87 Points y desbloquear premios.
        </div>
        <div className="flex items-center space-x-2 text-primary font-semibold">
          <Gift className="w-4 h-4" />
          <span>Gana con 87</span>
        </div>
      </div>
    </div>
  );
}
