export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const type = searchParams.get("type");
  const chartData = [{ date: date, sales: 1000, profit: 500 }];
  const summary = {
    sale: 1000,
    profit: 500,
    collection: 800,
    due: 200,
    cash: 600,
    expenses: 100,
    salary: 300,
  };
  return new Response(JSON.stringify({ chartData, ...summary }), {
    status: 200,
  });
}
