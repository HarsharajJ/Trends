"use client"

import { motion } from "framer-motion"

export default function TermsPage() {
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
                        Terms and Conditions
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated: January 1, 2025
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
                            1. Digital Products
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                NU jerserys provides digital jersey design files. Upon successful payment, you will receive access to download a ZIP file containing your design in Adobe Illustrator (.ai) and CorelDraw (.cdr) formats.
                            </p>
                            <p>
                                <strong className="text-foreground">Important:</strong> All products sold on NU jerserys are digital files only. We do not manufacture or ship physical jerseys.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            2. License Terms
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>When you purchase a design from NU jerserys, you receive:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong className="text-foreground">Single-Use License:</strong> You may use the design for your personal or team's jerseys</li>
                                <li><strong className="text-foreground">Non-Transferable:</strong> The license cannot be sold, transferred, or sublicensed to others</li>
                                <li><strong className="text-foreground">Non-Exclusive:</strong> The same design may be sold to other customers</li>
                                <li><strong className="text-foreground">Modification Allowed:</strong> You may modify the design for your use</li>
                            </ul>
                            <p className="mt-4">
                                <strong className="text-foreground">Prohibited Uses:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Reselling or redistributing the design files</li>
                                <li>Using designs for commercial purposes beyond your team</li>
                                <li>Claiming ownership or copyright of the original design</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            3. Refund Policy
                        </h2>
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                            <p className="text-foreground font-medium mb-2">
                                No Refunds on Digital Products
                            </p>
                            <p className="text-muted-foreground">
                                Due to the nature of digital products, all sales are final once the download has been initiated. We cannot offer refunds or exchanges after purchase. Please review the design previews carefully before making a purchase.
                            </p>
                        </div>
                        <div className="text-muted-foreground space-y-3 mt-4">
                            <p>
                                <strong className="text-foreground">Exceptions:</strong> We may consider refunds in cases of:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Duplicate charges due to technical errors</li>
                                <li>Files that are corrupted or cannot be opened</li>
                                <li>Significant discrepancy between preview and delivered files</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            4. Intellectual Property
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                All designs, graphics, and content on NU jerserys are protected by copyright and intellectual property laws. NU jerserys retains all rights to the original design files.
                            </p>
                            <p>
                                Purchasing a design grants you a license to use it as specified above, but does not transfer ownership of the intellectual property.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            5. User Responsibilities
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>By using NU jerserys, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate and complete information during checkout</li>
                                <li>Use a valid payment method that you are authorized to use</li>
                                <li>Download your files within 30 days of purchase</li>
                                <li>Keep your download links secure and not share them publicly</li>
                                <li>Comply with all applicable laws regarding the use of our designs</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            6. Limitation of Liability
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                NU jerserys provides designs "as is" without any warranties, express or implied. We are not responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>How the design appears when printed or manufactured</li>
                                <li>Compatibility issues with third-party software</li>
                                <li>Any indirect, incidental, or consequential damages</li>
                                <li>Quality of physical products made using our designs</li>
                            </ul>
                            <p>
                                Our total liability is limited to the amount you paid for the specific design.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            7. Dispute Resolution
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                Any disputes arising from these terms or your use of NU jerserys shall be resolved through:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li>Direct communication with our customer support</li>
                                <li>Mediation, if direct resolution is not possible</li>
                                <li>Binding arbitration as a last resort</li>
                            </ol>
                            <p>
                                These terms are governed by the laws of India.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            8. Changes to Terms
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of NU jerserys after changes constitutes acceptance of the new terms.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-foreground">
                            9. Contact Us
                        </h2>
                        <div className="text-muted-foreground space-y-3">
                            <p>
                                If you have any questions about these Terms and Conditions, please contact us at:
                            </p>
                            <p className="text-foreground font-medium">
                                Email: nujerseys14@gmail.com
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-border">
                        <p className="text-muted-foreground text-sm">
                            By using NU jerserys and making a purchase, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    )
}
