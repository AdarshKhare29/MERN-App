import type React from "react"

interface AvatarProps {
    children: React.ReactNode
    className?: string
}

export function Avatar({ children, className = "" }: AvatarProps) {
    return <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>{children}</div>
}

export function AvatarImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return (
        <img
            className={`aspect-square h-full w-full object-cover ${className}`}
            src={src || "/placeholder.svg"}
            alt={alt}
        />
    )
}

export function AvatarFallback({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 ${className}`}
        >
            {children}
        </div>
    )
}
