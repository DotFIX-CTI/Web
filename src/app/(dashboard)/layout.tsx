import { Suspense } from "react";
import Header from "@/components/header";
import Menubar from "@/components/menubar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Menubar />
      </Suspense>
      <Suspense fallback={<div className="flex center p-8">Carregando...</div>}>
        {children}
      </Suspense>
    </>
  );
}
