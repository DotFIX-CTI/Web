import Header from "@/components/header"; // ajuste o caminho se for diferente
import Menubar from "@/components/menubar"; // ajuste o caminho se for diferente
import { VisualizacaoProvider } from "@/context/visualizacaoContext";
import { Suspense, ReactNode } from "react";

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
