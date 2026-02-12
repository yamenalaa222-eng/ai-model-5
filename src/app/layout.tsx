import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gemini PDF Space",
    description: "Advanced PDF analysis with Gemini AI",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body>{children}</body>
        </html>
    );
}
