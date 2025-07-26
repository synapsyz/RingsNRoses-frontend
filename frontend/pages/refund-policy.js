import React from 'react';

const RefundPolicy = () => {
    return (
        <main className="max-w-4xl mx-auto py-10 lg:py-14 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-neutral-200">RingsNroses Refund Policy</h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">Last updated: July 25, 2025</p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Overview</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        This Refund Policy governs all subscription payments made by vendors ('you', 'your') for use of the RingsNRoses platform ('we', 'us', 'our'). It outlines the terms under which refunds may or may not be granted.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Free Trial (If Offered)</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        We may offer a limited-time free trial to new vendor accounts. During this trial, no charges will be applied. At the end of the trial, you will be automatically charged the applicable subscription fee unless canceled before the trial ends.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Monthly Subscriptions</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        Payments for monthly subscriptions are non-refundable once processed. You may cancel at any time, but access will remain active until the end of the current billing cycle. No prorated or partial refunds will be issued for unused days.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Annual Subscriptions</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        Annual plans may be eligible for a partial refund if cancellation occurs within 7 calendar days of the initial purchase. To qualify, the vendor must not have received leads or used premium promotional features within this period. After the 7-day window, payments are non-refundable.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Refund Request Process</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        To request a refund (for eligible cases):
                    </p>
                    <ul className="list-disc list-inside text-gray-800 dark:text-neutral-200 pl-5 space-y-2">
                        <li>Email us at [Insert Email] with:
                            <ul className="list-disc list-inside pl-5 mt-1">
                                <li>Your registered vendor name</li>
                                <li>Date of payment</li>
                                <li>Reason for refund</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="text-gray-800 dark:text-neutral-200">
                        We may take up to 7 business days to review and respond to refund requests.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Duplicate Charges</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        If you believe you’ve been charged more than once in error, please notify us immediately. Verified duplicate payments will be fully refunded.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Payment Disputes</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        Raising a dispute or chargeback without contacting our support team first may result in suspension of your account pending investigation. We recommend contacting support to resolve payment issues amicably and quickly.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Refunds for Promotional Offers</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        Discounts and promotional pricing are non-refundable and do not carry cash value. Refunds will be based on the actual amount paid, not the standard pricing.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">No Refund for Policy Violations</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        No refund will be granted if your account is suspended or terminated due to violations of our Terms of Service or Vendor Agreement.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Changes to This Refund Policy</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        We reserve the right to modify this Refund Policy at any time. Any changes will be posted on this page and, where appropriate, notified to you via email.
                    </p>
                </div>

                <div className="space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Contact Us</h2>
                    <p className="text-gray-800 dark:text-neutral-200">
                        For questions or to initiate a refund request, please contact:
                    </p>
                    <p className="text-gray-800 dark:text-neutral-200">
                        Email: <strong className="text-indigo-600">[Insert Email]</strong><br />
                        Address: <strong className="text-indigo-600">[Insert Business Address]</strong>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RefundPolicy;