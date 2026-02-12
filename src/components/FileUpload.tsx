"use client";

import { Upload, FileText } from "lucide-react";

export default function FileUpload({ onFileSelect, currentFile }: {
    onFileSelect: (file: File | null) => void,
    currentFile: File | null
}) {
    return (
        <div className="w-full">
            {!currentFile ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-gray-400 group-hover:text-blue-400 mb-4 transition-colors" />
                        <p className="mb-2 text-lg font-medium text-gray-300">اضغط لرفع ملف PDF أو اسحبه هنا</p>
                        <p className="text-sm text-gray-500">PDF فقط (حتى 10 ميجابايت)</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
                    />
                </label>
            ) : (
                <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                            <FileText className="text-blue-400" />
                        </div>
                        <div>
                            <p className="font-medium">{currentFile.name}</p>
                            <p className="text-xs text-gray-500">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onFileSelect(null)}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                        إلغاء الملف
                    </button>
                </div>
            )}
        </div>
    );
}
