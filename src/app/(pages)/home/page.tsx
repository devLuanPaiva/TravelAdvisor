import { GoogleMapNearby } from "@/components/geolcation/GoogleMapNearby";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="p-0 h-[90vh] w-full flex-1  flex flex-col items-center ">
      <GoogleMapNearby session={session} />
    </main>
  );
}
