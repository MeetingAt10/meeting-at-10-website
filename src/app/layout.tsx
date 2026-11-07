import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Martian_Mono } from "next/font/google";
import "./globals.css";

const display = Funnel_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Funnel_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-mono", axes: ["wdth"] });

export const metadata: Metadata = {
  title: "Meeting At 10, the team behind ACCS",
  description: "Meeting At 10 is eleven QCU students who specify, design, build and run ACCS for the College of Computer Studies.",
};

export const viewport: Viewport = { themeColor: "#8ED2FF" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
