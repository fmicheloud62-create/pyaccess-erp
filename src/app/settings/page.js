"use client";

import {
  useEffect,
  useState,
} from "react";

import ProtectedRoute from "../../components/auth/ProtectedRoute";

export default function Settings() {

  const [users, setUsers] =
    useState([]);

  const [form, setForm] =
    useState({
      username: "",
      password: "",
      role: "seller",
    });

  useEffect(() => {

    const savedUsers =
      JSON.parse(
        localStorage.getItem(
          "users"
        ) || "[]"
      );

    setUsers(savedUsers);

  }, []);

  function saveUsers(updated) {

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );
  }

  function addUser() {

    if (
      !form.username ||
      !form.password
    )
      return;

    const updated = [
      ...users,
      form,
    ];

    saveUsers(updated);

    setForm({
      username: "",
      password: "",
      role: "seller",
    });
  }

  function deleteUser(
    username
  ) {

    const updated =
      users.filter(
        (u) =>
          u.username !==
          username
      );

    saveUsers(updated);
  }

  return (
    <ProtectedRoute
      allowedRoles={[
        "admin",
      ]}
    >

      <div>

        <h1 className="text-4xl font-bold mb-8">
          Usuarios
        </h1>

        {/* FORM */}

        <div className="bg-white rounded-3xl shadow p-6 mb-8">

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">

            <input
              placeholder="Usuario"
              className="border p-3 rounded-2xl"
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
              placeholder="Contraseña"
              className="border p-3 rounded-2xl"
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

            <select
              className="border p-3 rounded-2xl"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role:
                    e.target.value,
                })
              }
            >

              <option value="admin">
                Admin
              </option>

              <option value="seller">
                Vendedor
              </option>

            </select>

          </div>

          <button
            onClick={addUser}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
          >
            Crear Usuario
          </button>

        </div>

        {/* USERS */}

        <div className="grid gap-4">

          {users.map((user) => (

            <div
              key={user.username}
              className="bg-white rounded-3xl shadow p-5 flex justify-between items-center"
            >

              <div>

                <h2 className="font-bold text-xl">
                  {user.username}
                </h2>

                <p className="text-gray-500">
                  {user.role}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteUser(
                    user.username
                  )
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Eliminar
              </button>

            </div>

          ))}

        </div>

      </div>

    </ProtectedRoute>
  );
}