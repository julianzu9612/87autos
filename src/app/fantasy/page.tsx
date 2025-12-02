"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Plus, Trash2, Trophy, Wallet } from "lucide-react";
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

const BUDGET = 70;
const MAX_SLOTS = 7;

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

  const [selected, setSelected] = useState<string[]>([]);
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const poolMap = useMemo(() => {
    const map = new Map<string, FantasyPlayer>();
    pool.forEach((p) => map.set(p.id, p));
    return map;
  }, [pool]);

  const totalCost = selected.reduce((acc, id) => acc + (poolMap.get(id)?.price ?? 0), 0);
  const budgetLeft = BUDGET - totalCost;

  const filtered = pool.filter((player) => {
    if (selected.includes(player.id)) return false;
    if (teamFilter !== "all" && player.teamId !== teamFilter) return false;
    if (positionFilter !== "all" && player.position !== positionFilter) return false;
    return true;
  });

  const addPlayer = (id: string) => {
    const player = poolMap.get(id);
    if (!player) return;
    if (selected.length >= MAX_SLOTS) {
      setFeedback("Máximo 7 titulares en tu lineup.");
      return;
    }
    if (budgetLeft < player.price) {
      setFeedback("No alcanza el presupuesto para este jugador.");
      return;
    }
    setSelected((prev) => [...prev, id]);
    setFeedback(null);
  };

  const removePlayer = (id: string) => {
    setSelected((prev) => prev.filter((p) => p !== id));
    setFeedback(null);
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
        <div className="bg-secondary rounded-xl border border-border px-3 py-2 text-right">
          <div className="text-xs text-muted-foreground">Presupuesto</div>
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-lg font-black">{budgetLeft} / {BUDGET} pts</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-secondary rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Titulares</p>
              <h2 className="text-lg font-bold">{selected.length} / {MAX_SLOTS} seleccionados</h2>
            </div>
            {feedback && <span className="text-xs text-red-400">{feedback}</span>}
          </div>

          {selected.length === 0 ? (
            <div className="p-4 rounded-lg border border-dashed border-border text-muted-foreground text-sm text-center">
              Añade jugadores desde el listado para iniciar tu lineup.
            </div>
          ) : (
            <div className="space-y-2">
              {selected.map((id) => {
                const p = poolMap.get(id);
                if (!p) return null;
                return (
                  <div key={id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-primary font-bold w-8 text-center">{p.number}</span>
                      <div>
                        <div className="font-bold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.teamName} • {p.position}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-primary font-semibold">{p.price} pts</span>
                      <button
                        onClick={() => removePlayer(id)}
                        className="p-2 rounded-lg bg-black/30 border border-border hover:border-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              Selecciona hasta {MAX_SLOTS} jugadores con presupuesto limitado. Demo sin auth ni guardado.
            </div>
          </div>

          <div className="space-y-2">
            {filtered.slice(0, 40).map((player) => {
              const disabled = selected.length >= MAX_SLOTS || budgetLeft < player.price;
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
                      onClick={() => addPlayer(player.id)}
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
          Demo fantasy: selección local sin guardar. Puedes compartir capturas o copiar tu lineup.
        </div>
        <div className="flex items-center space-x-2 text-primary font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Listo para jugar</span>
        </div>
      </div>
    </div>
  );
}
