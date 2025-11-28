import { MatchDetailClient } from "@/components/MatchDetailClient";

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ];
}

export default function MatchDetailPage() {
    return <MatchDetailClient />;
}
