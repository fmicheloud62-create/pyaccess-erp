"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function Home() {

  const router =
    useRouter();

  const [form, setForm] =
    useState({
      username: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  async function login() {

    setError("");

    const response =
      await fetch(
        "/api/auth/login",
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

    const data =
      await response.json();

    if (data.error) {

      setError(
        data.error
      );

      return;
    }

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "session",
      JSON.stringify(
        data.user
      )
    );

    router.push(
      "/dashboard"
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-[450px] rounded-3xl shadow-xl p-10">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold">
            PyAccess
          </h1>

          <p className="text-gray-500 mt-3">
            ERP inteligente
          </p>

        </div>

        <div className="grid gap-4">

          <input
            placeholder="Usuario"
            className="border p-4 rounded-2xl"
            value={
              form.username
            }
            onChange={(e) =>
              setForm({
                ...form,
                username:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border p-4 rounded-2xl"
            value={
              form.password
            }
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
          />

          {error && (

            <p className="text-red-500 font-bold">

              {error}

            </p>

          )}

          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg"
          >
            Ingresar
          </button>

          <div className="text-sm text-gray-500">

            admin / admin123

          </div>

        </div>

      </div>

    </div>
  );
}