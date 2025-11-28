"use client";

import { useState } from "react";
import { X, Trophy, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function PromoCard() {
    const [isVisible, setIsVisible] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!isVisible) return null;

    return (
        <div className={cn(
            "relative overflow-hidden rounded-xl border border-primary/20 transition-all duration-300 ease-in-out",
            isCollapsed ? "h-12 bg-secondary" : "h-48 bg-black"
        )}>
            {/* Background Image */}
            {!isCollapsed && (
                <>
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/bmw-promo.jpg"
                            alt="BMW 87 Autos"
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    </div>
                </>
            )}

            {/* Content */}
            <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                {isCollapsed ? (
                    <div className="flex items-center justify-between w-full" onClick={() => setIsCollapsed(false)}>
                        <div className="flex items-center space-x-2 text-primary">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-bold">Win a Weekend with BMW M4</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-start mb-2">
                            <div className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center w-fit">
                                <Trophy className="w-3 h-3 mr-1" /> 87 Rewards
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsCollapsed(true); }}
                                    className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">Collapse</span>
                                    <div className="w-4 h-0.5 bg-current my-1.5"></div>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                                    className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-black text-white leading-tight mb-1">
                            Drive the Legend.
                        </h3>
                        <p className="text-xs text-gray-300 mb-3 max-w-[70%]">
                            Top the fantasy league this month and win a weekend experience with the BMW M4 Competition.
                        </p>

                        <button className="bg-primary text-black text-xs font-bold px-4 py-2 rounded-lg w-fit hover:bg-primary/90 transition-colors">
                            Join Fantasy League
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
