import logoImg from "@/assets/logo.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export async function Logo() {
  const session = await getServerSession();

  return (
    <Link href={session ? "/home" : "/"}>
      <Image src={logoImg} alt="logo" width={120} height={100} />
    </Link>
  );
}
