let products = []; // In-memory
let id = 1;

export async function GET() {
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  products.push({ id: id++, ...data });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
