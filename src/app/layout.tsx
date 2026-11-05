import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const minhaFonte = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DotFIX",
  description: "Sistema de agendamentos de equipes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br" className={`${minhaFonte.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
