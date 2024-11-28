export default function Card({ title, description, actionText }) {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg shadow-blue-700 transition-shadow p-6 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors justify-end">
        {actionText}
      </button>
    </div>
  );
}
