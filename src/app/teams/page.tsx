import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";

const teams = [
    { id: "velocity", name: "Velocity", players: 14, wins: 5 },
    { id: "turbine", name: "Turbine", players: 15, wins: 4 },
    { id: "boxer", name: "Boxer", players: 13, wins: 3 },
    { id: "v8", name: "V8", players: 16, wins: 3 },
    { id: "aero", name: "Aero", players: 14, wins: 2 },
    { id: "drift", name: "Drift", players: 15, wins: 2 },
    { id: "nitrogen", name: "Nitrogen", players: 14, wins: 1 },
    { id: "carbon", name: "Carbon", players: 13, wins: 0 },
];

export default function TeamsPage() {
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Teams</h1>

            <div className="grid grid-cols-1 gap-3">
                {teams.map((team) => (
                    <Link
                        key={team.id}
                        href={`/teams/${team.id}`}
                        className="bg-secondary p-4 rounded-xl border border-border flex items-center justify-between hover:border-primary transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                                {team.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-bold">{team.name}</h3>
                                <p className="text-xs text-muted-foreground">{team.players} Players</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
