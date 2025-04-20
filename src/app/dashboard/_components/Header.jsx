// components/Header.jsx
'use client';
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Header() {
  // Get the current pathname
  const path = usePathname();
  return (
    <header className=" bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" >
              <Image
                src="/images/interview.svg" 
                alt="Logo"
                width={0}
                height={0}
                className="cursor-pointer h-10 w-12"
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/dashboard"
              className={`text-black hover:text-indigo-500 font-medium ${path === "/dashboard" ? "text-indigo-700 font-bold" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              href="/questions"
              className={`text-black hover:text-indigo-500 font-medium ${path === "/question" ? "text-indigo-700 font-bold" : ""}`}
            >
              Questions
            </Link>
            <Link
              href="/upgrade"
              className={`text-black hover:text-indigo-500 font-medium ${path === "/upgrade" ? "text-indigo-700 font-bold" : ""}`}
            >
              Upgrade
            </Link>
            <Link
              href="/how-it-works"
              className={`text-black hover:text-indigo-500 font-medium ${path === "/how-it-works" ? "text-indigo-700 font-bold" : ""}`}
            >
              How It Works
            </Link>
          </nav>

          {/* Right: User Button */}
          <div className="flex items-center">
          <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
