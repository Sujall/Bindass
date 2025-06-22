// app/about/page.jsx

export default function AboutPage() {
  return (
    <div className="bg-[#e6ecf4] min-h-screen py-6 px-4 flex justify-center">
      <div className="bg-white max-w-[480px] w-full p-6 rounded-2xl shadow-md space-y-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-blue-600">About Bindaas</h1>

        {/* Section: Welcome */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Welcome to Bindaas
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Bindaas is your trusted platform for giveaways, promotions, and
            exclusive opportunities. We connect brands with users in fun,
            rewarding ways — bringing excitement to your inbox and feeds.
          </p>
        </section>

        {/* Section: Our Mission */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Our Mission
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Our mission is simple — to empower users to win exciting prizes
            while helping businesses grow their communities through transparent
            and fair giveaway experiences.
          </p>
        </section>

        {/* Section: Why Choose Bindaas? */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Why Choose Bindaas?
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Verified and fair giveaways</li>
            <li>User-friendly and mobile-optimized experience</li>
            <li>Safe, secure, and privacy-first</li>
            <li>Dedicated support and fast communication</li>
          </ul>
        </section>

        {/* Section: How Bindaas Works */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            How Bindaas Works
          </h2>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
            <li>Browse available giveaways on the homepage</li>
            <li>Follow the steps to participate (e.g., follow, tag, share)</li>
            <li>Wait for the giveaway draw date</li>
            <li>Winners are contacted and announced transparently</li>
          </ol>
        </section>

        {/* Section: Contact Us */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Have questions or need support? Reach out to our team at:
            <br />
            <span className="text-blue-600 font-medium">
              support@Bindaas.com
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
