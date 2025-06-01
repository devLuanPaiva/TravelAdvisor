import { Payment } from "@/components/payment/Payment";
import { PlansSearch } from "@/components/plans/PlansSearch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PlansPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col items-center justify-start w-full py-10">
      <PlansSearch />
      <Payment session={session} />
    </div>
  );
}
