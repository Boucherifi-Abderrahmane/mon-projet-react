import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function GestionEnseignants() {
  const [enseignants, setEnseignants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [module_enseigne, setModule_enseigne] = useState("");
  const [search, setSearch] = useState("");

  /* 🔹 CHARGER LES ENSEIGNANTS */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/enseignants")
      .then(res => res.json())
      .then(data => setEnseignants(data))
      .catch(err => console.error("Erreur chargement :", err));
  }, []);

  /* 🔹 AJOUTER UN ENSEIGNANT */
  const ajouter = async () => {
    if (!nom || !prenom || !module_enseigne) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/enseignants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          module_enseigne,
        }),
      });

      const nouvelEnseignant = await res.json();
      setEnseignants(prev => [...prev, nouvelEnseignant]);

      setNom("");
      setPrenom("");
      setModule_enseigne("");
    } catch (err) {
      console.error("Erreur ajout :", err);
    }
  };

  /* 🔹 SUPPRIMER UN ENSEIGNANT */
  const supprimer = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/enseignants/${id}`, {
        method: "DELETE",
      });

      setEnseignants(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  /* 🔹 IMPORT EXCEL */
  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = async (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      try {
        for (const row of data) {
          if (!row.nom || !row.prenom || !row.module_enseigne) continue;

          const res = await fetch("http://127.0.0.1:8000/api/enseignants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nom: row.nom,
              prenom: row.prenom,
              module_enseigne: row.module_enseigne,
            }),
          });

          const enseignant = await res.json();
          setEnseignants(prev => [...prev, enseignant]);
        }
      } catch (err) {
        console.error("Erreur import Excel :", err);
      }
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  /* 🔹 FILTRE */
  const visible = enseignants.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase()) ||
    e.module_enseigne.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Gestion des Enseignants</h2>

      <div className="form-row">
        <input
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
        />
        <input
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
        />
        <input
          placeholder="Module enseigné"
          value={module_enseigne}
          onChange={e => setModule_enseigne(e.target.value)}
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
          placeholder="Rechercher (nom ou module)"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Module</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr>
              <td colSpan="4">Aucun enseignant</td>
            </tr>
          ) : (
            visible.map(e => (
              <tr key={e.id}>
                <td>{e.nom}</td>
                <td>{e.prenom}</td>
                <td>{e.module_enseigne}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => supprimer(e.id)}
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
