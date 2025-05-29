import { Payment } from "@/components/payment/Payment";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function PlainsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return <Payment session={session} />;
}
