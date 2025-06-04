import { Zap } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-gray-900">StreamLine</span>
    </div>
  )
}
