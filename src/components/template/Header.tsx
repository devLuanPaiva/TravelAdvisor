import { CurrentCity } from "../geolcation/CurrentCity";
import { Logo } from "../shared/Logo";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-900  text-white h-[10vh] px-8 py-6">
      <Logo/>
      <CurrentCity />
    </header>
  );
}
