import Input from "@/components/input";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/dashboard">Ir para Dashboard</Link>
      <Input label="Teste" placeholder="Teste" icon="email"/>
      <Input label="Teste" placeholder="Teste" icon="email" error/>
    </>
  );
}
