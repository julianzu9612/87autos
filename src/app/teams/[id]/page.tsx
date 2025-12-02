import { TeamDetailClient } from "@/components/TeamDetailClient";
import { teams } from "@/lib/teams";

export async function generateStaticParams() {
    return teams.map((team) => ({ id: team.id }));
}

export default function TeamDetailPage() {
    return <TeamDetailClient />;
}
