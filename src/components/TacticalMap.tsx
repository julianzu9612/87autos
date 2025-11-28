"use client";

import { cn } from "@/lib/utils";

interface Event {
    x: number;
    y: number;
    type: "goal" | "turnover" | "block" | "assist_start" | "assist_end";
    value?: number; // For heatmap intensity
    relatedEventId?: string; // To link assist start to end
    id?: string;
}

interface TacticalMapProps {
    events: Event[];
    className?: string;
    mode?: "standard" | "heatmap" | "assists";
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
                    {events.map((event, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full blur-xl opacity-60"
                            style={{
                                left: `${event.x}%`,
                                top: `${event.y}%`,
                                width: '15%',
                                height: '5%',
                                transform: 'translate(-50%, -50%)',
                                background: `radial-gradient(circle, ${event.type === 'goal' ? 'rgba(212,175,55,0.8)' : 'rgba(255,50,50,0.6)'} 0%, transparent 70%)`
                            }}
                        />
                    ))}
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
