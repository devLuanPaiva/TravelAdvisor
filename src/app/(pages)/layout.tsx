import Loading from "@/components/shared/Loading";
import { Header } from "@/components/template/Header";
import { SessionProvider } from "@/contexts/SessionContext";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SessionProvider>
        <Suspense fallback={<Loading message="Carregando..." />}>
          <Header />
          {children}
        </Suspense>
      </SessionProvider>
    </div>
  );
}
