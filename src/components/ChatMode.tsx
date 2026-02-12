"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User } from "lucide-react";
import { getGeminiResponse } from "@/lib/gemini";
import { extractAllText } from "@/lib/pdf-processor";

export default function ChatMode({ file }: { file: File }) {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pdfText, setPdfText] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadText = async () => {
            const text = await extractAllText(file);
            setPdfText(text);
        };
        loadText();
    }, [file]);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const prompt = `Context from PDF: ${pdfText}\n\nUser Question: ${userMsg}\n\nPlease answer the question based on the provided PDF context.`;
            const response = await getGeminiResponse(prompt);
            setMessages(prev => [...prev, { role: 'bot', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: "عذراً، حدث خطأ في معالجة طلبك." }]);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-[600px] bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                        <div className="p-4 bg-blue-500/10 rounded-3xl">
                            <Bot className="w-12 h-12 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-gray-300">مساعدك الذكي جاهز</p>
                            <p>اسأل أي شيء حول محتوى الملف المرفوع</p>
                        </div>
                    </div>
                )}

                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'} items-start gap-3`}>
                        {m.role === 'user' && <div className="p-2 bg-blue-600 rounded-lg shrink-0"><User className="w-4 h-4" /></div>}
                        <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user'
                                ? 'bg-blue-600/10 border border-blue-500/20'
                                : 'bg-white/5 border border-white/10'
                            }`}>
                            <p className="leading-relaxed">{m.content}</p>
                        </div>
                        {m.role === 'bot' && <div className="p-2 bg-purple-600 rounded-lg shrink-0"><Bot className="w-4 h-4" /></div>}
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-end gap-3">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl italic text-gray-400 flex items-center gap-2">
                            Gemini يفكر... <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-black/20 border-t border-white/5">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="اكتب سؤالك هنا..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-3 rounded-xl transition-all shadow-lg"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
