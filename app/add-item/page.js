export default function AddItem() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product added successfully! (Check console for data)");
    console.log("Product Data Sent to Express Server");
  };

  return (
    <div className="p-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <input placeholder="Item Name" className="border p-2" required />
        <textarea placeholder="Description" className="border p-2" required />
        <input
          type="number"
          placeholder="Price"
          className="border p-2"
          required
        />
        <button className="bg-green-600 text-white p-2 rounded">
          Submit Item
        </button>
      </form>
    </div>
  );
}
