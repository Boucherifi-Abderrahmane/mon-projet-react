import React from "react";

export default function InterfaceEtudiant() {
  return (
    <div className="min-h-screen flex items-end justify-center bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full space-y-6 text-center relative">

        <h1 className="text-2xl font-bold text-gray-800">Interface Étudiant</h1>
        <p className="text-gray-600">Votre Emploie Du Temps</p>
        <div className="flex justify-center mt-10">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-xl text-lg font-semibold transition-all">
            Télécharger
          </button>
        </div>
      </div>
    </div>
  );
}
