import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to NexBiz</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Advanced inventory management for shops: Track products, sales,
          customers, and more.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Product Management</h3>
            <p>Add, categorize, and track inventory with ease.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Sales & Billing</h3>
            <p>Barcode scanning, discounts, payments, and bill printing.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p>Summaries, charts for sales, profits, and trends.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Customer & Dealer Management
            </h3>
            <p>Track dues, histories, and payments.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Roles & Security</h3>
            <p>Admin and Manager roles with permissions.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Notifications & UI</h3>
            <p>Toast alerts, modern design, easy navigation.</p>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            How to Use NexBiz
          </h2>
          <ol className="list-decimal space-y-4 max-w-3xl mx-auto">
            <li>Login as Admin or Manager.</li>
            <li>Add products, categories, and customers.</li>
            <li>Make sales with barcode scan and print bills.</li>
            <li>View summaries and charts for insights.</li>
            <li>Manage dealers and payments.</li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Streamline Your Shop?
        </h2>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
        >
          Use Software Now
        </Link>
      </section>
    </div>
  );
}
