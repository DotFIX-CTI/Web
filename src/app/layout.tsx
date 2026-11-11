import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menubar from "@/components/menubar";
import Header from "@/components/header";
import Main from "@/utils/main";

const minhaFonte = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
});

const pixelFont = localFont({
  src: "./fonts/PressStart2P.ttf",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "DotFIX",
  description: "Sistema de agendamentos de equipes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br" className={`${minhaFonte.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <Menubar />
        {children}
      </body>
    </html>
  );
}