"use client";

export default function PurchaseList() {
  const purchases = [
    {
      id: "PO-991",
      supplier: "Fashion Dealer BD",
      total: "45,000",
      date: "2024-03-10",
      items: "50 Units",
    },
    {
      id: "PO-992",
      supplier: "Arif Fabrics",
      total: "12,800",
      date: "2024-03-12",
      items: "15 Units",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-slate-900 p-8 rounded-[40px] text-white">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter">
              PURCHASE <span className="text-blue-400">LEDGER</span>
            </h1>
            <p className="opacity-60 text-sm">Inventory Procurement History</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-2xl font-bold transition">
            + NEW PURCHASE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-[30px] shadow-lg border border-slate-100 hover:border-blue-300 transition-all"
            >
              <p className="text-blue-500 font-black text-xs mb-2">
                REF: {p.id}
              </p>
              <h3 className="text-slate-800 font-bold text-lg leading-tight mb-4">
                {p.supplier}
              </h3>
              <div className="flex justify-between items-end border-t pt-4">
                <p className="text-slate-400 text-[10px] font-bold uppercase">
                  {p.date}
                </p>
                <p className="text-xl font-black text-slate-900">৳ {p.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
