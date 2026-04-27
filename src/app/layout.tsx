import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KampungConnect | 甘榜连线 | Kampung Connect",
  description: "Connecting Singapore's seniors to community events near them. Find CC and RC activities in your neighbourhood.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50/50 min-h-screen antialiased">{children}</body>
    </html>
  );
}
