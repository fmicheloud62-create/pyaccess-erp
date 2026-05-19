import Link from "next/link";

export default function NotFound() {

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[500px]">

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <p className="text-gray-500 mt-5 text-lg">
          La página no existe
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
        >
          Volver
        </Link>

      </div>

    </div>
  );
}