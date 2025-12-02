"use client";

import { cn } from "@/lib/utils";

interface Event {
    x: number;
    y: number;
    type: "goal" | "turnover" | "block" | "assist_start" | "assist_end" | "lane" | "pull";
    value?: number; // For heatmap intensity
    relatedEventId?: string; // To link assist start to end
    id?: string;
    toX?: number;
    toY?: number;
}

interface TacticalMapProps {
    events: Event[];
    className?: string;
    mode?: "standard" | "heatmap" | "assists" | "lanes" | "pulls";
}

export function TacticalMap({ events, className, mode = "standard" }: TacticalMapProps) {
    return (
        <div className={cn("relative aspect-[37/100] bg-green-900/20 border-2 border-white/10 rounded-lg overflow-hidden", className)}>
            {/* Field Markings */}
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-4 pointer-events-none z-0">
                {/* Endzone Top */}
                <div className="h-[18%] w-full border-b-2 border-white/20 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-black text-4xl rotate-90">EZ</span>
                </div>

                {/* Midfield */}
                <div className="flex-1 w-full relative">
                    <div className="absolute top-1/2 left-0 right-0 border-t border-white/10 border-dashed"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full"></div>
                </div>

                {/* Endzone Bottom */}
                <div className="h-[18%] w-full border-t-2 border-white/20 relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-black text-4xl rotate-90">EZ</span>
                </div>
            </div>

            {/* Heatmap Layer */}
            {mode === "heatmap" && (
                <div className="absolute inset-0 z-10">
                    {events.map((event, i) => {
                        const intensity = event.value ?? 0.6; // 0..1 controls size/opacity
                        const size = 18 + intensity * 20; // percent of container width/height
                        const blur = 12 + intensity * 10;
                        const baseColor = event.type === "goal" ? "212,175,55" : "255,80,80";
                        const alpha = 0.35 + intensity * 0.35;

                        return (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    left: `${event.x}%`,
                                    top: `${event.y}%`,
                                    width: `${size}%`,
                                    height: `${size}%`,
                                    transform: "translate(-50%, -50%)",
                                    background: `radial-gradient(circle, rgba(${baseColor}, ${alpha}) 0%, rgba(${baseColor}, 0) 65%)`,
                                    filter: `blur(${blur}px)`,
                                    mixBlendMode: "screen",
                                    opacity: 0.9,
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* Assist Vectors Layer */}
            {mode === "assists" && (
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#D4AF37" />
                        </marker>
                    </defs>
                    {events.filter(e => e.type === "assist_start").map((startEvent) => {
                        const endEvent = events.find(e => e.id === startEvent.relatedEventId);
                        if (!endEvent) return null;
                        return (
                            <line
                                key={startEvent.id}
                                x1={`${startEvent.x}%`}
                                y1={`${startEvent.y}%`}
                                x2={`${endEvent.x}%`}
                                y2={`${endEvent.y}%`}
                                stroke="#D4AF37"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                                opacity="0.8"
                            />
                        );
                    })}
                </svg>
            )}

            {/* Lane vectors (diagonal runs or counter attacks) */}
            {mode === "lanes" && (
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <defs>
                        <marker id="arrowhead-lane" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#7DD3FC" />
                        </marker>
                    </defs>
                    {events
                        .filter((e) => e.toX !== undefined && e.toY !== undefined)
                        .map((lane, i) => (
                            <g key={i} className="opacity-80">
                                <line
                                    x1={`${lane.x}%`}
                                    y1={`${lane.y}%`}
                                    x2={`${lane.toX}%`}
                                    y2={`${lane.toY}%`}
                                    stroke="#7DD3FC"
                                    strokeWidth="2"
                                    strokeDasharray="6 3"
                                    markerEnd="url(#arrowhead-lane)"
                                />
                                <circle cx={`${lane.x}%`} cy={`${lane.y}%`} r="3" fill="#1E90FF" />
                                <circle cx={`${lane.toX}%`} cy={`${lane.toY}%`} r="3" fill="#7DD3FC" />
                            </g>
                        ))}
                </svg>
            )}

            {/* Pull trajectories (arrows from top to landing zones) */}
            {mode === "pulls" && (
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                    <defs>
                        <marker id="arrowhead-pull" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#CCFF00" />
                        </marker>
                    </defs>
                    {events.map((pull, i) => (
                        <g key={i} className="opacity-80">
                            <line
                                x1={`${pull.x}%`}
                                y1="4%"
                                x2={`${pull.x}%`}
                                y2={`${pull.y}%`}
                                stroke="#CCFF00"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead-pull)"
                            />
                            <circle cx={`${pull.x}%`} cy={`${pull.y}%`} r="4" fill="#CCFF00" />
                        </g>
                    ))}
                </svg>
            )}

            {/* Standard Events Layer */}
            {mode === "standard" && events.map((event, i) => (
                <div
                    key={i}
                    className={cn(
                        "absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-black/50 z-20",
                        event.type === "goal" ? "bg-primary" :
                            event.type === "turnover" ? "bg-red-500" :
                                event.type === "block" ? "bg-blue-500" : "hidden"
                    )}
                    style={{ left: `${event.x}%`, top: `${event.y}%` }}
                />
            ))}

            {/* Render dots for start/end in assist mode too, but smaller */}
            {mode === "assists" && events.map((event, i) => (
                <div
                    key={i}
                    className={cn(
                        "absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20",
                        event.type === "assist_end" ? "bg-primary" : "bg-white/50"
                    )}
                    style={{ left: `${event.x}%`, top: `${event.y}%` }}
                />
            ))}
        </div>
    );
}
