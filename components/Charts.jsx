import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data, type }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
        {/* Add purchase, return if data has */}
      </LineChart>
    </ResponsiveContainer>
  );
}
