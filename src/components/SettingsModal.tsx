"use client";

import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";

export default function SettingsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [geminiKey, setGeminiKey] = useState("");
    const [supabaseUrl, setSupabaseUrl] = useState("");
    const [supabaseKey, setSupabaseKey] = useState("");

    useEffect(() => {
        setGeminiKey(localStorage.getItem("gemini_api_key") || "");
        setSupabaseUrl(localStorage.getItem("supabase_url") || "");
        setSupabaseKey(localStorage.getItem("supabase_anon_key") || "");
    }, []);

    const saveSettings = () => {
        localStorage.setItem("gemini_api_key", geminiKey);
        localStorage.setItem("supabase_url", supabaseUrl);
        localStorage.setItem("supabase_anon_key", supabaseKey);
        setIsOpen(false);
        window.location.reload();
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
                <Settings className="w-6 h-6" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-900 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">الإعدادات</h2>
                            <button onClick={() => setIsOpen(false)}><X /></button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Gemini API Key</label>
                                <input
                                    type="password"
                                    value={geminiKey}
                                    onChange={(e) => setGeminiKey(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Supabase URL</label>
                                <input
                                    type="text"
                                    value={supabaseUrl}
                                    onChange={(e) => setSupabaseUrl(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Supabase Anon Key</label>
                                <input
                                    type="password"
                                    value={supabaseKey}
                                    onChange={(e) => setSupabaseKey(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <button
                                onClick={saveSettings}
                                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all mt-4"
                            >
                                حفظ الإعدادات
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
