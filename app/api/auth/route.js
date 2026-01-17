const users = {
  admin: { email: "admin@nexbiz.com", password: "admin123" },
  manager: { email: "manager@nexbiz.com", password: "manager123" },
};

export async function POST(req) {
  const { email, password, role } = await req.json();
  if (
    users[role] &&
    users[role].email === email &&
    users[role].password === password
  ) {
    return new Response(
      JSON.stringify({ success: true, token: "fake-token" }),
      { status: 200 }
    );
  }
  return new Response(JSON.stringify({ success: false }), { status: 401 });
}
