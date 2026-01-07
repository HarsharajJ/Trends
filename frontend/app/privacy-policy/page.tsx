"use client"

import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="font-[var(--font-oswald)] text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated: January 1, 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="prose prose-invert max-w-none space-y-8"
                >
                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            1. Information We Collect
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                When you make a purchase on NU jerserys, we collect the following information:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong className="text-foreground">Personal Information:</strong> Name, email address, and phone number</li>
                                <li><strong className="text-foreground">Payment Information:</strong> Payment details are processed securely through our third-party payment processor and are not stored on our servers</li>
                                <li><strong className="text-foreground">Transaction Data:</strong> Purchase history and download records</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            2. How We Use Your Information
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Process your purchases and deliver digital design files</li>
                                <li>Send order confirmations and download links</li>
                                <li>Provide customer support</li>
                                <li>Send promotional emails (only with your consent)</li>
                                <li>Improve our services and user experience</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            3. Payment Processing
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                We use secure third-party payment processors to handle all transactions. Your payment information is encrypted and processed directly by our payment partners. We do not store your credit card details on our servers.
                            </p>
                            <p>
                                Our payment processors comply with PCI-DSS (Payment Card Industry Data Security Standard) requirements.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            4. Data Security
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>SSL/TLS encryption for all data transmission</li>
                                <li>Secure server infrastructure</li>
                                <li>Regular security audits</li>
                                <li>Limited access to personal data by authorized personnel only</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            5. Your Rights
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access your personal data we hold</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal requirements)</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Request a copy of your data in a portable format</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            6. Cookies
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie preferences through your browser settings.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            7. Third-Party Services
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you. These parties agree to keep this information confidential.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            8. Contact Us
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <p className="text-foreground font-medium">
                                Email: nujerseys14@gmail.com
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-border">
                        <p className="text-muted-foreground text-sm">
                            This Privacy Policy may be updated from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    )
}
