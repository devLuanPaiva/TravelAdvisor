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
      <main className="p-0 w-full flex-1 min-h-screen flex flex-col md:flex-row  gap-4">
        <aside className="w-full h-[200px] md:w-[20%] md:h-screen ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, a. Enim, ipsam dolore eaque ipsum, expedita, ad temporibus quod cum non iure deserunt error facilis ea consequuntur repellat veniam reiciendis.
        </aside>
        <section className="flex-1 w-full h-screen p-5">
          <GoogleMapNearby />
        </section>
      </main>
      <Logout />
    </div>
  );
}
