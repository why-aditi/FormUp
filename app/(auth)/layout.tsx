"use client";

import { ReactNode } from "react";
import Logo from "../../components/Logo";
import ThemeSwitcher from "../../components/ThemeSwitcher"


export default function Layout({children}: {children:ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex items-center justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="flex flex-grow w-full h-full items-center justify-center">{children}</main>
    </div>
  );
}