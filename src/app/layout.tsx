import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Variable fonts: the design system uses Plus Jakarta Sans 700 and 800 and JetBrains Mono for time codes.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeting At 10 · The team behind ACCS",
  description: "Meet the eleven-person capstone team building ACCS for the QCU College of Computer Studies. Explore our work, process and design system.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="ds-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
