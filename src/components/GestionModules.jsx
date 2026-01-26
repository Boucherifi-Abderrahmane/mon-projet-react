import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function GestionModules() {

  const [modules, setModules] = useState([]);
  const [nom, setNom] = useState("");
  const [coefficient, setCoefficient] = useState("");
  const [search, setSearch] = useState("");

  /* =======================
     CHARGER LES MODULES
  ======================= */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/modules")
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => console.error("Erreur chargement modules :", err));
  }, []);

  /* =======================
     AJOUTER MODULE
  ======================= */
  const ajouter = async () => {
    if (!nom || !coefficient) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          nom,
          coefficient: Number(coefficient)
        })
      });

      const nouveauModule = await res.json();
      if (!res.ok) {
        console.error(nouveauModule);
        alert("Erreur lors de l'ajout");
        return;
      }

      setModules(prev => [...prev, nouveauModule]);
      setNom("");
      setCoefficient("");

    } catch (err) {
      console.error("Erreur ajout module :", err);
    }
  };

  /* =======================
     SUPPRIMER MODULE
  ======================= */
  const supprimer = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/modules/${id}`, {
        method: "DELETE"
      });
      setModules(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  /* =======================
     IMPORT EXCEL
  ======================= */
  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      for (const row of data) {
        if (!row.nom || !row.coefficient) continue;

        try {
          const res = await fetch("http://127.0.0.1:8000/api/modules", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              nom: row.nom,
              coefficient: Number(row.coefficient)
            })
          });

          const module = await res.json();
          if (res.ok) {
            setModules(prev => [...prev, module]);
          }

        } catch (err) {
          console.error("Erreur import Excel :", err);
        }
      }
    };

    reader.readAsArrayBuffer(fichier);
  };

  /* =======================
     FILTRE
  ======================= */
  const visibles = modules.filter(m =>
    m.nom.toLowerCase().includes(search.toLowerCase())
  );

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="card">
      <h2>Gestion des Modules</h2>

      <div className="form-row">
        <input
          placeholder="Nom du module"
          value={nom}
          onChange={e => setNom(e.target.value)}
        />

        <input
          type="number"
          placeholder="Coefficient"
          value={coefficient}
          onChange={e => setCoefficient(e.target.value)}
        />

        <button onClick={ajouter}>Ajouter</button>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={importerExcel}
        />
      </div>

      <div className="filter-row">
        <input
          placeholder="Rechercher un module"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Coefficient</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visibles.length === 0 ? (
            <tr>
              <td colSpan="3">Aucun module</td>
            </tr>
          ) : (
            visibles.map(m => (
              <tr key={m.id}>
                <td>{m.nom}</td>
                <td>{m.coefficient}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => supprimer(m.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
