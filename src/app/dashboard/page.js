"use client";

import {
  useEffect,
  useState,
} from "react";

import ProtectedRoute from "../../components/auth/ProtectedRoute";

import SalesChart from "../../components/dashboard/SalesChart";

export default function Dashboard() {

  const [sales, setSales] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [cashflow, setCashflow] =
    useState([]);

  async function loadData() {

    const salesRes =
      await fetch("/api/sales");

    const salesData =
      await salesRes.json();

    setSales(salesData);

    const productsRes =
      await fetch(
        "/api/products"
      );

    const productsData =
      await productsRes.json();

    setProducts(productsData);

    const cashRes =
      await fetch(
        "/api/cashflow"
      );

    const cashData =
      await cashRes.json();

    setCashflow(cashData);
  }

  useEffect(() => {

    loadData();

  }, []);

  const revenue =
    sales.reduce(
      (acc, sale) =>
        acc +
        Number(sale.total || 0),
      0
    );

  const balance =
    cashflow.reduce(
      (acc, item) => {

        if (
          item.type ===
          "Ingreso"
        ) {

          return (
            acc +
            Number(item.amount)
          );
        }

        return (
          acc -
          Number(item.amount)
        );
      },
      0
    );

  return (
    <ProtectedRoute>

      <div>

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {/* KPI */}

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mb-8">

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-gray-500">
              Productos
            </h2>

            <p className="text-4xl font-bold mt-3">
              {products.length}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-gray-500">
              Ventas
            </h2>

            <p className="text-4xl font-bold mt-3">
              {sales.length}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-gray-500">
              Facturación
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-600">
              ${revenue}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-gray-500">
              Balance
            </h2>

            <p className="text-4xl font-bold mt-3 text-blue-600">
              ${balance}
            </p>

          </div>

        </div>

        {/* CHART */}

        <SalesChart
          sales={sales}
        />

      </div>

    </ProtectedRoute>
  );
}