import { CurrentCity } from "../geolcation/CurrentCity";

interface HeaderProps {
  name: string;
}
export function Header({ name }: Readonly<HeaderProps>) {
  return (
    <header className="flex items-center justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white h-16 px-8 py-6">
      <h2>Olá, {name}!</h2>
      <CurrentCity />
    </header>
  );
}
