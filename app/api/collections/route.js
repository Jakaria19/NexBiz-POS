let collections = [];
let id = 1;

export async function GET() {
  return new Response(JSON.stringify(collections), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  collections.push({ id: id++, ...data });
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
