import { useState, useEffect } from "react"
import { Modal } from "../ui/modal"
import { Button, buttonVariants } from "../ui/button"
import { Link } from "react-router-dom"
import ApplicationFormDemo from "./applicationFormDemo"
import DashboardDemo from "./dashboardDemo"
import InterviewDemo from "./interviewDemo"
import AnalyticsDemo from "./analyticsDemo"
import { ArrowRight, Play, Pause, RotateCcw } from "../icons"
interface DemoModalProps {
    isOpen: boolean
    onClose: () => void
    onGetStarted?: () => void
}

function DemoModal({ isOpen, onClose, onGetStarted }: DemoModalProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0)
            setIsPlaying(false)
        }
    }, [isOpen])

    // Auto-advance steps when playing
    useEffect(() => {
        if (!isPlaying || !isOpen) return

        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev >= demoSteps.length - 1) {
                    setIsPlaying(false) // Stop at the end
                    return prev
                }
                return prev + 1
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [isPlaying, isOpen])

    const demoSteps = [
        {
            title: "Dashboard Overview",
            description: "See all your job applications at a glance with key metrics and recent activity.",
            content: <DashboardDemo />
        },
        {
            title: "Add New Application",
            description: "Quickly add new job applications with all the important details.",
            content: <ApplicationFormDemo />,
        },
        {
            title: "Track Interview Progress",
            description: "Manage your interviews with scheduling and preparation tools.",
            content: <InterviewDemo />
        },
        {
            title: "Analytics & Insights",
            description: "Get insights into your job search performance and optimize your strategy.",
            content: <AnalyticsDemo />
        },
    ]

    const togglePlay = () => setIsPlaying(!isPlaying)
    const resetDemo = () => {
        setCurrentStep(0)
        setIsPlaying(false)
    }
    const nextStep = () => {
        if (currentStep < demoSteps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const currentStepData = demoSteps[currentStep]

    if (!isOpen) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="JobTracker Live Demo">
            <div className="p-6">
                {/* Demo Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={togglePlay}>
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                            {isPlaying ? "Pause" : "Play"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={resetDemo}>
                            <RotateCcw size={16} />
                            Reset
                        </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                        Step {currentStep + 1} of {demoSteps.length}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Demo Content */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{currentStepData.title}</h3>
                    <p className="text-gray-600 mb-4">{currentStepData.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">{currentStepData.content}</div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                        Previous
                    </Button>

                    <div className="flex gap-2">
                        {demoSteps.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentStep ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                                onClick={() => setCurrentStep(index)}
                            />
                        ))}
                    </div>

                    {currentStep === demoSteps.length - 1 ? (

                        <Link to={'/login'} className={buttonVariants({ variant: "default" })} >
                            Get Started Free
                            <ArrowRight className="ml-2" size={16} />
                        </Link>
                    ) : (
                        <Button onClick={nextStep}>
                            Next
                            <ArrowRight className="ml-2" size={16} />
                        </Button>
                    )}
                </div>

                {/* CTA Section */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-gray-700 mb-2">Ready to start tracking your job applications?</p>

                    <Link to={'/login'} className={buttonVariants({ variant: "default", className: 'w-full' })} >
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </Modal>
    )
}
export default DemoModal
