// Use sales data to compute
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const type = searchParams.get("type");
  // Simulate computation from sales
  const chartData = [{ date: date, sales: 1000, profit: 500 }]; // Dummy
  return new Response(
    JSON.stringify({ chartData, totalSale: 1000, totalProfit: 500 }),
    { status: 200 }
  );
}
