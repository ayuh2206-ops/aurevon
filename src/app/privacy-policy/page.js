import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy — Aurevon Realty Pvt. Ltd.',
    description: 'Privacy Policy of Aurevon Realty Pvt. Ltd. detailing how we collect, use, and protect your personal data in compliance with Indian data protection laws.',
};

export default function PrivacyPolicyPage() {
    const lastUpdated = '20 February 2026';
    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            {/* Header */}
            <div className="bg-[#0D0B09] border-b border-[#2E2A25]">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <Link href="/" className="text-[#C9A96E] font-sans text-sm hover:text-[#F5F0E8] transition-colors mb-6 inline-block">← Back to Home</Link>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-3">Privacy Policy</h1>
                    <p className="font-sans text-sm text-[#7A7268]">Last updated: {lastUpdated}</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="prose prose-lg max-w-none" style={{ fontFamily: "'Inter', sans-serif" }}>

                    {/* Introduction */}
                    <section className="mb-12">
                        <p className="text-[#7A7268] leading-relaxed text-sm">
                            Aurevon Realty Pvt. Ltd. (&quot;Aurevon Realty&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered under the Companies Act, 2013 and operating as a RERA-registered real estate advisory firm, is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or engage with us through any medium.
                        </p>
                        <p className="text-[#7A7268] leading-relaxed text-sm mt-4">
                            This policy is compliant with the <strong className="text-[#1A1714]">Information Technology Act, 2000</strong>, the <strong className="text-[#1A1714]">Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> (&quot;SPDI Rules&quot;), the <strong className="text-[#1A1714]">Digital Personal Data Protection Act, 2023</strong> (&quot;DPDPA&quot;), and applicable provisions of the <strong className="text-[#1A1714]">Real Estate (Regulation and Development) Act, 2016</strong> (&quot;RERA&quot;).
                        </p>
                    </section>

                    {/* 1. Information We Collect */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">1. Information We Collect</h2>

                        <h3 className="font-serif text-lg text-[#1A1714] mt-6 mb-2">1.1 Personal Data You Provide</h3>
                        <p className="text-[#7A7268] text-sm leading-relaxed">When you fill out our contact form, enquire about a property, register for our NRI advisory service, or communicate with us via WhatsApp, phone, or email, we may collect:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number / WhatsApp number</li>
                            <li>City of interest and property preferences</li>
                            <li>Budget range</li>
                            <li>NRI status and country of residence (if applicable)</li>
                            <li>PAN, Aadhaar, or passport details (only when required for RERA-mandated documentation)</li>
                        </ul>

                        <h3 className="font-serif text-lg text-[#1A1714] mt-6 mb-2">1.2 Automatically Collected Information</h3>
                        <p className="text-[#7A7268] text-sm leading-relaxed">When you access our website, our servers and third-party analytics tools may automatically record:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>IP address and approximate geolocation</li>
                            <li>Browser type, device type, and operating system</li>
                            <li>Pages visited, time spent, and referral source</li>
                            <li>Cookies and similar tracking technologies (see Section 7)</li>
                        </ul>

                        <h3 className="font-serif text-lg text-[#1A1714] mt-6 mb-2">1.3 Sensitive Personal Data or Information (SPDI)</h3>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            As defined under the SPDI Rules, 2011, we do not ordinarily collect sensitive personal data such as financial information, passwords, biometric data, health data, or sexual orientation. In cases where financial details are required (e.g., for payment processing during property transactions), such data is collected by our banking partners and payment gateways, not stored on our servers.
                        </p>
                    </section>

                    {/* 2. Purpose of Data Collection */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">2. Purpose of Data Collection</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">We collect and process personal data for the following lawful purposes:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>To respond to your enquiries about commercial properties</li>
                            <li>To provide personalised property recommendations</li>
                            <li>To facilitate property transactions, documentation, and RERA-mandated processes</li>
                            <li>To provide NRI advisory and investment consultancy services</li>
                            <li>To send transactional communications (booking confirmations, site visit schedules, document updates)</li>
                            <li>To send marketing communications about new listings, market reports, or events (with your consent)</li>
                            <li>To improve our website, services, and user experience through analytics</li>
                            <li>To comply with legal and regulatory obligations under RERA, IT Act, and tax laws</li>
                        </ul>
                    </section>

                    {/* 3. Lawful Basis for Processing (DPDPA Compliance) */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">3. Lawful Basis for Processing (DPDPA 2023)</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">Under the Digital Personal Data Protection Act, 2023, we process your personal data based on:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li><strong className="text-[#1A1714]">Consent:</strong> Your voluntary submission of personal data through our forms, calls, or messages constitutes consent. You may withdraw consent at any time (see Section 9).</li>
                            <li><strong className="text-[#1A1714]">Legitimate Uses:</strong> Processing necessary for performing a contract (e.g., property transaction), compliance with law, or responding to a medical emergency.</li>
                            <li><strong className="text-[#1A1714]">Legal Obligation:</strong> Data processing mandated by RERA, Income Tax Act, FEMA (for NRI transactions), or court orders.</li>
                        </ul>
                    </section>

                    {/* 4. Data Sharing & Disclosure */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">4. Data Sharing & Disclosure</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">We do not sell, rent, or trade your personal data. We may share your information with:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li><strong className="text-[#1A1714]">Property Developers & Builders:</strong> To facilitate enquiries and site visits for properties you have expressed interest in.</li>
                            <li><strong className="text-[#1A1714]">Legal & Documentation Partners:</strong> Advocates, registrars, and RERA-registered professionals involved in your transaction.</li>
                            <li><strong className="text-[#1A1714]">Financial Partners:</strong> Banks, loan providers, and payment processors, only when you initiate a financial transaction.</li>
                            <li><strong className="text-[#1A1714]">Government Authorities:</strong> When required by law, including MahaRERA, Income Tax Department, and courts of competent jurisdiction.</li>
                            <li><strong className="text-[#1A1714]">Service Providers:</strong> Website hosting (Vercel), analytics (Google Analytics), email delivery services — all bound by data processing agreements.</li>
                        </ul>
                    </section>

                    {/* 5. Data Retention */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">5. Data Retention</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            We retain personal data only for as long as necessary to fulfil the purposes described in this policy, or as required by law. Specifically:
                        </p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li><strong className="text-[#1A1714]">Enquiry data:</strong> Retained for up to 3 years from the date of last engagement, unless you request earlier deletion.</li>
                            <li><strong className="text-[#1A1714]">Transaction records:</strong> Retained for a minimum of 8 years as mandated by the Income Tax Act and RERA regulations.</li>
                            <li><strong className="text-[#1A1714]">Marketing consents:</strong> Until you withdraw consent or unsubscribe.</li>
                            <li><strong className="text-[#1A1714]">Website analytics:</strong> Anonymised and aggregated data retained indefinitely; identifiable data deleted after 26 months.</li>
                        </ul>
                    </section>

                    {/* 6. Data Security */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">6. Data Security</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            We implement reasonable security practices and procedures as mandated under the SPDI Rules, 2011, including:
                        </p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>SSL/TLS encryption for all data transmitted over the internet</li>
                            <li>Access controls limiting data access to authorised personnel only</li>
                            <li>Secure storage of physical documents in locked facilities</li>
                            <li>Regular security reviews of our digital infrastructure</li>
                            <li>Incident response procedures for data breaches, including mandatory reporting to the Data Protection Board of India within 72 hours as required under the DPDPA, 2023</li>
                        </ul>
                        <p className="text-[#7A7268] text-sm leading-relaxed mt-3">
                            While we strive to protect your data, no method of transmission or electronic storage is 100% secure. We encourage you to exercise caution when sharing personal information online.
                        </p>
                    </section>

                    {/* 7. Cookies & Tracking */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">7. Cookies & Tracking Technologies</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">Our website uses cookies and similar technologies to:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li><strong className="text-[#1A1714]">Essential cookies:</strong> Required for the website to function (session management, authentication).</li>
                            <li><strong className="text-[#1A1714]">Analytics cookies:</strong> To understand website usage patterns and improve our services (Google Analytics).</li>
                            <li><strong className="text-[#1A1714]">Marketing cookies:</strong> To deliver relevant advertisements and measure their effectiveness (with consent).</li>
                        </ul>
                        <p className="text-[#7A7268] text-sm leading-relaxed mt-3">
                            You can manage cookie preferences through your browser settings. Disabling essential cookies may affect website functionality.
                        </p>
                    </section>

                    {/* 8. Third-Party Links */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">8. Third-Party Links</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Our website may contain links to third-party websites, including WhatsApp (Meta Platforms Inc.), Google Maps, LinkedIn, and partner developer websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before sharing any personal data.
                        </p>
                    </section>

                    {/* 9. Your Rights (DPDPA 2023) */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">9. Your Rights Under DPDPA 2023</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">As a Data Principal, you have the following rights:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li><strong className="text-[#1A1714]">Right to Access:</strong> Request a summary of your personal data processed by us and the processing activities undertaken.</li>
                            <li><strong className="text-[#1A1714]">Right to Correction:</strong> Request correction of inaccurate or incomplete personal data.</li>
                            <li><strong className="text-[#1A1714]">Right to Erasure:</strong> Request deletion of personal data that is no longer necessary for the purpose it was collected, subject to legal retention requirements.</li>
                            <li><strong className="text-[#1A1714]">Right to Withdraw Consent:</strong> Withdraw your consent for data processing at any time. Withdrawal does not affect the lawfulness of processing done prior to withdrawal.</li>
                            <li><strong className="text-[#1A1714]">Right to Grievance Redressal:</strong> Lodge complaints with our Grievance Officer (see Section 12) or the Data Protection Board of India.</li>
                            <li><strong className="text-[#1A1714]">Right to Nominate:</strong> Nominate another person to exercise your rights in the event of your death or incapacity.</li>
                        </ul>
                        <p className="text-[#7A7268] text-sm leading-relaxed mt-3">
                            To exercise any of these rights, please contact us at <strong className="text-[#C9A96E]">info@aurevonrealty.in</strong>.
                        </p>
                    </section>

                    {/* 10. Children's Privacy */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">10. Children&apos;s Privacy</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal data from children. If we become aware that a child under 18 has provided us with personal data, we will take steps to delete such information immediately. In compliance with the DPDPA 2023, processing of children&apos;s data requires verifiable parental consent.
                        </p>
                    </section>

                    {/* 11. Cross-Border Data Transfers */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">11. Cross-Border Data Transfers</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Your data may be processed by service providers located outside India (e.g., cloud hosting and analytics providers). Under the DPDPA 2023, cross-border transfers of personal data are permitted to countries not restricted by the Central Government. We ensure all international transfers comply with applicable data protection laws and that appropriate safeguards are in place.
                        </p>
                    </section>

                    {/* 12. Grievance Officer */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">12. Grievance Officer</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            In accordance with the Information Technology Act, 2000 and rules made thereunder, and the DPDPA 2023, the details of the Grievance Officer are:
                        </p>
                        <div className="bg-white border border-[#D9D0C0] rounded p-6 mt-4 text-sm">
                            <p className="text-[#1A1714] font-medium">Arun Dongare</p>
                            <p className="text-[#7A7268]">Designation: Grievance Officer & Data Protection Officer</p>
                            <p className="text-[#7A7268]">Email: <a href="mailto:info@aurevonrealty.in" className="text-[#C9A96E] hover:underline">info@aurevonrealty.in</a></p>
                            <p className="text-[#7A7268]">Phone: <a href="tel:+919767446655" className="text-[#C9A96E] hover:underline">+91 9767 446 655</a></p>
                            <p className="text-[#7A7268]">Address: Pune, Maharashtra, India</p>
                            <p className="text-[#7A7268] mt-2">Response time: Within 30 days of receiving your request.</p>
                        </div>
                    </section>

                    {/* 13. Changes to Policy */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">13. Changes to This Policy</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. Any material changes will be communicated via our website. The &quot;Last Updated&quot; date at the top of this page indicates when the policy was last revised. Continued use of our website after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* 14. Governing Law */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">14. Governing Law & Jurisdiction</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising under this policy shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
                        </p>
                    </section>

                    {/* 15. Contact */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">15. Contact Us</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
                        <div className="bg-white border border-[#D9D0C0] rounded p-6 mt-4 text-sm">
                            <p className="text-[#1A1714] font-medium">Aurevon Realty Pvt. Ltd.</p>
                            <p className="text-[#7A7268]">Email: <a href="mailto:info@aurevonrealty.in" className="text-[#C9A96E] hover:underline">info@aurevonrealty.in</a></p>
                            <p className="text-[#7A7268]">Phone: <a href="tel:+919767446655" className="text-[#C9A96E] hover:underline">+91 9767 446 655</a></p>
                            <p className="text-[#7A7268]">Pune, Maharashtra, India</p>
                        </div>
                    </section>

                </div>
            </div>

            {/* Footer Bar */}
            <div className="bg-[#0D0B09] border-t border-[#2E2A25] py-8">
                <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#7A7268] text-xs font-sans">© {new Date().getFullYear()} Aurevon Realty Pvt. Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="text-[#C9A96E] text-xs font-sans hover:text-[#F5F0E8] transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-[#7A7268] text-xs font-sans hover:text-[#C9A96E] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
