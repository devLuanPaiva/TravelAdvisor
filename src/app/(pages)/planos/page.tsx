import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Plans } from "@/components/plans/Plans";
import { PlansSearch } from "@/components/plans/PlansSearch";

export default async function PlansPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col items-center justify-start w-full py-10">
      <PlansSearch />
      <Plans session={session} />
    </div>
  );
}
