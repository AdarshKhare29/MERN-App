"use client"
import { Search, BriefcaseIcon } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface HeaderProps {
    isLoggedIn?: boolean
    onLogin?: () => void
    onLogout?: () => void
}

export function Header({ isLoggedIn = false, onLogin, onLogout }: HeaderProps) {
    if (!isLoggedIn) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <a href="/" className="flex items-center gap-2 font-semibold">
                        <BriefcaseIcon size={24} />
                        <span>JobTracker</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-sm font-medium hover:text-blue-600">
                            Features
                        </a>
                        <a href="#pricing" className="text-sm font-medium hover:text-blue-600">
                            Pricing
                        </a>
                        <a href="#testimonials" className="text-sm font-medium hover:text-blue-600">
                            Testimonials
                        </a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={onLogin}>
                            Log In
                        </Button>
                        <Button size="sm" onClick={onLogin}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
                <BriefcaseIcon size={24} />
                <span>JobTracker</span>
            </a>
            <div className="ml-auto flex items-center gap-4">
                <form className="hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                        <Input type="search" placeholder="Search jobs..." className="w-64 pl-8" />
                    </div>
                </form>
                <Button variant="outline" size="icon" className="rounded-full" onClick={onLogout}>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Button>
            </div>
        </header>
    )
}
