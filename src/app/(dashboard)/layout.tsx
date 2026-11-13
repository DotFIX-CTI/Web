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
      <Menubar />
      {children}
    </>
  );
}
