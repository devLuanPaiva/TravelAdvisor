"use client";
import { signOut } from "next-auth/react";
import { RiLogoutCircleLine } from "react-icons/ri";
export function Logout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/authentication" })}
      className="fixed top-[90%] left-5 size-10  rounded-full bg-radial-[at_25%_25%] from-gray-900 via-gray-800 to-black z-50 flex items-center justify-center  text-white cursor-pointer"
    >
      <RiLogoutCircleLine size={30} />
    </button>
  );
}
