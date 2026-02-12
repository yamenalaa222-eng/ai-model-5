"use client";

import { useState } from "react";
import SettingsModal from "@/components/SettingsModal";
import FileUpload from "@/components/FileUpload";
import ModeSelector from "@/components/ModeSelector";
import dynamic from "next/dynamic";

const TranslationMode = dynamic(() => import("@/components/TranslationMode"), { ssr: false });
const ChatMode = dynamic(() => import("@/components/ChatMode"), { ssr: false });

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [mode, setMode] = useState<"translate" | "chat">("translate");

    return (
        <main className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="w-full max-w-4xl">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Gemini PDF Workspace
                    </h1>
                    <SettingsModal />
                </header>

                <div className="space-y-8">
                    <FileUpload onFileSelect={setFile} currentFile={file} />

                    {file && (
                        <>
                            <ModeSelector currentMode={mode} onModeChange={setMode} />
                            {mode === "translate" ? (
                                <TranslationMode file={file} />
                            ) : (
                                <ChatMode file={file} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
