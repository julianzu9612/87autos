import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { teams } from "@/lib/teams";

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
                                <p className="text-xs text-muted-foreground">
                                    {team.players.length > 0 ? `${team.players.length} Players` : "Roster coming soon"}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
