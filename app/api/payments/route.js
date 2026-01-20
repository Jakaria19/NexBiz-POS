let payments = [];
let id = 1;

export async function GET() {
  return new Response(JSON.stringify(payments), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  payments.push({ id: id++, ...data });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  payments = payments.filter((p) => p.id !== id);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
