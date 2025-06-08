import { useState } from "react"
import type React from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { CheckCircle } from "../icons"
import { useDispatch } from "react-redux"
import { addNewApplication } from "../../reducers/newApplication"
import { ApplicationStatus } from "../../reducers/newApplication"
interface AddApplicationModalProps {
    isOpen: boolean
    onClose: () => void
}

interface ApplicationData {
    jobTitle: string;
    company: string;
    location: string;
    salaryRange: string;
    applicationDate: string;
    status: string;
    jobUrl: string;
    notes: string;
}

const AddApplicationModal = ({ isOpen, onClose }: AddApplicationModalProps) => {
    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        location: "",
        salary: "",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "applied",
        notes: "",
        url: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
            jobTitle: "",
            company: "",
            location: "",
            salary: "",
            applicationDate: new Date().toISOString().split("T")[0],
            status: "applied",
            notes: "",
            url: "",
        })
        setError(null)
        setIsSuccess(false)
    }
    const handleClose = () => {
        resetForm()
        onClose()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        console.log(formData)
        try {
            const response = await dispatch(
                addNewApplication({ ...formData, status: formData.status as ApplicationStatus }) as any
            );
            console.log(response)
            if (response.success) {
                // API call was successful
                setIsSuccess(true)
                // Auto-close modal after showing success message
                setTimeout(() => {
                    handleClose()
                }, 2000)
            } else {
                // API call failed
                setError(response.message || "Failed to save application")
            }
        } catch (err: any) {
            // Handle unexpected errors
            console.error("Error adding application:", err)
            setError(err.message || "An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Application">
            {isSuccess ? (
                <div className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Application Added!</h3>
                    <p className="mt-2 text-sm text-gray-500">Your job application has been successfully added.</p>
                    <div className="mt-6">
                        <Button onClick={onClose} className="w-full">
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                                    <p className="mt-1 text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid gap-6 mb-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title *
                                </label>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Frontend Developer"
                                />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company *
                                </label>
                                <Input
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Acme Inc."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Remote, New York, NY"
                                />
                            </div>
                            <div>
                                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                                    Salary Range
                                </label>
                                <Input
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="e.g. $80,000 - $100,000"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Application Date *
                                </label>
                                <Input
                                    id="applicationDate"
                                    name="applicationDate"
                                    type="date"
                                    value={formData.applicationDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="applied">Applied</option>
                                    <option value="interview">Interview</option>
                                    <option value="offer">Offer</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                                Job URL
                            </label>
                            <Input
                                id="url"
                                name="url"
                                type="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="e.g. https://company.com/jobs/123"
                            />
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Add any notes about this application..."
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Application"}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    )
}
export default AddApplicationModal