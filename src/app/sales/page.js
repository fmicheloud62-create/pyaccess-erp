"use client";

import { useEffect, useState } from "react";

import {
  getProducts,
  saveProducts,
} from "../../lib/storage";

import {
  getSales,
  saveSales,
} from "../../lib/salesStorage";

import { exportSalePDF } from "../../lib/pdfExport";

export default function Sales() {

  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [sales, setSales] =
    useState([]);

  useEffect(() => {

    setProducts(getProducts());

    setSales(getSales());

  }, []);

  function addToCart(product) {

    if (
      Number(product.stock) <= 0
    )
      return;

    const exists = cart.find(
      (item) =>
        item.id === product.id
    );

    if (exists) {

      const updated = cart.map(
        (item) =>

          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
      );

      setCart(updated);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  function removeFromCart(id) {

    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  }

  const total = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.price) *
        item.quantity,
    0
  );

  function finishSale() {

    if (cart.length === 0)
      return;

    const updatedProducts =
      products.map((product) => {

        const sold =
          cart.find(
            (item) =>
              item.id === product.id
          );

        if (sold) {

          return {
            ...product,
            stock:
              Number(product.stock) -
              sold.quantity,
          };
        }

        return product;
      });

    saveProducts(updatedProducts);

    setProducts(updatedProducts);

    const sale = {
      id: Date.now(),
      items: cart,
      total,
      date:
        new Date().toLocaleString(),
    };

    const updatedSales = [
      ...sales,
      sale,
    ];

    saveSales(updatedSales);

    setSales(updatedSales);

    exportSalePDF(sale);

    setCart([]);

    alert("Venta realizada");
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Ventas POS
      </h1>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">

        {/* PRODUCTOS */}

        <div className="bg-white rounded-3xl shadow p-5">

          <h2 className="text-2xl font-bold mb-5">
            Productos
          </h2>

          <div className="grid gap-3">

            {products.map((product) => (

              <div
                key={product.id}
                className="border rounded-2xl p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">
                    {product.name}
                  </h3>

                  <p>
                    ${product.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock:
                    {" "}
                    {product.stock}
                  </p>

                </div>

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                  Agregar
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* CARRITO */}

        <div>

          <div className="bg-white rounded-3xl shadow p-5 mb-6">

            <h2 className="text-2xl font-bold mb-5">
              Ticket
            </h2>

            <div className="grid gap-3">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="border rounded-2xl p-4 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p>
                      {item.quantity} x $
                      {item.price}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl"
                  >
                    Quitar
                  </button>

                </div>

              ))}

            </div>

            <div className="mt-6 border-t pt-5">

              <h2 className="text-4xl font-bold">
                ${total}
              </h2>

              <button
                onClick={finishSale}
                className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold"
              >
                Finalizar Venta
              </button>

            </div>

          </div>

          {/* HISTORIAL */}

          <div className="bg-white rounded-3xl shadow p-5">

            <h2 className="text-2xl font-bold mb-5">
              Historial
            </h2>

            <div className="grid gap-3">

              {sales
                .slice()
                .reverse()
                .map((sale) => (

                  <div
                    key={sale.id}
                    className="border rounded-2xl p-4"
                  >

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        Ticket #{sale.id}
                      </h3>

                      <p className="font-bold text-green-600">
                        ${sale.total}
                      </p>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {sale.date}
                    </p>

                    <button
                      onClick={() =>
                        exportSalePDF(
                          sale
                        )
                      }
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                    >
                      Exportar PDF
                    </button>

                  </div>

                ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}