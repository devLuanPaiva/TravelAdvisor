import { Images } from "@/components/landing/Images";
import logo from "@/assets/blackLogo.png";
import { WellCome } from "@/components/landing/WellCome";
import Image from "next/image";
import { Reviews } from "@/components/landing/Reviews";
export default function Home() {
  return (
    <main className="flex h-screen w-screen items-start justify-between bg-zinc-100">
      <section className="w-[50%] h-full flex flex-col items-center justify-between relative">
        <div className="w-full  flex items-center justify-start p-3 px-5">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="h-20 w-20"
          />
        </div>
        <Images />
      </section>
      <section className="flex flex-col items-end justify-between w-[60%] h-full">
        <WellCome />
        <Reviews />
      </section>
    </main>
  );
}
