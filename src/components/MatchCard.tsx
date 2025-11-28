import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchCardProps {
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    date: string;
    time: string;
    location: string;
    status: "upcoming" | "live" | "finished";
    className?: string;
}

export function MatchCard({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    date,
    time,
    location,
    status,
    className,
}: MatchCardProps) {
    return (
        <div className={cn("bg-secondary rounded-xl p-4 border border-border", className)}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{date} • {time}</span>
                </div>
                {status === "live" && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold animate-pulse">
                        LIVE
                    </span>
                )}
                {status === "finished" && (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
                        FT
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center w-1/3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2 text-lg font-bold text-muted-foreground">
                        {homeTeam.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-center leading-tight">{homeTeam}</span>
                </div>

                <div className="flex flex-col items-center w-1/3">
                    <div className="text-2xl font-black tracking-tighter">
                        {status === "upcoming" ? (
                            <span className="text-muted-foreground">VS</span>
                        ) : (
                            <div className="flex space-x-2">
                                <span className={homeScore! > awayScore! ? "text-primary" : "text-foreground"}>{homeScore}</span>
                                <span className="text-muted-foreground">-</span>
                                <span className={awayScore! > homeScore! ? "text-primary" : "text-foreground"}>{awayScore}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center w-1/3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2 text-lg font-bold text-muted-foreground">
                        {awayTeam.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-center leading-tight">{awayTeam}</span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-center text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                {location}
            </div>
        </div>
    );
}
