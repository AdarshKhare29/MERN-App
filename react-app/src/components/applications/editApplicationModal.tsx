import { useState, useEffect } from "react"
import type React from "react"

import { Modal } from "../ui/modal"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { CheckCircle } from "../icons"
import type { JobApplication } from "../../types"
import { Application } from "../../reducers/newApplication"

interface EditApplicationModalProps {
    isOpen: boolean
    onClose: () => void
    onUpdateApplication: (id: string, updates: Partial<JobApplication>) => void
    application: Application | null
}

export function EditApplicationModal({ isOpen, onClose, onUpdateApplication, application }: EditApplicationModalProps) {
    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        location: "",
        salary: "",
        applicationDate: "",
        status: "applied" as const,
        notes: "",
        url: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Populate form when application changes
    useEffect(() => {
        if (application) {
            setFormData({
                jobTitle: application.jobTitle,
                company: application.company,
                location: application.location || "",
                salary: application.salary || "",
                applicationDate: application.applicationDate,
                status: "applied",
                notes: application.notes || "",
                url: application.url || "",
            })
        }
    }, [application])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!application) return

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const updates: Partial<Application> = {
                jobTitle: formData.jobTitle,
                company: formData.company,
                location: formData.location,
                salary: formData.salary,
                applicationDate: formData.applicationDate,
                status: formData.status,
                notes: formData.notes,
                url: formData.url,
            }

            // onUpdateApplication(application.id, updates)
            setIsSubmitting(false)
            setIsSuccess(true)

            // Close modal after success
            setTimeout(() => {
                setIsSuccess(false)
                onClose()
            }, 1500)
        }, 800)
    }

    const handleClose = () => {
        setIsSuccess(false)
        onClose()
    }

    if (!application) return null
    console.log("application", application, formData)
    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Edit Application">
            {isSuccess ? (
                <div className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Application Updated!</h3>
                    <p className="mt-2 text-sm text-gray-500">Your job application has been successfully updated.</p>
                    <div className="mt-6">
                        <Button onClick={handleClose} className="w-full">
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6">
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
                        <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update Application"}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    )
}
