import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Header from "@/components/template/Header";
export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/authentication");
  }
  return (
    <div>
      <Header name={session.user?.name ?? ""} />
    </div>
  );
}
