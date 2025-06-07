import { useState, lazy, Suspense } from "react"
import { Button } from "../ui/button"

// Lazy load the modal content only when needed
const DemoModal = lazy(() => import("./demoModal"))

interface OptimizedDemoProps {
    onGetStarted?: () => void
}

const OptimizedDemo = ({ onGetStarted }: OptimizedDemoProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasOpened, setHasOpened] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        setHasOpened(true) // Track that modal has been opened at least once
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Button variant="outline" size="lg" className="h-12 px-8" onClick={openModal}>
                Watch Demo
            </Button>

            {/* Only render modal after it's been opened at least once */}
            {hasOpened && (
                <Suspense fallback={<div>Loading demo...</div>}>
                    <DemoModal isOpen={isModalOpen} onClose={closeModal} onGetStarted={onGetStarted} />
                </Suspense>
            )}
        </>
    )
}
export default OptimizedDemo