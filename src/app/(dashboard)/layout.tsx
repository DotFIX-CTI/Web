import Header from "@/components/header";
import Menubar from "@/components/menubar";
import { Suspense, ReactNode } from "react";
import { VisualizacaoProvider } from "@/context/visualizacaoContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <VisualizacaoProvider>
      <Header />
      <Suspense fallback={null}>
        <Menubar />
      </Suspense>
      <Suspense fallback={<div className="flex center p-8">Carregando...</div>}>
        {children}
      </Suspense>
    </VisualizacaoProvider>
  );
}
