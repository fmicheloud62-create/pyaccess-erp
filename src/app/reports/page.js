"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  exportToExcel,
} from "../../lib/exportExcel";

export default function Reports() {

  const [sales, setSales] =
    useState([]);

  const [cashflow, setCashflow] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  async function loadData() {

    const salesRes =
      await fetch("/api/sales");

    const salesData =
      await salesRes.json();

    setSales(salesData);

    const cashRes =
      await fetch(
        "/api/cashflow"
      );

    const cashData =
      await cashRes.json();

    setCashflow(cashData);

    const prodRes =
      await fetch(
        "/api/products"
      );

    const prodData =
      await prodRes.json();

    setProducts(prodData);
  }

  useEffect(() => {

    loadData();

  }, []);

  const totalSales =
    sales.reduce(
      (acc, sale) =>
        acc +
        Number(sale.total || 0),
      0
    );

  const totalIncome =
    cashflow
      .filter(
        (c) =>
          c.type ===
          "Ingreso"
      )
      .reduce(
        (acc, c) =>
          acc +
          Number(c.amount),
        0
      );

  const totalExpenses =
    cashflow
      .filter(
        (c) =>
          c.type === "Gasto"
      )
      .reduce(
        (acc, c) =>
          acc +
          Number(c.amount),
        0
      );

  const lowStock =
    products.filter(
      (p) =>
        Number(p.stock) <= 5
    );

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Reportes
      </h1>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mb-8">

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-gray-500">
            Ventas
          </h2>

          <p className="text-4xl font-bold mt-3">
            ${totalSales}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-gray-500">
            Ingresos
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-600">
            ${totalIncome}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-gray-500">
            Gastos
          </h2>

          <p className="text-4xl font-bold mt-3 text-red-500">
            ${totalExpenses}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-gray-500">
            Balance
          </h2>

          <p className="text-4xl font-bold mt-3 text-blue-600">
            $
            {totalIncome -
              totalExpenses}
          </p>

        </div>

      </div>

      {/* EXPORT */}

      <div className="bg-white rounded-3xl shadow p-6 mb-8 flex gap-4 flex-wrap">

        <button
          onClick={() =>
            exportToExcel(
              sales,
              "ventas"
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
        >
          Exportar Ventas
        </button>

        <button
          onClick={() =>
            exportToExcel(
              products,
              "productos"
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl"
        >
          Exportar Productos
        </button>

        <button
          onClick={() =>
            exportToExcel(
              cashflow,
              "caja"
            )
          }
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl"
        >
          Exportar Caja
        </button>

      </div>

      {/* STOCK BAJO */}

      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Stock Bajo
        </h2>

        <div className="grid gap-4">

          {lowStock.map(
            (product) => (

              <div
                key={product.id}
                className="border rounded-2xl p-4 flex justify-between"
              >

                <div>

                  <h3 className="font-bold">
                    {product.name}
                  </h3>

                  <p className="text-gray-500">
                    SKU:
                    {" "}
                    {product.sku}
                  </p>

                </div>

                <div className="text-red-500 font-bold text-xl">

                  {product.stock}

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}