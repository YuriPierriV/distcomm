import React from "react";

export default function ApiDocumentation({ method, description }) {
  // Definir as classes dinâmicas para o fundo e a borda
  const bgColor =
    method === "GET"
      ? "bg-blue-50 border-blue-200"
      : method === "POST"
      ? "bg-green-50 border-green-200"
      : method === "PUT"
      ? "bg-yellow-50 border-yellow-200"
      : "bg-red-50 border-red-200";

  const badgeColor =
    method === "GET"
      ? "bg-blue-500 text-white"
      : method === "POST"
      ? "bg-green-500 text-white"
      : method === "PUT"
      ? "bg-yellow-500 text-white"
      : "bg-red-500 text-white";

  return (
    <div className="max-w-full">
      <div
        className={`flex items-center justify-between w-full p-4 gap-4 rounded-lg mb-3 border ${bgColor}`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm ${badgeColor}`}
          >
            {method}
          </span>
          <div className="grid grid-cols-1">
            <span className="font-mono text-gray-800">/api/topics</span>
            <span className="text-gray-600 text-sm">{description}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
