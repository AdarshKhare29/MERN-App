// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, BriefcaseIcon, Search } from "lucide-react"
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const navigationItems = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
]

const Navbar = () => {
  const { user } = useSelector((state: any) => state.auth);
  console.log(user)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">

        <a href="/" className="flex items-center gap-2 font-semibold">
          <BriefcaseIcon size={24} />
          <span>JobTracker</span>
        </a>

        {/* Navigation - center on md+ */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link key={item.href} to={item.href} className="text-sm font-medium hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons and mobile menu */}
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className={buttonVariants({ variant: "outline" })}>
                Log In
              </Link>
              <Link to="/register" className={buttonVariants({ variant: "black", size: "sm" })} >
                Sign In
              </Link>
            </>
          ) : (
            <>

              <div className="ml-auto flex items-center gap-4">
                {/* <form className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search jobs..." className="w-64 bg-background pl-8" />
                  </div>
                </form> */}
                <Button variant="outline" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </div>
              <Link to="/logout" className={buttonVariants({ variant: "default" })}>
                Logout
              </Link>
            </>
          )}
          <Button className="md:hidden hover:text-gray-900" variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>

  )
}
export default Navbar