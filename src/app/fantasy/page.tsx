"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Plus, RefreshCcw, Shirt, Trash2, Trophy, Wallet } from "lucide-react";
import { teams } from "@/lib/teams";
import { cn } from "@/lib/utils";

type FantasyPlayer = {
  id: string;
  name: string;
  number: number;
  position: string;
  teamId: string;
  teamName: string;
  price: number;
};

type LineupSlot = {
  id: string;
  label: string;
  role: "Handler" | "Cutter" | "Hybrid";
  playerId?: string;
};

const BUDGET = 70;
const defaultSlots: LineupSlot[] = [
  { id: "h1", label: "Handler 1", role: "Handler" },
  { id: "h2", label: "Handler 2", role: "Handler" },
  { id: "c1", label: "Cutter 1", role: "Cutter" },
  { id: "c2", label: "Cutter 2", role: "Cutter" },
  { id: "c3", label: "Cutter 3", role: "Cutter" },
  { id: "f1", label: "Flex 1", role: "Hybrid" },
  { id: "f2", label: "Flex 2", role: "Hybrid" },
];

export default function FantasyPage() {
  const pool = useMemo<FantasyPlayer[]>(() => {
    const entries: FantasyPlayer[] = [];
    teams
      .filter((team) => team.players.length > 0)
      .forEach((team) => {
        team.players.forEach((player, idx) => {
          const base = 6 + (player.number % 7);
          const rankBoost = team.rank ? Math.max(0, 4 - team.rank) : 1;
          const price = Math.min(15, base + rankBoost);
          entries.push({
            id: `${team.id}-${player.number}-${idx}`,
            name: player.name,
            number: player.number,
            position: player.position,
            teamId: team.id,
            teamName: team.name,
            price,
          });
        });
      });
    return entries.sort((a, b) => b.price - a.price);
  }, []);

  const [lineup, setLineup] = useState<LineupSlot[]>(defaultSlots);
  const [activeSlot, setActiveSlot] = useState<string | null>(defaultSlots[0].id);
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const poolMap = useMemo(() => {
    const map = new Map<string, FantasyPlayer>();
    pool.forEach((p) => map.set(p.id, p));
    return map;
  }, [pool]);

  const selectedIds = lineup.map((slot) => slot.playerId).filter(Boolean) as string[];
  const totalCost = selectedIds.reduce((acc, id) => acc + (poolMap.get(id)?.price ?? 0), 0);
  const budgetLeft = BUDGET - totalCost;

  const firstEmpty = lineup.find((slot) => !slot.playerId)?.id ?? null;

  const filtered = pool.filter((player) => {
    if (selectedIds.includes(player.id)) return false;
    if (teamFilter !== "all" && player.teamId !== teamFilter) return false;
    if (positionFilter !== "all" && player.position !== positionFilter) return false;
    return true;
  });

  const handleAdd = (playerId: string) => {
    const player = poolMap.get(playerId);
    if (!player) return;
    const targetSlotId = activeSlot ?? firstEmpty;
    if (!targetSlotId) {
      setFeedback("Lineup completo. Quita a alguien para agregar.");
      return;
    }
    const currentSlot = lineup.find((s) => s.id === targetSlotId);
    if (!currentSlot) return;
    if (budgetLeft < player.price) {
      setFeedback("No alcanza el presupuesto para este jugador.");
      return;
    }
    const updated = lineup.map((slot) =>
      slot.id === targetSlotId ? { ...slot, playerId } : slot
    );
    setLineup(updated);
    setActiveSlot(firstEmpty ?? targetSlotId);
    setFeedback(null);
  };

  const handleRemove = (slotId: string) => {
    setLineup((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, playerId: undefined } : slot)));
    setActiveSlot(slotId);
    setFeedback(null);
  };

  const handleReset = () => {
    setLineup(defaultSlots);
    setActiveSlot(defaultSlots[0].id);
    setFeedback(null);
  };

  const renderSlot = (slot: LineupSlot) => {
    const player = slot.playerId ? poolMap.get(slot.playerId) : null;
    const isActive = activeSlot === slot.id;
    return (
      <div
        key={slot.id}
        role="button"
        tabIndex={0}
        onClick={() => setActiveSlot(slot.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setActiveSlot(slot.id);
        }}
        className={cn(
          "w-full rounded-xl border px-3 py-3 text-left transition-colors shadow-sm cursor-pointer",
          player
            ? "bg-black/30 border-primary/40"
            : "bg-black/10 border-border hover:border-primary/30",
          isActive ? "ring-2 ring-primary/40" : ""
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shirt className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-wide text-muted-foreground">{slot.label}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
            {slot.role}
          </span>
        </div>
        {player ? (
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm">{player.name}</div>
              <div className="text-xs text-muted-foreground">{player.teamName} • #{player.number}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-primary font-semibold">{player.price} pts</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(slot.id);
                }}
                className="p-2 rounded-lg bg-black/30 border border-border hover:border-red-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">Toca para asignar desde el pool.</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Fantasy Demo</p>
          <h1 className="text-2xl font-black tracking-tight flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span>Arma tu equipo</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-secondary rounded-xl border border-border px-3 py-2 text-right">
            <div className="text-xs text-muted-foreground">Presupuesto</div>
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-lg font-black">{budgetLeft} / {BUDGET} pts</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-3 rounded-xl border border-border bg-black/20 hover:border-primary/60 transition-colors"
            title="Reset lineup"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-b from-emerald-900/60 via-emerald-950 to-black rounded-2xl border border-primary/10 p-4 space-y-4 relative overflow-hidden">
          <div className="absolute inset-x-4 top-1/2 h-px border-t border-dashed border-white/20" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(212,175,55,0.08),transparent_45%)]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary uppercase tracking-widest font-semibold">Cancha</p>
              <h2 className="text-lg font-bold">Alinea tus 7 titulares</h2>
            </div>
            {feedback && <span className="text-xs text-red-400">{feedback}</span>}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">{lineup.slice(0, 2).map(renderSlot)}</div>
            <div className="grid grid-cols-3 gap-3">{lineup.slice(2, 5).map(renderSlot)}</div>
            <div className="grid grid-cols-2 gap-3">{lineup.slice(5, 7).map(renderSlot)}</div>
          </div>
        </div>

        <div className="bg-secondary rounded-xl border border-border p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col">
              <label className="text-xs text-muted-foreground">Filtrar por equipo</label>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">Todos</option>
                {teams.filter((t) => t.players.length > 0).map((team) => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-muted-foreground">Posición</label>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">Todas</option>
                <option value="Handler">Handler</option>
                <option value="Cutter">Cutter</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="flex-1 text-right text-xs text-muted-foreground">
              Toca un slot en cancha y luego agrega desde el pool. Demo sin auth ni guardado.
            </div>
          </div>

          <div className="space-y-2">
            {filtered.slice(0, 40).map((player) => {
              const disabled = (!activeSlot && !firstEmpty) || budgetLeft < player.price;
              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border hover:border-primary/60 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-primary font-bold w-8 text-center">{player.number}</span>
                    <div>
                      <div className="font-bold">{player.name}</div>
                      <div className="text-xs text-muted-foreground">{player.teamName} • {player.position}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-primary font-semibold">{player.price} pts</span>
                    <button
                      onClick={() => handleAdd(player.id)}
                      disabled={disabled}
                      className={cn(
                        "p-2 rounded-lg border transition-colors",
                        disabled
                          ? "border-border text-muted-foreground cursor-not-allowed"
                          : "border-primary/50 bg-primary/10 hover:bg-primary/20"
                      )}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-4">
                No hay jugadores disponibles con el filtro actual.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-secondary rounded-xl border border-border p-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Fantasy demo estilo cancha: selecciona slots y arma tu 7 ideal con presupuesto limitado.
        </div>
        <div className="flex items-center space-x-2 text-primary font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Listo para jugar</span>
        </div>
      </div>
    </div>
  );
}
