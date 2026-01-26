 import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
 export default function GestionSalles() {
  const [salles, setSalles] = useState([]);
  const [nom, setNom] = useState("");
  const [capacite, setCapacite] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [search, setSearch] = useState("");

  /* 🔹 CHARGER LES SALLES DEPUIS LARAVEL */
 useEffect(() => {
  fetch("http://127.0.0.1:8000/api/salles")
    .then(res => res.json())
    .then(data => setSalles(data))
    .catch(err => console.error(err));
}, []);

  /* 🔹 AJOUTER UNE SALLE */
  const ajouter = async () => {
    if (!nom || !capacite || !localisation) return;

    const res = await fetch("http://127.0.0.1:8000/api/salles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, capacite, localisation }),
    });

    const nouvelleSalle = await res.json();
    setSalles([...salles, nouvelleSalle]);

    setNom("");
    setCapacite("");
    setLocalisation("");
  };

  /* 🔹 SUPPRIMER UNE SALLE */
  const supprimer = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/salles/${id}`, {
      method: "DELETE",
    });

    setSalles(salles.filter(s => s.id !== id));
  };

  /* 🔹 IMPORT EXCEL → LARAVEL */
  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = async (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      for (const row of data) {
        const res = await fetch("http://127.0.0.1:8000/api/salles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: row.nom,
            capacite: row.capacite,
            localisation: row.localisation,
          }),
        });

        const salle = await res.json();
        setSalles(prev => [...prev, salle]);
      }
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  const visible = salles.filter(s =>
    s.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Gestion des Salles</h2>

      <div className="form-row">
        <input placeholder="Nom salle" value={nom} onChange={e => setNom(e.target.value)} />
        <input type="number" placeholder="Capacité" value={capacite} onChange={e => setCapacite(e.target.value)} />
        <input placeholder="Localisation" value={localisation} onChange={e => setLocalisation(e.target.value)} />
        <button onClick={ajouter}>Ajouter</button>

        <input type="file" accept=".xlsx, .xls" onChange={importerExcel} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher salle" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Capacité</th>
            <th>Localisation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr><td colSpan="4">Aucune salle</td></tr>
          ) : (
            visible.map(s => (
              <tr key={s.id}>
                <td>{s.nom}</td>
                <td>{s.capacite}</td>
                <td>{s.localisation}</td>
                <td>
                  <button className="btn-delete" onClick={() => supprimer(s.id)}>
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