import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function GestionEtudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [niveau, setNiveau] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [groupe, setGroupe] = useState("");
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState("");

  /* 🔹 CHARGER LES ÉTUDIANTS DEPUIS LARAVEL */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/etudiants")
      .then(res => res.json())
      .then(data => setEtudiants(data))
      .catch(err => console.error(err));
  }, []);

  /* 🔹 AJOUTER UN ÉTUDIANT */
  const ajouterEtudiant = async () => {
    if (!nom || !prenom || !niveau || !specialite || !groupe) return;

    const res = await fetch("http://127.0.0.1:8000/api/etudiants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        prenom,
        niveau,
        specialite,
        groupe,
      }),
    });

    const nouvelEtudiant = await res.json();
    setEtudiants([...etudiants, nouvelEtudiant]);

    setNom("");
    setPrenom("");
    setNiveau("");
    setSpecialite("");
    setGroupe("");
  };

  /* 🔹 SUPPRIMER UN ÉTUDIANT */
  const supprimerEtudiant = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/etudiants/${id}`, {
      method: "DELETE",
    });

    setEtudiants(etudiants.filter(e => e.id !== id));
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
        const res = await fetch("http://127.0.0.1:8000/api/etudiants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: row.nom,
            prenom: row.prenom,
            niveau: row.niveau,
            specialite: row.specialite,
            groupe: row.groupe,
          }),
        });

        const etudiant = await res.json();
        setEtudiants(prev => [...prev, etudiant]);
      }
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  /* 🔹 RECHERCHE + FILTRE */
  const visible = etudiants.filter(
    e =>
      e.nom.toLowerCase().includes(search.toLowerCase()) &&
      (filterSpec === "" || e.specialite === filterSpec)
  );

  const specs = Array.from(new Set(etudiants.map(e => e.specialite)));

  return (
    <div className="card">
      <h2>Gestion des Étudiants</h2>

      <div className="form-row">
        <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
        <input placeholder="Prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
        <input placeholder="Niveau" value={niveau} onChange={e => setNiveau(e.target.value)} />
        <input placeholder="Spécialité" value={specialite} onChange={e => setSpecialite(e.target.value)} />
        <input placeholder="Groupe" value={groupe} onChange={e => setGroupe(e.target.value)} />
        <button onClick={ajouterEtudiant}>Ajouter</button>

        <input type="file" accept=".xlsx, .xls" onChange={importerExcel} />
      </div>

      <div className="filter-row">
        <input
          placeholder="Rechercher par nom"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={filterSpec} onChange={e => setFilterSpec(e.target.value)}>
          <option value="">Toutes les spécialités</option>
          {specs.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Niveau</th>
            <th>Spécialité</th>
            <th>Groupe</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visible.length === 0 ? (
            <tr>
              <td colSpan="6">Aucun étudiant</td>
            </tr>
          ) : (
            visible.map(e => (
              <tr key={e.id}>
                <td>{e.nom}</td>
                <td>{e.prenom}</td>
                <td>{e.niveau}</td>
                <td>{e.specialite}</td>
                <td>{e.groupe}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => supprimerEtudiant(e.id)}
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