let products = [];
let id = 1;

export async function GET() {
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  products.push({ id: id++, saleQuantity: 0, stock: 0, ...data });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
