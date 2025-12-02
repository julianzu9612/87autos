"use client";

import { MatchCard } from "@/components/MatchCard";
import { TacticalMap } from "@/components/TacticalMap";
import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";

export function MatchDetailClient() {
    // Mock data based on ID
    const matchData = {
        id: "1",
        homeTeam: "Euforia",
        awayTeam: "Discountry",
        homeScore: 15,
        awayScore: 12,
        status: "live" as "live" | "upcoming" | "finished",
        time: "58'",
        venue: "Liga Estelar Arena",
        location: "Liga Estelar Arena",
        date: "Today"
    };

    const events = [
        { x: 15, y: 50, type: "goal" as const },
        { x: 85, y: 50, type: "goal" as const },
        { x: 45, y: 30, type: "turnover" as const },
        { x: 60, y: 70, type: "block" as const },
        { x: 10, y: 40, type: "goal" as const, value: 0.9 },
        { x: 90, y: 60, type: "goal" as const, value: 0.8 },
        { x: 20, y: 20, type: "assist_start" as const, relatedEventId: "g1", id: "a1" },
        { x: 15, y: 50, type: "assist_end" as const, id: "g1" },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                <Link href="/fixtures" className="p-2 -ml-2 text-muted-foreground hover:text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="font-bold text-lg tracking-tight">Match Detail</h1>
                <button className="p-2 -mr-2 text-muted-foreground hover:text-white transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
            </header>

            <div className="p-4 space-y-6">
                {/* Score Card */}
                <MatchCard {...matchData} />

                {/* Tactical Dashboard */}
                <section className="space-y-4">
                    <h2 className="text-xl font-black italic tracking-tighter text-primary">
                        TACTICAL <span className="text-white">DASHBOARD</span>
                    </h2>

                    <div className="space-y-6">
                        {/* Heatmap */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Scoring Heatmap</h3>
                            <TacticalMap events={events} mode="heatmap" />
                        </div>

                        {/* Assist Network */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Assist Network</h3>
                            <TacticalMap events={events} mode="assists" />
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-2xl font-black text-white">58%</div>
                        <div className="text-xs text-muted-foreground uppercase font-bold">Possession</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-2xl font-black text-primary">92%</div>
                        <div className="text-xs text-muted-foreground uppercase font-bold">Pass Completion</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-2xl font-black text-white">12</div>
                        <div className="text-xs text-muted-foreground uppercase font-bold">Turnovers</div>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-2xl font-black text-primary">8</div>
                        <div className="text-xs text-muted-foreground uppercase font-bold">Blocks</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
