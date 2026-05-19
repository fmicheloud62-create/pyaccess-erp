"use client";

import {
  useEffect,
  useState,
} from "react";

export default function Products() {

  const emptyForm = {
    name: "",
    sku: "",
    category: "",
    stock: "",
    cost: "",
    margin: "",
    price: "",
  };

  const [products, setProducts] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  async function loadProducts() {

    const response =
      await fetch(
        "/api/products"
      );

    const data =
      await response.json();

    setProducts(data);
  }

  useEffect(() => {

    loadProducts();

  }, []);

  function handleChange(e) {

    const updated = {
      ...form,
      [e.target.name]:
        e.target.value,
    };

    if (
      updated.cost &&
      updated.margin
    ) {

      updated.price = (
        Number(updated.cost) +
        (Number(updated.cost) *
          Number(
            updated.margin
          )) /
          100
      ).toFixed(2);
    }

    setForm(updated);
  }

  async function saveProduct() {

    await fetch(
      "/api/products",
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

    setForm(emptyForm);

    loadProducts();
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Productos
      </h1>

      {/* FORM */}

      <div className="bg-white rounded-3xl shadow p-6 mb-8">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">

          <input
            name="name"
            placeholder="Nombre"
            className="border p-3 rounded-2xl"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="sku"
            placeholder="SKU"
            className="border p-3 rounded-2xl"
            value={form.sku}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Categoría"
            className="border p-3 rounded-2xl"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="stock"
            placeholder="Stock"
            className="border p-3 rounded-2xl"
            value={form.stock}
            onChange={handleChange}
          />

          <input
            name="cost"
            placeholder="Costo"
            className="border p-3 rounded-2xl"
            value={form.cost}
            onChange={handleChange}
          />

          <input
            name="margin"
            placeholder="Margen"
            className="border p-3 rounded-2xl"
            value={form.margin}
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Precio"
            className="border p-3 rounded-2xl bg-gray-100"
            value={form.price}
            readOnly
          />

        </div>

        <button
          onClick={saveProduct}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
        >
          Guardar Producto
        </button>

      </div>

      {/* LISTA */}

      <div className="grid gap-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-3xl shadow p-5 flex justify-between items-center"
          >

            <div>

              <h2 className="font-bold text-xl">
                {product.name}
              </h2>

              <p className="text-gray-500">
                SKU:
                {" "}
                {product.sku}
              </p>

              <p>
                Stock:
                {" "}
                {product.stock}
              </p>

            </div>

            <div className="text-right">

              <p className="text-2xl font-bold text-green-600">
                ${product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}