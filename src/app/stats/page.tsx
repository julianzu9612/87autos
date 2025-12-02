"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { TacticalMap } from "@/components/TacticalMap";

const data = [
    { name: "Euforia", goals: 75 },
    { name: "Discountry", goals: 68 },
    { name: "Rocket", goals: 62 },
    { name: "Lanceros", goals: 58 },
    { name: "Makawa", goals: 45 },
];

const assistData = [
    { name: "John Quiroga", assists: 15, team: "Euforia" },
    { name: "Luis Tapias", assists: 12, team: "Euforia" },
    { name: "Milton Álvarez", assists: 11, team: "Discountry" },
    { name: "José Vargas", assists: 10, team: "Discountry" },
];

const paceData = [
    { x: 40, y: 25, toX: 55, toY: 40, type: "lane" as const },
    { x: 30, y: 70, toX: 45, toY: 55, type: "lane" as const },
    { x: 65, y: 30, toX: 80, toY: 45, type: "lane" as const },
    { x: 55, y: 65, toX: 70, toY: 50, type: "lane" as const },
    { x: 50, y: 85, toX: 60, toY: 70, type: "lane" as const },
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
                                { x: 12, y: 10, type: "goal", value: 1 },
                                { x: 18, y: 18, type: "goal", value: 0.8 },
                                { x: 82, y: 12, type: "goal", value: 0.95 },
                                { x: 75, y: 20, type: "goal", value: 0.7 },
                                { x: 22, y: 82, type: "goal", value: 0.85 },
                                { x: 15, y: 88, type: "goal", value: 0.75 },
                                { x: 80, y: 85, type: "goal", value: 0.9 },
                                { x: 70, y: 78, type: "goal", value: 0.65 },
                                { x: 50, y: 50, type: "turnover", value: 0.4 },
                                { x: 60, y: 45, type: "turnover", value: 0.4 },
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

                    {/* Pull Landing Zones */}
                    <div className="bg-secondary rounded-xl p-4 border border-border">
                        <h3 className="text-xs font-bold mb-3 text-center">Pull Landing Zones</h3>
                        <TacticalMap
                            mode="pulls"
                            events={[
                                { x: 20, y: 28, type: "pull" },
                                { x: 40, y: 32, type: "pull" },
                                { x: 60, y: 26, type: "pull" },
                                { x: 78, y: 30, type: "pull" },
                                { x: 50, y: 40, type: "pull" },
                            ]}
                        />
                        <p className="text-[10px] text-muted-foreground text-center mt-2">
                            Majority of pulls pin high and central; edge pulls stretch the offense.
                        </p>
                    </div>

                    {/* Breakside Counter Lanes */}
                    <div className="bg-secondary rounded-xl p-4 border border-border">
                        <h3 className="text-xs font-bold mb-3 text-center">Breakside Counter Lanes</h3>
                        <TacticalMap
                            mode="lanes"
                            events={paceData}
                        />
                        <p className="text-[10px] text-muted-foreground text-center mt-2">
                            Preferred counter lanes hit the break side; weakside crash from the mid.
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
