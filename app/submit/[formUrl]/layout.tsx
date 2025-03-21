"use client";

import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ReactNode } from "react";


export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen">
      <nav className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex flex-grow w-full">{children}</main>
    </div>
  );
}