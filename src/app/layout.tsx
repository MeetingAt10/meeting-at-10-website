import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meeting At 10, the team behind ACCS",
  description: "Meeting At 10 is eleven QCU students who specify, design, build and run ACCS for the College of Computer Studies.",
};

export const viewport: Viewport = { themeColor: "#8ED2FF" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
