// app/rules/page.jsx

export default function RulesPage() {
  return (
    <div className="bg-[#e6ecf4] min-h-screen py-6 px-4 flex justify-center">
      <div className="bg-white max-w-[480px] w-full p-6 rounded-2xl shadow-md space-y-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-blue-600">Official Giveaway Rules</h1>

        {/* Rule 1 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">1. Fair Participation</h2>
          <p className="text-sm text-gray-700">
            All participants must follow the stated entry requirements honestly. Any fraudulent or deceptive behavior will result in disqualification.
          </p>
        </section>

        {/* Rule 2 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">2. Winner Selection</h2>
          <p className="text-sm text-gray-700">
            Winners are chosen randomly or through specified criteria, and all results are final and verified to ensure fairness.
          </p>
        </section>

        {/* Rule 3 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">3. Entry Payments</h2>
          <p className="text-sm text-gray-700">
            Some giveaways may require small entry fees, clearly outlined beforehand. No hidden costs will ever apply.
          </p>
        </section>

        {/* Rule 4 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">4. Virtual Wallet Rules</h2>
          <p className="text-sm text-gray-700">
            All transactions made using the virtual wallet are tracked. Funds can only be used within the platform and are non-refundable unless stated otherwise.
          </p>
        </section>

        {/* Rule 5 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">5. Account Conduct</h2>
          <p className="text-sm text-gray-700">
            Participants must maintain respectful and fair conduct. Abusive language, cheating, or exploitation of the platform is strictly prohibited.
          </p>
        </section>

        {/* Rule 6 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">6. Prize Delivery</h2>
          <p className="text-sm text-gray-700">
            All prizes will be delivered digitally or physically within the timeframe mentioned in each giveaway. Delivery delays will be communicated.
          </p>
        </section>

        {/* Rule 7 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">7. Technical Disruptions</h2>
          <p className="text-sm text-gray-700">
            In the event of technical disruptions, Bindaas reserves the right to cancel, suspend, or modify the giveaway as needed.
          </p>
        </section>

        {/* Rule 8 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">8. Multiple Accounts</h2>
          <p className="text-sm text-gray-700">
            Users are only allowed one account. Multiple accounts by the same individual will lead to disqualification and potential bans.
          </p>
        </section>

        {/* Rule 9 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">9. Legal Compliance</h2>
          <p className="text-sm text-gray-700">
            All giveaways comply with local laws and platform policies. Participants are responsible for ensuring eligibility based on their region.
          </p>
        </section>

        {/* Rule 10 */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-1">10. Contact Us</h2>
          <p className="text-sm text-gray-700">
            Questions about rules or disputes? Reach us at:{" "}
            <span className="text-blue-600 font-medium">support@Bindaas.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
