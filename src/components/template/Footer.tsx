import { Logo } from "../shared/Logo";

export function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 text-white min-h-[10vh] px-8 py-6 gap-5">
      <Logo />
      <p>© 2025 - Todos os direitos reservados</p>
    </footer>
  );
}
