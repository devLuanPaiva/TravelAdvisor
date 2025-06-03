import { Images } from "@/components/landing/Images";
import logo from "@/assets/blackLogo.png";
import { WellCome } from "@/components/landing/WellCome";
import Image from "next/image";
import { Reviews } from "@/components/landing/Reviews";
import { Footer } from "@/components/template/Footer";
export default function Home() {
  return (
    <>
      <main className="flex flex-col-reverse md:flex-row min-h-screen md:h-screen  max-w-screen items-start justify-between bg-zinc-100 " >
        <section className="flex w-full min-h-[600px]  md:w-[50%]  md:h-full flex-col items-center justify-between relative">
          <div className="hidden md:flex w-full  items-center justify-start p-3 px-5">
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
        <section className="flex flex-col items-center md:items-end justify-start md:justify-between w-full md:w-[60%] md:h-full">
          <WellCome />
          <Reviews />
        </section>
      </main>
      <Footer />
    </>
  );
}
