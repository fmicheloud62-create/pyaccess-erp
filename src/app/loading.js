export default function Loading() {

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

        <h1 className="text-2xl font-bold">
          Cargando PyAccess...
        </h1>

      </div>

    </div>
  );
}