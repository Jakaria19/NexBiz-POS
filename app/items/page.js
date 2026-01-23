import Link from "next/link";

export default async function ItemsPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6",
  );
  const items = await res.json();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Our Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img
              src={`https://picsum.photos/seed/${item.id}/300/200`}
              alt="product"
              className="w-full mb-2"
            />
            <h2 className="font-bold text-xl">{item.title.slice(0, 20)}</h2>
            <p className="text-gray-500">$99.99</p>
            <Link
              href={`/items/${item.id}`}
              className="text-blue-600 mt-2 block"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
