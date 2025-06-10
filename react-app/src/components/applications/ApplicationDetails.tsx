import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea'
import { Plus, MessageSquare } from 'lucide-react';
import type { Application } from '../../reducers/newApplication';

interface ApplicationDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    application: Application | null;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
    isOpen,
    onClose,
    application
}) => {
    const [interviewQuestions, setInterviewQuestions] = useState<string[]>(
        application?.interviewQuestions || []
    );
    const [newQuestion, setNewQuestion] = useState('');

    if (!application) return null;

    const statusColors = {
        applied: "bg-yellow-500",
        interview: "bg-blue-500",
        offer: "bg-green-500",
        rejected: "bg-red-500",
    };

    const statusLabels = {
        applied: "Applied",
        interview: "Interview",
        offer: "Offer",
        rejected: "Rejected",
    };

    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            const updatedQuestions = [...interviewQuestions, newQuestion.trim()];
            setInterviewQuestions(updatedQuestions);
            setNewQuestion('');
            // TODO: Save to Redux store/backend
        }
    };

    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = interviewQuestions.filter((_, i) => i !== index);
        setInterviewQuestions(updatedQuestions);
        // TODO: Save to Redux store/backend
    };

    const handleSubmitBtn = () => {
        console.log("inside btn fn", interviewQuestions, application)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        {application.jobTitle} at {application.company}
                        <Badge className={statusColors[application.status]}>
                            {statusLabels[application.status]}
                        </Badge>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Application Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">Location:</span> {application.location || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Salary:</span> {application.salary || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Application Date:</span> {application.applicationDate || 'N/A'}
                                </div>
                                {application.url && (
                                    <div>
                                        <span className="font-medium">Job URL:</span>{' '}
                                        <a
                                            href={application.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {application.url}
                                        </a>
                                    </div>
                                )}
                            </div>
                            {application.notes && (
                                <div>
                                    <span className="font-medium">Notes:</span>
                                    <p className="mt-1 text-gray-600">{application.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Interview Questions Section - Only show for interview status */}
                    {application.status === 'interview' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare size={20} />
                                    Interview Questions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Add new question */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Add Interview Question:</label>
                                    <div className="flex gap-2">
                                        <Textarea
                                            placeholder="Enter the interview question that was asked..."
                                            value={newQuestion}
                                            onChange={(e) => setNewQuestion(e.target.value)}
                                            className="flex-1"
                                            rows={2}
                                        />
                                        <Button onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                </div>


                                {/* Questions list */}
                                <div className="space-y-3">
                                    {interviewQuestions.length === 0 ? (
                                        <p className="text-gray-500 text-center py-4">
                                            No interview questions added yet. Add questions above to track what was asked.
                                        </p>
                                    ) : (
                                        interviewQuestions.map((question, index) => (
                                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-start gap-2">
                                                    <p className="flex-1">{question}</p>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveQuestion(index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="flex">
                                    <Button className="w-full md:w-auto ml-auto" onClick={handleSubmitBtn}>
                                        Submit Questions
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ApplicationDetails;