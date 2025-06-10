import Image from "next/image";
import logo from "@/assets/blackLogo.png";
interface AuthSectionProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    message?: string | null;
    messageType?: "success" | "error" | null;

}
export function AuthSection({ children, title, description, message, messageType }: Readonly<AuthSectionProps>) {
    return (
        <section className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-5">
            <article className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
                <header className="w-full flex flex-col items-center mb-6">
                    <div className="w-full flex justify-between mb-4 space-x-2.5 gap-2.5">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-left">
                            {title}
                        </h1>
                        <Image
                            src={logo}
                            alt="logo"
                            width={200}
                            height={100}
                            className="h-10 w-10" />
                    </div>
                    {description && (
                        <p className="text-gray-600 text-sm text-center">
                            {description}
                        </p>
                    )}
                </header>
                {children}
                {message && (
                    <div
                        className={`w-full mt-4 text-center text-xs p-2 rounded-md font-semibold ${messageType === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {message}
                    </div>
                )}
            </article>
        </section>
    )
}