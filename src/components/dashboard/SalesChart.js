"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesChart({
  sales,
}) {

  const data = sales.map(
    (sale, index) => ({
      venta: `V${index + 1}`,
      total: sale.total,
    })
  );

  return (
    <div className="bg-white rounded-3xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Rendimiento
          </h2>

          <p className="text-gray-500">
            Evolución de ventas
          </p>

        </div>

      </div>

      <div className="h-96">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="venta" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              fill="#93c5fd"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}