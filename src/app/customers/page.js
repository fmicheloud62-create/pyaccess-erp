"use client";

import {
  useEffect,
  useState,
} from "react";

export default function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
      address: "",
    });

  async function loadCustomers() {

    const response =
      await fetch(
        "/api/customers"
      );

    const data =
      await response.json();

    setCustomers(data);
  }

  useEffect(() => {

    loadCustomers();

  }, []);

  async function saveCustomer() {

    await fetch(
      "/api/customers",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          form
        ),
      }
    );

    setForm({
      name: "",
      phone: "",
      address: "",
    });

    loadCustomers();
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Clientes
      </h1>

      {/* FORM */}

      <div className="bg-white rounded-3xl shadow p-6 mb-8">

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">

          <input
            placeholder="Nombre"
            className="border p-3 rounded-2xl"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Teléfono"
            className="border p-3 rounded-2xl"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Dirección"
            className="border p-3 rounded-2xl"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={saveCustomer}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
        >
          Guardar Cliente
        </button>

      </div>

      {/* CLIENTES */}

      <div className="grid gap-4">

        {customers.map(
          (customer) => (

            <div
              key={customer.id}
              className="bg-white rounded-3xl shadow p-5"
            >

              <h2 className="font-bold text-xl">
                {customer.name}
              </h2>

              <p>
                {customer.phone}
              </p>

              <p className="text-gray-500">
                {customer.address}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}