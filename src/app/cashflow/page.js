"use client";

import {
  useEffect,
  useState,
} from "react";

export default function Cashflow() {

  const [cashflow, setCashflow] =
    useState([]);

  const [form, setForm] =
    useState({
      type: "Ingreso",
      description: "",
      amount: "",
    });

  async function loadCashflow() {

    const response =
      await fetch(
        "/api/cashflow"
      );

    const data =
      await response.json();

    setCashflow(data);
  }

  useEffect(() => {

    loadCashflow();

  }, []);

  async function saveMovement() {

    await fetch(
      "/api/cashflow",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          ...form,
          date:
            new Date().toLocaleString(),
        }),
      }
    );

    setForm({
      type: "Ingreso",
      description: "",
      amount: "",
    });

    loadCashflow();
  }

  const total = cashflow.reduce(
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
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Caja
      </h1>

      <div className="bg-white rounded-3xl shadow p-6 mb-8">

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">

          <select
            className="border p-3 rounded-2xl"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type:
                  e.target.value,
              })
            }
          >

            <option>
              Ingreso
            </option>

            <option>
              Gasto
            </option>

          </select>

          <input
            placeholder="Descripción"
            className="border p-3 rounded-2xl"
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Monto"
            className="border p-3 rounded-2xl"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={saveMovement}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
        >
          Guardar Movimiento
        </button>

      </div>

      {/* TOTAL */}

      <div className="bg-green-600 text-white rounded-3xl p-8 mb-8 shadow">

        <h2 className="text-xl">
          Balance Total
        </h2>

        <p className="text-5xl font-bold mt-3">
          ${total}
        </p>

      </div>

      {/* MOVEMENTS */}

      <div className="grid gap-4">

        {cashflow
          .slice()
          .reverse()
          .map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow p-5 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold text-xl">
                  {
                    item.description
                  }
                </h2>

                <p className="text-gray-500">
                  {item.date}
                </p>

              </div>

              <div
                className={`text-2xl font-bold ${
                  item.type ===
                  "Ingreso"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {item.type ===
                "Ingreso"
                  ? "+"
                  : "-"}

                ${item.amount}

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}