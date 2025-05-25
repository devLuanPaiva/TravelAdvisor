import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Header } from "@/components/template/Header";
import { GoogleMapNearby } from "@/components/geolcation/GoogleMapNearby";
export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col h-screen">
      <Header  />
      <main className="p-0 h-[90vh] w-full flex-1  flex flex-col items-center ">
        <GoogleMapNearby session={session} />
      </main>
    </div>
  );
}
