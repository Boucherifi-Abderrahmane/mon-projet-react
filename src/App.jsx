import React from "react";

export default function InterfaceAccueil() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
      <div className="mb-10">
        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold">GESTION
            <br />EDT
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Gestion d'Emploi du Temps
      </h1>

      <button onClick={() => window.location.href = '/login' }className="bg-green-500 hover:bg-green-600 text-white py-3 px-10 rounded-xl text-lg font-semibold transition-all shadow-md">
        Entrer
      </button>
    </div>
  );
}
