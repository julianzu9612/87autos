import { TeamDetailClient } from "@/components/TeamDetailClient";

export async function generateStaticParams() {
    return [
        { id: "velocity" },
        { id: "turbine" },
        { id: "boxer" },
        { id: "v8" },
        { id: "aero" },
        { id: "drift" },
        { id: "nitrogen" },
        { id: "carbon" },
    ];
}

export default function TeamDetailPage() {
    return <TeamDetailClient />;
}
