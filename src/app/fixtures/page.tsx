import { MatchCard } from "@/components/MatchCard";

export default function FixturesPage() {
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Fixtures</h1>

            <div className="space-y-4">
                <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Today</h2>
                    <MatchCard
                        homeTeam="Euforia"
                        awayTeam="Discountry"
                        date="Today"
                        time="19:00"
                        location="Estadio 87 Arena"
                        status="upcoming"
                        className="mb-3"
                    />
                </div>

                <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Tomorrow</h2>
                    <MatchCard
                        homeTeam="Rocket"
                        awayTeam="Lanceros"
                        date="Nov 29"
                        time="18:00"
                        location="Campo Norte"
                        status="upcoming"
                        className="mb-3"
                    />
                    <MatchCard
                        homeTeam="Makawa"
                        awayTeam="D-Crash"
                        date="Nov 29"
                        time="20:00"
                        location="Campo Sur"
                        status="upcoming"
                        className="mb-3"
                    />
                </div>

                <div>
                    <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Dec 1</h2>
                    <MatchCard
                        homeTeam="Rocket"
                        awayTeam="Discountry"
                        date="Dec 1"
                        time="10:00"
                        location="Estadio 87 Arena"
                        status="upcoming"
                        className="mb-3"
                    />
                </div>
            </div>
        </div>
    );
}
