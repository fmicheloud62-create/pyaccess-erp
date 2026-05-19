export default function StatCard({
  title,
  value,
}) {

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:scale-[1.03] transition duration-300 border border-gray-100">

      <h2 className="text-gray-500 text-sm">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>

    </div>
  );
}