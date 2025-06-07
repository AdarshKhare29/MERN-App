import React from "react";
import { Link } from "react-router-dom";
import { BriefcaseIcon } from "../icons";
const Footer = () => {
    return (
        <footer className="w-full border-t bg-gray-50 dark:bg-gray-900">
            <div className="container flex flex-col gap-4 py-10 px-4 md:px-6 lg:flex-row lg:gap-8">
                <div className="flex flex-col gap-2">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <BriefcaseIcon className="h-6 w-6 dark:text-gray-400" />
                        <span className="dark:text-gray-400">JobTracker</span>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">The ultimate job search management platform.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold dark:text-gray-400 dark:text-gray-400">Product</h4>
                        <div className="space-y-1">
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Features
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Pricing
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                API
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold dark:text-gray-400 ">Company</h4>
                        <div className="space-y-1">
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                About
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Blog
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Careers
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold dark:text-gray-400">Support</h4>
                        <div className="space-y-1">
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Help Center
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Contact
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Status
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold dark:text-gray-400">Legal</h4>
                        <div className="space-y-1">
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Privacy
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Terms
                            </Link>
                            <Link
                                to="#"
                                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col gap-2 py-6 px-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">© 2025  JobTracker. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link
                        to="#"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        Twitter
                    </Link>
                    <Link
                        to="#"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        LinkedIn
                    </Link>
                    <Link
                        to="#"
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        GitHub
                    </Link>
                </div>
            </div>
        </footer>
    )
}
export default Footer