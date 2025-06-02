import Loading from "@/components/shared/Loading";
import { Footer } from "@/components/template/Footer";
import { Header } from "@/components/template/Header";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Suspense fallback={<Loading message="Carregando..." />}>
        <Header />
        {children}
        <Footer />
      </Suspense>
    </div>
  );
}
