//import { useState  } from "react";
import React, { useState } from "react";
import "./Admine.css"; // adapte le chemin si besoin (ici admine.css à la racine src)
import GestionEtudiants from "../components/admin/GestionEtudiants";
import GestionEnseignants from "../components/admin/GestionEnseignants";
import GestionModules from "../components/GestionModules";
import GestionSalles from "../components/admin/GestionSalles";
import GestionEmploisDuTemps from "../components/admin/GestionEmploisDuTemps";
import GestionExamens from "../components/admin/GestionExamens";
export default function Admine() {
  const [page, setPage] = useState("etudiants");

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">Admin</div>
        <nav>
          <button className="side-btn" onClick={() => setPage("etudiants")}>Étudiants</button>
          <button className="side-btn" onClick={() => setPage("enseignants")}>Enseignants</button>
          <button className="side-btn" onClick={() => setPage("modules")}>Modules</button>
          <button className="side-btn" onClick={() => setPage("salles")}>Salles</button>
          <button className="side-btn" onClick={() => setPage("emploi")}>Emploi du temps</button>
          <button className="side-btn" onClick={() => setPage("examens")}>
  Examens
</button>

        </nav>
      </aside>

      {/* CONTENU */}
      <main className="content">
        {page === "etudiants" && <GestionEtudiants />}
        {page === "enseignants" && <GestionEnseignants />}
        {page === "modules" && <GestionModules />}
        {page === "salles" && <GestionSalles />}
        {page === "emploi" && (
          <GestionEmploisDuTemps />
        )}
         {page === "examens" && <GestionExamens />
}
      </main>
    </div>
  );
}



    