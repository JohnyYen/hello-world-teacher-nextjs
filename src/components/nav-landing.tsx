import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function NavLanding() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <Link href="/" className="text-xl font-bold">
          MyPlatform
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
          Home
        </Link>
        <Link href="/#description" className="text-sm font-medium hover:underline underline-offset-4">
          Description
        </Link>
        <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
          Features
        </Link>
        <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4">
          Sign Up
        </Link>
        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
          Login
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center space-x-4 md:hidden">
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="/#description" className="text-sm font-medium hover:underline underline-offset-4">
                Description
              </Link>
              <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
              <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4">
                Sign Up
              </Link>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                Login
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}