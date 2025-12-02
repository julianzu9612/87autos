"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Activity, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home", icon: Home },
        { href: "/fixtures", label: "Fixtures", icon: Calendar },
        { href: "/fantasy", label: "Fantasy", icon: Trophy },
        { href: "/stats", label: "Stats", icon: Activity },
        { href: "/teams", label: "Teams", icon: Users },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/90 backdrop-blur-lg border-t border-border pb-safe">
            <div className="flex justify-around items-center h-16">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
