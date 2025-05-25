"use client";

import { signIn } from "next-auth/react";

export function GoogleSignIn() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/home" })}
      className="flex items-center justify-center gap-2 w-full py-1 sm:py-3 px-4 rounded-[8px] border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-medium transition duration-300 cursor-pointer text-sm sm:text-base lg:text-lg"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.805 10.023h-9.19v3.955h5.391c-.232 1.312-.936 2.424-1.996 3.169v2.64h3.23c1.89-1.742 2.985-4.303 2.985-7.311 0-.624-.058-1.234-.168-1.82z"
          fill="#4285F4"
        />
        <path
          d="M12.615 21c2.7 0 4.968-.893 6.624-2.422l-3.23-2.64c-.896.602-2.048.96-3.394.96-2.608 0-4.818-1.76-5.606-4.124H3.69v2.594C5.336 18.937 8.737 21 12.615 21z"
          fill="#34A853"
        />
        <path
          d="M7.009 12.774a5.998 5.998 0 0 1 0-3.548V6.632H3.69a9.001 9.001 0 0 0 0 8.082l3.319-2.01z"
          fill="#FBBC05"
        />
        <path
          d="M12.615 5.423c1.468 0 2.786.505 3.822 1.496l2.867-2.867C17.582 2.586 15.314 1.5 12.615 1.5 8.737 1.5 5.336 3.563 3.69 6.632l3.319 2.594c.788-2.364 2.998-4.124 5.606-4.124z"
          fill="#EA4335"
        />
      </svg>
      Entrar com Google
    </button>
  );
}
