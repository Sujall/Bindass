// src/app/terms/page.jsx

export default function Terms() {
  return (
    <div className="bg-[#e6ecf4] min-h-screen py-6 px-4 flex justify-center">
      <div className="bg-white max-w-[480px] w-full p-6 rounded-2xl shadow-md space-y-8">
        <h1 className="text-2xl font-bold text-blue-600">Terms & Conditions</h1>

        {/* Section 1 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">1. User Eligibility</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            To use Binadda, you must be at least 18 years old or the age of majority in your jurisdiction. By participating, you confirm you meet this requirement.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Giveaway Process</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Users can enter giveaways by completing the required steps. Each giveaway has specific rules and deadlines, and entries must comply to be valid.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Payment and Refunds</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Payments made for entry are final unless otherwise specified. Refunds may be processed in accordance with our Refund Policy.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Winner Selection</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Winners are chosen fairly and transparently. Selection methods vary by giveaway and may include random draws or performance-based criteria.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Fair Use Policy</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Users must not exploit, hack, or misuse the platform. Any suspicious or abusive behavior may result in account suspension or disqualification.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Intellectual Property</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            All content, logos, and materials on Binadda are owned by or licensed to us. Unauthorized use is prohibited.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Liability Limitation</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Binadda is not liable for any loss or damages resulting from your use of the platform or participation in giveaways, to the maximum extent allowed by law.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">8. Amendments</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We reserve the right to update these terms at any time. Changes will be effective once posted. Continued use of Binadda indicates acceptance.
          </p>
        </section>

        {/* Section 9 */}
        <section className="pt-4 border-t">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">9. Contact Information</h2>
          <p className="text-sm text-gray-700">
            For any questions regarding these terms, please email us at{" "}
            <span className="text-blue-600 font-medium">support@binadda.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
