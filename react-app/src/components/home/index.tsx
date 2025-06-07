import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseIcon, BarChart3, Calendar, CheckCircle, Star, Users, TrendingUp } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Footer from "../footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <section className="w-full max-w-4xl text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Track Your Job Search <br />
                <span className="text-primary">Like a Pro</span>
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                Organize your job applications, track interview progress, and land your dream job faster with our comprehensive job search management platform.
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button size="lg" className="h-12 px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8">
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free forever
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Setup in 2 minutes
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
