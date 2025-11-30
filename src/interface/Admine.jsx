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
        {page === "salles" && <Salles />}
        {page === "emploi" && (
          <div className="card">
            <h2>Emploi du temps</h2>
            <p>Page emploi du temps — à compléter (drag & drop possible).</p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= Gestion Étudiants ================= */
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
    setEtudiants([...etudiants, { id: Date.now(), nom, prenom, niveau, specialite, groupe }]);
    setNom(""); setPrenom(""); setNiveau(""); setSpecialite(""); setGroupe("");
  };

  const supprimerEtudiant = (id) => setEtudiants(etudiants.filter(e => e.id !== id));

  const importerEtudiants = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) setEtudiants(data);
      } catch (err) {
        alert("Fichier JSON invalide");
      }
    };
    reader.readAsText(file);
  };

  // recherche + filtre
  const visible = etudiants.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase()) &&
    (filterSpec === "" || e.specialite === filterSpec)
  );

  // options spécialités dynamiques
  const specs = Array.from(new Set(etudiants.map(e => e.specialite))).filter(Boolean);

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
        <input className="file-input" type="file" accept=".json" onChange={importerEtudiants} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher par nom" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filterSpec} onChange={(e) => setFilterSpec(e.target.value)}>
          <option value="">Toutes les spécialités</option>
          {specs.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr><th>Nom</th><th>Prénom</th><th>Niveau</th><th>Spécialité</th><th>Groupe</th><th>Action</th></tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr><td colSpan="6">Aucun étudiant</td></tr>
          ) : visible.map((e) => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>{e.niveau}</td>
              <td>{e.specialite}</td>
              <td>{e.groupe}</td>
              <td><button className="btn-delete" onClick={() => supprimerEtudiant(e.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= Gestion Enseignants ================= */
function GestionEnseignants() {
  const [enseignants, setEnseignants] = useState([]);
  const [nomEns, setNomEns] = useState("");
  const [prenomEns, setPrenomEns] = useState("");
  const [search, setSearch] = useState("");

  const ajouterEnseignant = () => {
    if (!nomEns || !prenomEns) return;
    setEnseignants([...enseignants, { id: Date.now(), nom: nomEns, prenom: prenomEns }]);
    setNomEns(""); setPrenomEns("");
  };

  const supprimerEnseignant = (id) => setEnseignants(enseignants.filter(e => e.id !== id));

  const importerEnseignants = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) setEnseignants(data);
      } catch { alert("Fichier JSON invalide"); }
    };
    reader.readAsText(file);
  };

  const visible = enseignants.filter(a => a.nom.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h2>Gestion des Enseignants</h2>

      <div className="form-row">
        <input placeholder="Nom" value={nomEns} onChange={(e) => setNomEns(e.target.value)} />
        <input placeholder="Prénom" value={prenomEns} onChange={(e) => setPrenomEns(e.target.value)} />
        <button onClick={ajouterEnseignant}>Ajouter</button>
        <input className="file-input" type="file" accept=".json" onChange={importerEnseignants} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher par nom" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="data-table">
        <thead><tr><th>Nom</th><th>Prénom</th><th>Action</th></tr></thead>
        <tbody>
          {visible.length === 0 ? <tr><td colSpan="3">Aucun enseignant</td></tr> : visible.map(e => (
            <tr key={e.id}><td>{e.nom}</td><td>{e.prenom}</td><td><button className="btn-delete" onClick={() => supprimerEnseignant(e.id)}>Supprimer</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= Gestion Modules ================= */
function GestionModules() {
  const [modules, setModules] = useState([]);
  const [nomModule, setNomModule] = useState("");
  const [ModuleSpecialite, setModuleSpecialite] = useState("");

  const [search, setSearch] = useState("");

  const ajouterModule = () => {
    if (!nomModule) return;
    setModules([...modules, { id: Date.now(), nom: nomModule }]);
    setNomModule("");
  };

  const supprimerModule = (id) => setModules(modules.filter(m => m.id !== id));

  const importerModules = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) setModules(data);
      } catch { alert("Fichier JSON invalide"); }
    };
    reader.readAsText(file);
  };

  const visible = modules.filter(m => m.nom.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h2>Gestion des Modules</h2>

      <div className="form-row">
        <input placeholder="Nom du module" value={nomModule} onChange={(e) => setNomModule(e.target.value)} />
        <input placeholder="Specialite" value={nomModule} onChange={(e) => setModuleSpecialite(e.target.value)} />
        <button onClick={ajouterModule}>Ajouter</button>
        <input className="file-input" type="file" accept=".json" onChange={importerModules} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher par module" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="data-table">
        <thead><tr><th>Module</th><th>Action</th></tr></thead>
        <tbody>
          {visible.length === 0 ? <tr><td colSpan="2">Aucun module</td></tr> : visible.map(m => (
            <tr key={m.id}><td>{m.nom}</td><td><button className="btn-delete" onClick={() => supprimerModule(m.id)}>Supprimer</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= SALLES ================= */
function Salles() {
  const [nomSalle, setNomSalle] = useState("");
  const [capacite, setCapacite] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [salles, setSalles] = useState([]);
  const [search, setSearch] = useState("");

  const ajouterSalle = () => {
    if (!nomSalle || !capacite || !localisation) return;
    setSalles([...salles, { id: Date.now(), nomSalle, capacite, localisation }]);
    setNomSalle(""); setCapacite(""); setLocalisation("");
  };

  const supprimerSalle = (id) => setSalles(salles.filter(s => s.id !== id));

  const importerSalles = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (Array.isArray(data)) setSalles(data);
      } catch { alert("Fichier JSON invalide"); }
    };
    reader.readAsText(file);
  };

  const visible = salles.filter(s => s.nomSalle.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h2>Gestion des Salles</h2>

      <div className="form-row">
        <input placeholder="Nom de la salle" value={nomSalle} onChange={(e) => setNomSalle(e.target.value)} />
        <input type="number" placeholder="Capacité" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
        <input placeholder="Localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
        <button onClick={ajouterSalle}>Ajouter</button>
        <input className="file-input" type="file" accept=".json" onChange={importerSalles} />
      </div>

      <div className="filter-row">
        <input placeholder="Rechercher par nom de salle" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <table className="data-table">
        <thead><tr><th>Nom</th><th>Capacité</th><th>Localisation</th><th>Action</th></tr></thead>
        <tbody>
          {visible.length === 0 ? <tr><td colSpan="4">Aucune salle</td></tr> : visible.map(s => (
            <tr key={s.id}><td>{s.nomSalle}</td><td>{s.capacite}</td><td>{s.localisation}</td><td><button className="btn-delete" onClick={() => supprimerSalle(s.id)}>Supprimer</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
