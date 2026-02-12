"use client";

import { LayoutGrid, MessageSquare } from "lucide-react";

export default function ModeSelector({ currentMode, onModeChange }: {
    currentMode: "translate" | "chat",
    onModeChange: (mode: "translate" | "chat") => void
}) {
    return (
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
                onClick={() => onModeChange("translate")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-all ${currentMode === "translate"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
            >
                <LayoutGrid className="w-5 h-5" />
                <span>ترجمة صفحة</span>
            </button>
            <button
                onClick={() => onModeChange("chat")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-all ${currentMode === "chat"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
            >
                <MessageSquare className="w-5 h-5" />
                <span>دردشة AI</span>
            </button>
        </div>
    );
}
