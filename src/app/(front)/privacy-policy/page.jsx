// src/app/privacy-policy/page.jsx

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#e6ecf4] min-h-screen py-6 px-4 flex justify-center">
      <div className="bg-white max-w-[480px] w-full p-6 rounded-2xl shadow-md space-y-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-blue-600">Privacy & Policy</h1>

        {/* Section: Information We Collect */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Information We Collect</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We collect information you provide during registration, participation in giveaways, or when contacting support.
            This includes your name, email address, phone number, and device information.
          </p>
        </section>

        {/* Section: How We Use Your Information */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your information is used to operate our giveaways, personalize your experience, send updates, process payments,
            and improve our platform’s functionality.
          </p>
        </section>

        {/* Section: Data Security */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We implement strict security measures to protect your personal data. While we strive to ensure safety, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        {/* Section: Cookies and Tracking */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Cookies and Tracking</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We use cookies and tracking tools to analyze user behavior, enhance performance, and deliver personalized content. You may disable cookies in your browser settings.
          </p>
        </section>

        {/* Section: Third-Party Services */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Third-Party Services</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We may share limited data with trusted third-party tools for analytics, marketing, and payment processing. These providers are required to protect your data.
          </p>
        </section>

        {/* Section: Data Retention */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Retention</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We retain your information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law.
          </p>
        </section>

        {/* Section: User Rights */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">User Rights</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            You have the right to access, update, or delete your personal information. To exercise these rights, please contact us directly.
          </p>
        </section>

        {/* Section: Changes to This Policy */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Changes to This Policy</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We may update this privacy policy periodically. Any changes will be posted here with a revised effective date.
          </p>
        </section>

        {/* Section: Contact Us */}
        <section className="pt-4 border-t">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-sm text-gray-700">
            For questions or concerns about this policy, please contact us at:{" "}
            <span className="text-blue-600 font-medium">support@Bindaas.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
