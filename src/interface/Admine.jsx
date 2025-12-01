import { useState } from "react";
import "./Admine.css"; // adapte le chemin si besoin (ici admine.css à la racine src)

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
      </main>
    </div>
  );
}

/* ================= Gestion Étudiants ================= */
/* ================= Gestion Étudiants ================= */
import * as XLSX from "xlsx";

function GestionEtudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [niveau, setNiveau] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [groupe, setGroupe] = useState("");
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState("");

  const ajouterEtudiant = () => {
    if (!nom || !prenom || !niveau || !specialite || !groupe) return;

    setEtudiants([
      ...etudiants,
      { id: Date.now(),nom,prenom,niveau,specialite,groupe }
    ]);

    setNom(""); setPrenom(""); setNiveau(""); setSpecialite(""); setGroupe("");
  };

  const supprimerEtudiant = (id) =>
    setEtudiants(etudiants.filter((e) => e.id !== id));

  /* ----- IMPORT EXCEL ----- */
  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = (evt) => {
      const buffer = evt.target.result;
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);
      console.log(data);

      // On suppose que ton fichier Excel contient :
      // nom | prenom | niveau | specialite | groupe
      const convertis = data.map((row) => ({
        id: Date.now() + Math.random(),
        nom: row.nom || "",
        prenom: row.prenom || "",
        niveau: row.niveau || "",
        specialite: row.specialite || "",
        groupe: row.groupe || ""

      }));
      console.log(convertis);

      setEtudiants([...etudiants, ...convertis]);
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  // recherche + filtre
  const visible = etudiants.filter(
    (e) =>
      e.nom.toLowerCase().includes(search.toLowerCase()) &&
      (filterSpec === "" || e.specialite === filterSpec)
  );

  // liste des spécialités dynamiques
  const specs = Array.from(new Set(etudiants.map((e) => e.specialite)));

  return (
    <div className="card">
      <h2>Gestion des Étudiants</h2>

      <div className="form-row">
        <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <input placeholder="Niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} />
        <input placeholder="Spécialité" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
        <input placeholder="Groupe" value={groupe} onChange={(e) => setGroupe(e.target.value)} />
        <button onClick={ajouterEtudiant}>Ajouter</button>

        {/* IMPORT EXCEL */}
        <input className="file-input" type="file" accept=".xlsx, .xls" onChange={importerExcel} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher par nom" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filterSpec} onChange={(e) => setFilterSpec(e.target.value)}>
          <option value="">Toutes les spécialités</option>
          {specs.map((s) => (
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
            visible.map((e) => (
              <tr key={e.id}>
                <td>{e.nom}</td>
                <td>{e.prenom}</td>
                <td>{e.niveau}</td>
                <td>{e.specialite}</td>
                <td>{e.groupe}</td>
                <td>
                  <button className="btn-delete" onClick={() => supprimerEtudiant(e.id)}>
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


/* ================= Gestion Enseignants ================= */
function GestionEnseignants() {
  const [enseignants, setEnseignants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [search, setSearch] = useState("");

  const ajouter = () => {
    if (!nom || !prenom) return;

    setEnseignants([...enseignants, { id: Date.now(), nom, prenom }]);
    setNom("");
    setPrenom("");
  };

  const supprimer = (id) =>
    setEnseignants(enseignants.filter((e) => e.id !== id));

  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      const convertis = data.map((row) => ({
        id: Date.now() + Math.random(),
        nom: row.nom || "",
        prenom: row.prenom || "",
      }));

      setEnseignants((prev) => [...prev, ...convertis]);
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  const visible = enseignants.filter((e) =>
    e.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Gestion des Enseignants</h2>

      <div className="form-row">
        <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        <button onClick={ajouter}>Ajouter</button>

        <input type="file" className="file-input" onChange={importerExcel} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher par nom" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visible.length === 0 ? (
            <tr><td colSpan="3">Aucun enseignant</td></tr>
          ) : (
            visible.map((e) => (
              <tr key={e.id}>
                <td>{e.nom}</td>
                <td>{e.prenom}</td>
                <td>
                  <button className="btn-delete" onClick={() => supprimer(e.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
/* ================= Gestion Modules ================= */

 function GestionModules() {
  const [modules, setModules] = useState([]);
  const [nom, setNom] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [search, setSearch] = useState("");

  const ajouter = () => {
    if (!nom || !specialite) return;

    setModules([...modules, { id: Date.now(), nom, specialite }]);
    setNom("");
    setSpecialite("");
  };

  const supprimer = (id) =>
    setModules(modules.filter((m) => m.id !== id));

  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      const convertis = data.map((row) => ({
        id: Date.now() + Math.random(),
        nom: row.nom || "",
        specialite: row.specialite || "",
      }));

      setModules((prev) => [...prev, ...convertis]);
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  const visible = modules.filter((m) =>
    m.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Gestion des Modules</h2>

      <div className="form-row">
        <input placeholder="Nom du module" value={nom} onChange={(e) => setNom(e.target.value)} />
        <input placeholder="Spécialité" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
        <button onClick={ajouter}>Ajouter</button>

        <input type="file" className="file-input" onChange={importerExcel} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher un module" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Module</th>
            <th>Spécialité</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visible.length === 0 ? (
            <tr><td colSpan="3">Aucun module</td></tr>
          ) : (
            visible.map((m) => (
              <tr key={m.id}>
                <td>{m.nom}</td>
                <td>{m.specialite}</td>
                <td><button className="btn-delete" onClick={() => supprimer(m.id)}>Supprimer</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ================= SALLES ================= */
  function GestionSalles() {
  const [salles, setSalles] = useState([]);
  const [nom, setNom] = useState("");
  const [capacite, setCapacite] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [search, setSearch] = useState("");

  const ajouter = () => {
    if (!nom || !capacite || !localisation) return;

    setSalles([
      ...salles,
      { id: Date.now(), nom, capacite, localisation },
    ]);

    setNom("");
    setCapacite("");
    setLocalisation("");
  };

  const supprimer = (id) =>
    setSalles(salles.filter((s) => s.id !== id));

  /* ----- IMPORT EXCEL ----- */
  const importerExcel = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const lecteur = new FileReader();
    lecteur.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      // On suppose que le fichier Excel contient : nom | capacite | localisation
      const convertis = data.map((row) => ({
        id: Date.now() + Math.random(),
        nom: row.nom || "",
        capacite: row.capacite || "",
        localisation: row.localisation || "",
      }));

      setSalles((prev) => [...prev, ...convertis]);
    };

    lecteur.readAsArrayBuffer(fichier);
  };

  const visible = salles.filter((s) =>
    s.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Gestion des Salles</h2>

      <div className="form-row">
        <input placeholder="Nom salle" value={nom} onChange={(e) => setNom(e.target.value)} />
        <input type="number" placeholder="Capacité" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
        <input placeholder="Localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
        <button onClick={ajouter}>Ajouter</button>

        {/* IMPORT EXCEL */}
        <input type="file" className="file-input" accept=".xlsx, .xls" onChange={importerExcel} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher salle" value={search} onChange={(e) => setSearch(e.target.value)} />
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
            visible.map((s) => (
              <tr key={s.id}>
                <td>{s.nom}</td>
                <td>{s.capacite}</td>
                <td>{s.localisation}</td>
                <td><button className="btn-delete" onClick={() => supprimer(s.id)}>Supprimer</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
function GestionEmploisDuTemps() {
  const [message, setMessage] = useState("");

  const genererEmploi = () => {
    // Ici tu peux mettre la logique réelle pour générer l'emploi du temps
    setMessage("Emploi du temps généré avec succès !");
  };

  return (
    <div className="card">
      <h2>Emploi du Temps</h2>
      <button onClick={genererEmploi}>Générer</button>
      {message && <p>{message}</p>}
    </div>
  );
}
    