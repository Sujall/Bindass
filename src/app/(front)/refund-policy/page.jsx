// src/app/refund-policy/page.jsx
export default function RefundPolicy() {
  return (
    <div className="max-w-[480px] w-full mx-auto p-6 bg-[#e6ecf4] min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-3">Refund Policy</h1>
        
        <div className="space-y-5 text-gray-700">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">1. Eligibility for Refunds</h2>
            <p className="text-sm leading-relaxed">
              To be eligible for a refund, you must request it within 14 days of your purchase. 
              The product or service must be unused and in the same condition as you received it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">2. Non-Refundable Items</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Digital products that have been downloaded or accessed</li>
              <li>Services that have already been performed</li>
              <li>Gift cards or promotional items</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">3. Refund Process</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Submit a refund request through our contact form</li>
              <li>Wait for our team to review your request (1-3 business days)</li>
              <li>If approved, refund will be processed to your original payment method</li>
              <li>Allow 5-10 business days for the refund to reflect in your account</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">4. Late or Missing Refunds</h2>
            <p className="text-sm leading-relaxed">
              If you haven't received your refund within 10 business days, first check with your bank. 
              Then contact your credit card company as it may take time before the refund is posted. 
              If you still haven't received your refund, please contact us at support@binadda.com.
            </p>
          </section>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mt-6">
            <h3 className="font-medium text-blue-700 mb-2">Need Help?</h3>
            <p className="text-sm text-blue-600">
              Contact our support team at <span className="font-medium">support@binadda.com</span> 
              or call <span className="font-medium">+91 7788994455</span> for any refund-related queries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}