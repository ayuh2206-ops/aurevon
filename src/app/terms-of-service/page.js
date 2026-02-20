import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service — Aurevon Realty Pvt. Ltd.',
    description: 'Terms of Service governing the use of Aurevon Realty website and services, compliant with Indian consumer protection, IT, and RERA regulations.',
};

export default function TermsOfServicePage() {
    const lastUpdated = '20 February 2026';
    return (
        <div className="min-h-screen bg-[#F5F0E8]">
            {/* Header */}
            <div className="bg-[#0D0B09] border-b border-[#2E2A25]">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <Link href="/" className="text-[#C9A96E] font-sans text-sm hover:text-[#F5F0E8] transition-colors mb-6 inline-block">← Back to Home</Link>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-3">Terms of Service</h1>
                    <p className="font-sans text-sm text-[#7A7268]">Last updated: {lastUpdated}</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="prose prose-lg max-w-none" style={{ fontFamily: "'Inter', sans-serif" }}>

                    {/* Introduction */}
                    <section className="mb-12">
                        <p className="text-[#7A7268] leading-relaxed text-sm">
                            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website, services, and platforms operated by <strong className="text-[#1A1714]">Aurevon Realty Pvt. Ltd.</strong> (&quot;Aurevon Realty&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company incorporated under the Companies Act, 2013, and registered with the <strong className="text-[#1A1714]">Real Estate Regulatory Authority (RERA)</strong> under the Real Estate (Regulation and Development) Act, 2016.
                        </p>
                        <p className="text-[#7A7268] leading-relaxed text-sm mt-4">
                            By accessing or using our website and services, you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
                        </p>
                    </section>

                    {/* 1. Definitions */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">1. Definitions</h2>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-2 mt-2">
                            <li><strong className="text-[#1A1714]">&quot;Website&quot;</strong> refers to the website located at aurevonrealty.in and all associated sub-domains and pages.</li>
                            <li><strong className="text-[#1A1714]">&quot;Services&quot;</strong> include commercial real estate advisory, property listing, NRI investment consultancy, yield analysis, documentation assistance, and post-sale management provided by Aurevon Realty.</li>
                            <li><strong className="text-[#1A1714]">&quot;Property Listings&quot;</strong> refers to information about commercial properties displayed on our website, including but not limited to office spaces, retail shops, co-working spaces, IT parks, and warehouses.</li>
                            <li><strong className="text-[#1A1714]">&quot;RERA&quot;</strong> refers to the Real Estate (Regulation and Development) Act, 2016 and rules framed thereunder, including MahaRERA regulations for the State of Maharashtra.</li>
                        </ul>
                    </section>

                    {/* 2. Eligibility */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">2. Eligibility</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">By using our services, you represent and warrant that:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>You are at least 18 years of age and have the legal capacity to enter into binding agreements under the Indian Contract Act, 1872.</li>
                            <li>If you are a Non-Resident Indian (NRI) or Person of Indian Origin (PIO), you are eligible to purchase immovable property in India under the Foreign Exchange Management Act (FEMA), 1999 and applicable RBI circulars.</li>
                            <li>You are not prohibited from using our services under any applicable law.</li>
                        </ul>
                    </section>

                    {/* 3. Nature of Services */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">3. Nature of Services</h2>
                        <h3 className="font-serif text-lg text-[#1A1714] mt-6 mb-2">3.1 Advisory Role</h3>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Aurevon Realty acts as a <strong className="text-[#1A1714]">real estate advisory and brokerage firm</strong>. We facilitate connections between property buyers/investors and developers/sellers. We are not the owner, developer, or builder of any property listed on our website unless explicitly stated otherwise.
                        </p>

                        <h3 className="font-serif text-lg text-[#1A1714] mt-6 mb-2">3.2 RERA Compliance</h3>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            We are registered as a real estate agent under the Real Estate (Regulation and Development) Act, 2016. All property listings on our website are intended to comply with RERA guidelines. We endeavour to ensure that only RERA-registered projects are listed. However, users are advised to independently verify the RERA registration status of any project before making investment decisions.
                        </p>

                        <h3 className="font-serif text-lg text-[#1A1714] mt-6 mb-2">3.3 No Investment Advice</h3>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Information provided on our website, including yield projections, price estimates, and market analyses, is for informational purposes only and does not constitute financial, investment, legal, or tax advice. Users should consult qualified professionals before making investment decisions. Past performance and projected yields are not guarantees of future results.
                        </p>
                    </section>

                    {/* 4. Property Listings */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">4. Property Listings & Information Accuracy</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">We take reasonable care to ensure the accuracy of property listings displayed on our website. However:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>Property details (including but not limited to area, pricing, amenities, images, yield estimates, and possession dates) are provided by developers/sellers and are subject to change without prior notice.</li>
                            <li>Images, floor plans, and renders are indicative and may differ from actual property specifications.</li>
                            <li>Prices displayed are approximate and may not include applicable taxes, registration charges, stamp duty, GST, or other statutory charges.</li>
                            <li>Availability of units is subject to real-time changes and cannot be guaranteed at the time of enquiry.</li>
                            <li>Users must conduct independent due diligence, including physical site visits and legal verification, before committing to any transaction.</li>
                        </ul>
                    </section>

                    {/* 5. User Obligations */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">5. User Obligations</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">By using our website and services, you agree to:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>Provide accurate, current, and complete information when submitting enquiries or registering for our services.</li>
                            <li>Not use our website for any unlawful purpose or in violation of any applicable law.</li>
                            <li>Not attempt to gain unauthorised access to our systems, servers, or databases.</li>
                            <li>Not reproduce, distribute, or modify any content from our website without our prior written consent.</li>
                            <li>Not submit false, misleading, or fraudulent information.</li>
                            <li>Not use automated tools, bots, or scrapers to access or extract data from our website.</li>
                        </ul>
                    </section>

                    {/* 6. Intellectual Property */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">6. Intellectual Property Rights</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            All content on our website — including text, graphics, logos, images, videos, design elements, UI/UX, and software — is the property of Aurevon Realty Pvt. Ltd. or its licensors and is protected under the <strong className="text-[#1A1714]">Copyright Act, 1957</strong>, the <strong className="text-[#1A1714]">Trade Marks Act, 1999</strong>, and other applicable intellectual property laws of India.
                        </p>
                        <p className="text-[#7A7268] text-sm leading-relaxed mt-3">
                            The name &quot;Aurevon Realty&quot;, our logo, and our tagline are trademarks of Aurevon Realty Pvt. Ltd. Unauthorized use of any of our intellectual property is strictly prohibited and may result in legal action.
                        </p>
                    </section>

                    {/* 7. Payment & Brokerage */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">7. Payment, Brokerage & Fees</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Aurevon Realty may charge brokerage or advisory fees for services rendered. Such fees will be communicated to you in advance and are subject to applicable GST. Key terms:
                        </p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>Brokerage is typically charged as a percentage of the transaction value, as agreed upon in a separate engagement agreement.</li>
                            <li>All payments should be made through legitimate banking channels. We do not accept cash payments in excess of ₹2,00,000 as per Section 269ST of the Income Tax Act, 1961.</li>
                            <li>Any payments made to third parties (developers, legal professionals, government bodies) are between you and the respective party. Aurevon Realty is not liable for such payments.</li>
                            <li>GST and other applicable taxes will be charged as per the prevailing rates notified by the Government of India.</li>
                        </ul>
                    </section>

                    {/* 8. NRI-Specific Terms */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">8. NRI-Specific Terms</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">If you are a Non-Resident Indian (NRI) or Person of Indian Origin (PIO):</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>Property transactions must comply with the <strong className="text-[#1A1714]">Foreign Exchange Management Act (FEMA), 1999</strong> and RBI Master Directions on Acquisition and Transfer of Immovable Property in India.</li>
                            <li>You are permitted to purchase commercial property in India (except agricultural land, plantation property, or farmhouse) as per FEMA regulations.</li>
                            <li>Payments for property purchase must be made through NRE/NRO accounts or by inward remittance from abroad through authorised banking channels.</li>
                            <li>Repatriation of sale proceeds is subject to RBI regulations and may require a Chartered Accountant certificate.</li>
                            <li>Power of Attorney (POA) arrangements for registration must be executed on appropriate stamp paper and may require apostille/consulate attestation.</li>
                            <li>Tax implications, including TDS under Section 195 of the Income Tax Act, LTCG/STCG, and benefits under Double Taxation Avoidance Agreements (DTAA), should be assessed with a qualified tax professional.</li>
                        </ul>
                    </section>

                    {/* 9. Limitation of Liability */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">9. Limitation of Liability</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">To the maximum extent permitted by Indian law:</p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li>Aurevon Realty shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our website or services.</li>
                            <li>We do not guarantee the accuracy, completeness, or timeliness of property information displayed on our website.</li>
                            <li>We are not responsible for any loss arising from delayed possession, construction defects, title disputes, or developer insolvency — such matters fall under the jurisdiction of RERA and relevant consumer forums.</li>
                            <li>Our total liability for any claim shall not exceed the brokerage fees actually paid by you to Aurevon Realty for the specific transaction giving rise to the claim.</li>
                            <li>We shall not be liable for any interruption, suspension, or termination of our website or services due to technical issues, maintenance, or force majeure events.</li>
                        </ul>
                    </section>

                    {/* 10. Disclaimers */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">10. Disclaimers</h2>
                        <div className="bg-[#0D0B09] border border-[#2E2A25] rounded p-6 text-sm space-y-3">
                            <p className="text-[#F5F0E8]"><strong className="text-[#C9A96E]">RERA Disclaimer:</strong> While we endeavour to list only RERA-registered projects, it is the responsibility of the buyer to verify the RERA registration number, project details, and approvals directly on the MahaRERA website (<a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noreferrer" className="text-[#C9A96E] hover:underline">maharera.maharashtra.gov.in</a>) before making any investment.</p>
                            <p className="text-[#F5F0E8]"><strong className="text-[#C9A96E]">Yield Disclaimer:</strong> All yield percentages, ROI projections, and appreciation estimates mentioned on our website are based on historical data and market analysis. They are indicative only and are not guaranteed. Actual returns may vary based on market conditions, tenant demand, economic factors, and other variables.</p>
                            <p className="text-[#F5F0E8]"><strong className="text-[#C9A96E]">Image Disclaimer:</strong> Photographs, renderings, and virtual tours are representative in nature. Actual property may differ in appearance, specifications, and finishing from images displayed.</p>
                            <p className="text-[#F5F0E8]"><strong className="text-[#C9A96E]">Price Disclaimer:</strong> All prices are exclusive of registration charges, stamp duty, GST, statutory taxes, and other applicable charges unless explicitly stated otherwise. Prices are subject to change without prior notice.</p>
                        </div>
                    </section>

                    {/* 11. Indemnification */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">11. Indemnification</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Aurevon Realty Pvt. Ltd., its directors, officers, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from your use of our website or services, your violation of these Terms, your violation of any third-party rights, or your breach of any applicable law.
                        </p>
                    </section>

                    {/* 12. Dispute Resolution */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">12. Dispute Resolution</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            In the event of any dispute arising out of or in connection with these Terms:
                        </p>
                        <ul className="list-disc pl-6 text-[#7A7268] text-sm space-y-1 mt-2">
                            <li><strong className="text-[#1A1714]">Step 1 — Amicable Settlement:</strong> The parties shall first attempt to resolve the dispute amicably through good-faith negotiation within 30 days of a written notice.</li>
                            <li><strong className="text-[#1A1714]">Step 2 — Mediation:</strong> If amicable settlement fails, the dispute shall be referred to mediation under the Mediation Act, 2023.</li>
                            <li><strong className="text-[#1A1714]">Step 3 — Arbitration:</strong> If mediation fails, the dispute shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in Pune, Maharashtra, in the English language, by a sole arbitrator mutually agreed upon. The award shall be final and binding.</li>
                            <li><strong className="text-[#1A1714]">RERA Complaints:</strong> For disputes relating to property transactions governed by RERA, users may file complaints with the Maharashtra Real Estate Regulatory Authority (MahaRERA) under Section 31 of the RERA Act, 2016.</li>
                            <li><strong className="text-[#1A1714]">Consumer Complaints:</strong> Users retain their rights under the Consumer Protection Act, 2019 to file complaints with the appropriate Consumer Disputes Redressal Commission.</li>
                        </ul>
                    </section>

                    {/* 13. Termination */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">13. Termination</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            We reserve the right to suspend or terminate your access to our website and services, without prior notice, if you violate these Terms, engage in fraudulent activity, or if we are required to do so by law. Upon termination, your right to use the website ceases immediately, but provisions that by their nature should survive termination (including liability limitations, disclaimers, indemnification, and dispute resolution) shall remain in effect.
                        </p>
                    </section>

                    {/* 14. Force Majeure */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">14. Force Majeure</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            Aurevon Realty shall not be liable for any failure or delay in performing our obligations due to causes beyond our reasonable control, including but not limited to natural disasters, epidemics, government actions, war, civil unrest, strikes, power failures, internet disruptions, or any other force majeure event as recognised under Indian law.
                        </p>
                    </section>

                    {/* 15. Severability */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">15. Severability</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.
                        </p>
                    </section>

                    {/* 16. Governing Law */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">16. Governing Law & Jurisdiction</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of India. Subject to the dispute resolution mechanism in Section 12, the courts in <strong className="text-[#1A1714]">Pune, Maharashtra</strong> shall have exclusive jurisdiction over any legal proceedings arising from these Terms.
                        </p>
                    </section>

                    {/* 17. Changes */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">17. Changes to These Terms</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">
                            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. The &quot;Last Updated&quot; date at the top of this page indicates when these Terms were last revised. Your continued use of our website after any changes constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.
                        </p>
                    </section>

                    {/* 18. Contact */}
                    <section className="mb-10">
                        <h2 className="font-serif text-2xl text-[#1A1714] mb-4 border-b border-[#D9D0C0] pb-2">18. Contact Us</h2>
                        <p className="text-[#7A7268] text-sm leading-relaxed">For any questions, concerns, or disputes regarding these Terms, please contact us at:</p>
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
                        <Link href="/privacy-policy" className="text-[#7A7268] text-xs font-sans hover:text-[#C9A96E] transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-[#C9A96E] text-xs font-sans hover:text-[#F5F0E8] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
