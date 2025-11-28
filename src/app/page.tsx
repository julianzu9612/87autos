import { MatchCard } from "@/components/MatchCard";
import { PromoCard } from "@/components/PromoCard";
import { ChevronRight, Trophy, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-black tracking-tighter italic text-primary">
            87 <span className="text-foreground not-italic">ULTIMATE</span>
          </h1>
          <p className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Experience League
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>
      </header>

      {/* Promo / Gamification */}
      <PromoCard />

      {/* Featured Match */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Featured Match</h2>
          <Link href="/fixtures" className="text-xs text-primary flex items-center">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        <MatchCard
          homeTeam="Velocity"
          awayTeam="Turbine"
          date="Today"
          time="19:00"
          location="Estadio 87 Arena"
          status="upcoming"
          className="border-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
        />
      </section>

      {/* Recent Results */}
      <section>
        <h2 className="text-lg font-bold mb-3">Recent Results</h2>
        <div className="space-y-3">
          <MatchCard
            homeTeam="Boxer"
            awayTeam="V8"
            homeScore={15}
            awayScore={13}
            date="Yesterday"
            time="20:00"
            location="Campo Norte"
            status="finished"
          />
          <MatchCard
            homeTeam="Aero"
            awayTeam="Drift"
            homeScore={12}
            awayScore={14}
            date="Yesterday"
            time="18:00"
            location="Campo Sur"
            status="finished"
          />
        </div>
      </section>

      {/* Standings Snippet */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Standings</h2>
          <Link href="/stats" className="text-xs text-primary flex items-center">
            Full Table <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        <div className="bg-secondary rounded-xl p-4 border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs border-b border-border">
                <th className="pb-2 text-left font-medium">#</th>
                <th className="pb-2 text-left font-medium">Team</th>
                <th className="pb-2 text-center font-medium">P</th>
                <th className="pb-2 text-center font-medium">W</th>
                <th className="pb-2 text-right font-medium">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                { rank: 1, name: "Velocity", played: 5, won: 5, pts: 15 },
                { rank: 2, name: "Turbine", played: 5, won: 4, pts: 12 },
                { rank: 3, name: "Boxer", played: 5, won: 3, pts: 9 },
              ].map((team) => (
                <tr key={team.name} className="group">
                  <td className="py-3 font-bold text-muted-foreground group-first:text-primary">
                    {team.rank}
                  </td>
                  <td className="py-3 font-medium flex items-center">
                    {team.rank === 1 && <Trophy className="w-3 h-3 text-primary mr-2" />}
                    {team.name}
                  </td>
                  <td className="py-3 text-center text-muted-foreground">{team.played}</td>
                  <td className="py-3 text-center text-muted-foreground">{team.won}</td>
                  <td className="py-3 text-right font-bold">{team.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
