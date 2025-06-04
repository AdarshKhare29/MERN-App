// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo } from "./logo";
import { ArrowRight, Menu } from "lucide-react"
import { Button, buttonVariants } from "../ui/button";


const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
]

const Navbar = () => {
  const { user } = useSelector((state: any) => state.authReducer);
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link key={item.href} to={item.href} className="text-gray-600 hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to={"/register"} className={buttonVariants({ variant: "default", size: "default" })}>
                  Sign In
                </Link>
                <Link to={"/login"} className={buttonVariants({ variant: "default", size: "default" })}>
                  Log In
                </Link>
              </>)
              : (
                <Link to={"/logout"} className={buttonVariants({ variant: "default", size: "default" })}>Logout</Link>
              )}
            <Button className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>

          </div>
        </div>
      </div>
    </header>
  )
}
export default Navbar