import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function GestionExamens() {

  /* =======================
     OUTILS
  ======================= */

  // HH:MM → minutes
  const heureEnMinutes = (heure) => {
    const [h, m] = heure.split(":").map(Number);
    return h * 60 + m;
  };

  // 1.30 → 90 minutes
  const dureeEnMinutes = (valeur) => {
  if (!valeur) return 0;

  // format attendu : H.MM (ex: 1.30 = 1h30)
  const parts = valeur.toString().split(".");
  const heures = parseInt(parts[0]) || 0;
  const minutes = parts[1] ? parseInt(parts[1]) : 0;

  if (minutes >= 60) {
    alert("Minutes invalides (max 59)");
    return 0;
  }

  return heures * 60 + minutes;
};


  // 90 → 1h30
  const afficherDuree = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h${m.toString().padStart(2, "0")}`;
  };

  /* =======================
     STATES
  ======================= */

  const [examens, setExamens] = useState([]);
  const [module, setModule] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [duree, setDuree] = useState("");
  const [salle, setSalle] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  /* =======================
     CHARGEMENT
  ======================= */

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/examens")
      .then(res => res.json())
      .then(data => setExamens(data))
      .catch(err => console.error("Erreur chargement :", err));
  }, []);

  /* =======================
     AJOUT EXAMEN
  ======================= */

  const ajouterExamen = async () => {
    if (!module || !date || !heure || !duree || !salle || !type) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const dureeMinutes = dureeEnMinutes(duree);
    if (dureeMinutes < 15) {
      alert("Durée invalide (minimum 15 minutes)");
      return;
    }

    // Vérification conflit
    const debutNouveau = heureEnMinutes(heure);
    const finNouveau = debutNouveau + dureeMinutes;

    const conflit = examens.some(e => {
      if (e.salle !== salle || e.date !== date) return false;

      const debutExistant = heureEnMinutes(e.heure);
      const finExistant = debutExistant + Number(e.duree);

      return debutNouveau < finExistant && finNouveau > debutExistant;
    });

    if (conflit) {
      alert("Conflit détecté : salle occupée à cet horaire.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/examens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          module,
          date,
          heure,
          duree: dureeMinutes, // 👈 minutes
          salle,
          type
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert("Erreur lors de l'ajout");
        return;
      }

      setExamens(prev => [...prev, data]);

      // reset
      setModule("");
      setDate("");
      setHeure("");
      setDuree("");
      setSalle("");
      setType("");

    } catch (err) {
      console.error("Erreur ajout :", err);
    }
  };

  /* =======================
     SUPPRESSION
  ======================= */

  const supprimer = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/examens/${id}`, {
        method: "DELETE"
      });
      setExamens(prev => prev.filter(e => e.id !== id));
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
        if (!row.module || !row.date || !row.heure || !row.duree || !row.salle || !row.type) continue;

        try {
          const res = await fetch("http://127.0.0.1:8000/api/examens", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              module: row.module,
              date: row.date,
              heure: row.heure,
              duree: dureeEnMinutes(row.duree),
              salle: row.salle,
              type: row.type
            })
          });

          const examen = await res.json();
          if (res.ok) setExamens(prev => [...prev, examen]);

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

  const visibles = examens.filter(e =>
    e.module.toLowerCase().includes(search.toLowerCase()) ||
    e.salle.toLowerCase().includes(search.toLowerCase())
  );

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="card">
      <h2>Gestion des Examens</h2>

      <div className="form-row">
        <input placeholder="Module" value={module} onChange={e => setModule(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="time" value={heure} onChange={e => setHeure(e.target.value)} />
        <input placeholder="Durée (ex: 1.30)" value={duree} onChange={e => setDuree(e.target.value)} />
        <input placeholder="Salle" value={salle} onChange={e => setSalle(e.target.value)} />

        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">Type</option>
          <option value="Ecrit">Écrit</option>
          <option value="Oral">Oral</option>
        </select>

        <button onClick={ajouterExamen}>Créer</button>
        <input type="file" accept=".xlsx,.xls" onChange={importerExcel} />
      </div>

      <input
        placeholder="Recherche (module ou salle)"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Durée</th>
            <th>Salle</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visibles.length === 0 ? (
            <tr><td colSpan="7">Aucun examen</td></tr>
          ) : (
            visibles.map(e => (
              <tr key={e.id}>
                <td>{e.module}</td>
                <td>{e.date}</td>
                <td>{e.heure}</td>
                <td>{afficherDuree(e.duree)}</td>
                <td>{e.salle}</td>
                <td>{e.type}</td>
                <td>
                  <button onClick={() => supprimer(e.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
