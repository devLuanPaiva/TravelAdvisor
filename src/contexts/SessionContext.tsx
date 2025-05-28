"use client";

import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { createContext, useContext } from "react";

interface SessionContextProps {
  session: Session;
}
const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps
);

export async function SessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;

export const useSession = () => useContext(SessionContext);
