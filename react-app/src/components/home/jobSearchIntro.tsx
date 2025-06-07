import { ArrowRight, CheckCircle } from "../icons"
import { buttonVariants } from "../ui/button"
import OptimizedDemo from "../demo/optimizedDemo"
import { Link } from "react-router-dom"

interface JobSearchIntroProps {
    onGetStarted?: () => void
    onTryDemo?: () => void
}

const JobSearchIntro = ({ onTryDemo }: JobSearchIntroProps) => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                            Track Your Job Search
                            <br />
                            <span >Like a Pro</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                            Organize your job applications, track interview progress, and land your dream job faster with our
                            comprehensive job search management platform.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link to={'/login'} className={buttonVariants({ variant: "default", size: "lg", className: 'h-12 px-8' })} >
                            Get Started Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <div className="flex gap-2">
                            <OptimizedDemo onGetStarted={onTryDemo} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <CheckCircle className="text-green-500" size={16} />
                            Free forever
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="text-green-500" size={16} />
                            No credit card required
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="text-green-500" size={16} />
                            Setup in 2 minutes
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default JobSearchIntro 