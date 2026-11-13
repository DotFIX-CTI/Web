import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      className={`${minhaFonte.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
