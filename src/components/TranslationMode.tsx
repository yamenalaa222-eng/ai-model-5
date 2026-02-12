"use client";

import { useState } from "react";
import { getGeminiResponse } from "@/lib/gemini";
import { extractPageAsImage } from "@/lib/pdf-processor";
import { Languages, Loader2 } from "lucide-react";

export default function TranslationMode({ file }: { file: File }) {
    const [pageNum, setPageNum] = useState(1);
    const [translation, setTranslation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        setLoading(true);
        try {
            const imageData = await extractPageAsImage(file, pageNum);
            const prompt = "Please translate the text in this image to Arabic. Return only the translated text.";
            const result = await getGeminiResponse(prompt, imageData);
            setTranslation(result);
        } catch (error) {
            console.error(error);
            setTranslation("حدث خطأ أثناء الترجمة. يرجى التأكد من مفتاح API وعدد الصفحات.");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-2">رقم الصفحة</label>
                    <input
                        type="number"
                        min="1"
                        value={pageNum}
                        onChange={(e) => setPageNum(parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleTranslate}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 h-[52px] px-8 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Languages />}
                    ترجمة
                </button>
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 min-h-[300px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 text-xs text-gray-600 font-mono">READONLY</div>
                {translation ? (
                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-200">
                        {translation}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
                        <Languages className="w-12 h-12 opacity-20" />
                        <p>سيظهر النص المترجم هنا...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
