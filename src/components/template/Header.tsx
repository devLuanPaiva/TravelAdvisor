import Link from "next/link";
import { CurrentCity } from "../geolcation/CurrentCity";
import { Logo } from "../shared/Logo";

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-900  text-white sm:h-[10vh] px-8 py-6 sm:gap-5">
      <Logo />
      <div className="flex flex-1 gap-3 max-sm:justify-between max-sm:w-full">
        <nav className="flex-1 flex items-center sm:justify-end ">
          <Link href="/planos">Nossos planos</Link>
        </nav>
        <CurrentCity />
      </div>
    </header>
  );
}
