"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { TacticalMap } from "@/components/TacticalMap";

const data = [
    { name: "Velocity", goals: 75 },
    { name: "Turbine", goals: 68 },
    { name: "Boxer", goals: 62 },
    { name: "V8", goals: 58 },
    { name: "Aero", goals: 45 },
];

const assistData = [
    { name: "J. Doe", assists: 15, team: "Velocity" },
    { name: "A. Smith", assists: 12, team: "Turbine" },
    { name: "M. Johnson", assists: 10, team: "Boxer" },
];

export default function StatsPage() {
    return (
        <div className="p-4 space-y-8">
            <h1 className="text-2xl font-bold">Tournament Stats</h1>

            {/* Goals by Team */}
            <section>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Top Scoring Teams</h2>
                <div className="h-64 w-full bg-secondary rounded-xl p-4 border border-border">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#A3A3A3', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333333', color: '#FAFAFA' }}
                            />
                            <Bar dataKey="goals" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Tactical Analysis */}
            <section>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Tactical Analysis</h2>

                <div className="grid grid-cols-2 gap-4">
                    {/* Heatmap */}
                    <div className="bg-secondary rounded-xl p-4 border border-border">
                        <h3 className="text-xs font-bold mb-3 text-center">Scoring Heatmap</h3>
                        <TacticalMap
                            mode="heatmap"
                            events={[
                                { x: 50, y: 15, type: "goal" }, { x: 45, y: 12, type: "goal" }, { x: 55, y: 18, type: "goal" },
                                { x: 20, y: 85, type: "goal" }, { x: 25, y: 82, type: "goal" },
                                { x: 80, y: 10, type: "goal" },
                                { x: 50, y: 50, type: "turnover" }, { x: 60, y: 45, type: "turnover" }
                            ]}
                        />
                        <p className="text-[10px] text-muted-foreground text-center mt-2">
                            High density of goals in the deep endzone corners.
                        </p>
                    </div>

                    {/* Assist Network */}
                    <div className="bg-secondary rounded-xl p-4 border border-border">
                        <h3 className="text-xs font-bold mb-3 text-center">Assist Network</h3>
                        <TacticalMap
                            mode="assists"
                            events={[
                                { id: "a1", x: 30, y: 40, type: "assist_start", relatedEventId: "g1" },
                                { id: "g1", x: 20, y: 10, type: "assist_end" },
                                { id: "a2", x: 70, y: 60, type: "assist_start", relatedEventId: "g2" },
                                { id: "g2", x: 80, y: 90, type: "assist_end" },
                                { id: "a3", x: 50, y: 50, type: "assist_start", relatedEventId: "g3" },
                                { id: "g3", x: 50, y: 15, type: "assist_end" },
                            ]}
                        />
                        <p className="text-[10px] text-muted-foreground text-center mt-2">
                            Key assists coming from midfield handlers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Top Assists */}
            <section>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Assist Leaders</h2>
                <div className="space-y-3">
                    {assistData.map((player, index) => (
                        <div key={player.name} className="flex items-center justify-between bg-secondary p-3 rounded-lg border border-border">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground text-xs">
                                    {index + 1}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{player.name}</div>
                                    <div className="text-xs text-muted-foreground">{player.team}</div>
                                </div>
                            </div>
                            <div className="font-black text-primary">{player.assists}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
