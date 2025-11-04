import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavLanding } from "@/components/nav-landing";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavLanding />
      {children}
    </div>
  );
}
