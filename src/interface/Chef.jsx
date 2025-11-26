import React from "react";

export default function ChefDepartement() {
  return (
    <div className="min-h-screen flex items-end justify-end bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full space-y-6 relative">

        <h1 className="text-2xl font-bold text-gray-800">
          Interface Chef de Département
        </h1>

        <p className="text-gray-600">Choisissez une action :</p>
        <div className="flex justify-end space-x-4 mt-10">
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl text-lg font-semibold transition-all">
            Publier
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl text-lg font-semibold transition-all">
            Générer
          </button>
        </div>
      </div>
    </div>
  );
}
