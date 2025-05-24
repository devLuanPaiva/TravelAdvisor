import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Header } from "@/components/template/Header";
import { Logout } from "@/components/shared/Logout";
import { GoogleMapNearby } from "@/components/geolcation/GoogleMapNearby";
export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <Header name={session.user?.name ?? ""} />
      <main className="p-0 w-full flex-1 min-h-screen flex flex-col items-center ">
        <GoogleMapNearby />
      </main>
      <Logout />
    </div>
  );
}
