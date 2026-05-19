"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import {
  logout,
  getSession,
} from "../../lib/authStorage";

export default function Sidebar() {

  const [open, setOpen] =
    useState(false);

  const session =
    getSession();

  function handleLogout() {

    logout();

    window.location.href = "/";
  }

  const menus = [

    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Productos",
      href: "/products",
      icon: Package,
    },

    {
      name: "Ventas",
      href: "/sales",
      icon: ShoppingCart,
    },

    {
      name: "Clientes",
      href: "/customers",
      icon: Users,
    },

    {
      name: "Caja",
      href: "/cashflow",
      icon: Wallet,
    },

    {
      name: "Reportes",
      href: "/reports",
      icon: BarChart3,
    },

    {
      name: "Configuración",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>

      {/* MOBILE BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed top-5 left-5 z-50 bg-gray-900 text-white p-3 rounded-xl lg:hidden"
      >

        {open ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}

      </button>

      {/* SIDEBAR */}

      <aside
        className={`fixed lg:relative z-40 h-screen bg-gray-950 text-white w-64 p-5 transition-all duration-300 ${
          open
            ? "left-0"
            : "-left-64 lg:left-0"
        }`}
      >

        <h1 className="text-3xl font-bold mb-10">
          PyAccess
        </h1>

        {session && (

          <div className="bg-gray-800 rounded-2xl p-4 mb-8">

            <p className="font-bold">
              {session.username}
            </p>

            <p className="text-sm text-gray-400">
              {session.role}
            </p>

          </div>

        )}

        <nav className="flex flex-col gap-3">

          {menus.map((menu) => {

            const Icon =
              menu.icon;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
              >

                <Icon size={20} />

                {menu.name}

              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 transition mt-5"
          >

            <LogOut size={20} />

            Cerrar sesión

          </button>

        </nav>

      </aside>

    </>
  );
}