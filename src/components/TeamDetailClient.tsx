"use client";

import { ChevronLeft, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTeamById, Team } from "@/lib/teams";

export function TeamDetailClient() {
    const params = useParams();
    const id = params.id as string;
    const teamData = getTeamById(id);

    const hasRoster = teamData && teamData.players.length > 0;
    const displayedTeam: Team = teamData ?? {
        id,
        name: id ? id.charAt(0).toUpperCase() + id.slice(1) : "Team",
        players: [],
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                <Link href="/teams" className="p-2 -ml-2 text-muted-foreground hover:text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-lg tracking-tight">Team Profile</h1>
                <div className="w-10" /> {/* Spacer */}
            </header>

            <div className="p-4 space-y-6">
                {/* Team Header */}
                <div className="text-center space-y-2 py-6">
                    <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/50 mb-4">
                        <span className="text-4xl">🛡️</span>
                    </div>
                    <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
                        {displayedTeam.name}
                    </h2>
                    <div className="flex justify-center space-x-4 text-sm font-bold">
                        <span className="text-primary">{teamData?.wins ?? "—"} Wins</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-red-500">{teamData?.losses ?? "—"} Losses</span>
                    </div>
                </div>

                {teamData && (
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-secondary/30 p-3 rounded-lg border border-white/5 text-center">
                            <div className="text-xl font-black text-white">#{teamData.rank ?? "—"}</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-bold">Rank</div>
                        </div>
                        <div className="bg-secondary/30 p-3 rounded-lg border border-white/5 text-center">
                            <div className="text-xl font-black text-primary">
                                {teamData.wins && teamData.losses ? `+${teamData.wins * 3 - teamData.losses * 2}` : "—"}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase font-bold">Diff</div>
                        </div>
                        <div className="bg-secondary/30 p-3 rounded-lg border border-white/5 text-center">
                            <div className="text-xl font-black text-white">12.5</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-bold">PPG</div>
                        </div>
                    </div>
                )}

                {/* Roster */}
                <section>
                    <h3 className="text-lg font-black italic text-white mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-primary" />
                        ROSTER
                    </h3>
                    {hasRoster ? (
                        <div className="space-y-2">
                            {displayedTeam.players.map((player, i) => (
                                <div key={`${player.number}-${player.name}-${i}`} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-mono text-primary font-bold w-8 text-center">{player.number}</span>
                                        <span className="font-bold text-white">{player.name}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground uppercase font-medium bg-black/30 px-2 py-1 rounded">
                                        {player.position}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-secondary/20 rounded-lg border border-white/5 text-center text-muted-foreground">
                            Roster coming soon for this team.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
