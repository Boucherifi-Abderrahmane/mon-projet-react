import { useState } from "react";

export default function Admine() {
  /******************** ETUDIANTS ********************/
  const [etudiants, setEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [niveau, setNiveau] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [groupe, setGroupe] = useState("");

  const ajouterEtudiant = () => {
    if (!nom || !prenom || !niveau || !specialite || !groupe) return;
    setEtudiants([...etudiants, { id: Date.now(), nom, prenom, niveau, specialite, groupe }]);
    setNom(""); setPrenom(""); setNiveau(""); setSpecialite(""); setGroupe("");
  };

  const supprimerEtudiant = (id) => {
    setEtudiants(etudiants.filter((e) => e.id !== id));
  };

  const importerEtudiants = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setEtudiants(JSON.parse(event.target.result));
    reader.readAsText(file);
  };

  /******************** ENSEIGNANTS ********************/
  const [enseignants, setEnseignants] = useState([]);
  const [nomEns, setNomEns] = useState("");
  const [prenomEns, setPrenomEns] = useState("");

  const ajouterEnseignant = () => {
    if (!nomEns || !prenomEns) return;
    setEnseignants([...enseignants, { id: Date.now(), nom: nomEns, prenom: prenomEns }]);
    setNomEns(""); setPrenomEns("");
  };

  const supprimerEnseignant = (id) => {
    setEnseignants(enseignants.filter((e) => e.id !== id));
  };

  const importerEnseignants = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setEnseignants(JSON.parse(event.target.result));
    reader.readAsText(file);
  };

  /******************** MODULES ********************/
  const [modules, setModules] = useState([]);
  const [nomModule, setNomModule] = useState("");
  const [ensResponsable, setEnsResponsable] = useState("");

  const ajouterModule = () => {
    if (!nomModule || !ensResponsable) return;
    setModules([...modules, { id: Date.now(), nom: nomModule, enseignant: ensResponsable }]);
    setNomModule(""); setEnsResponsable("");
  };

  const supprimerModule = (id) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const importerModules = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setModules(JSON.parse(event.target.result));
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Interface Administrateur</h1>

      {/* ================= ETUDIANTS ================= */}
      <h2>Gestion des Étudiants</h2>
      <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      <input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      <input placeholder="Niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)} />
      <input placeholder="Spécialité" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
      <input placeholder="Groupe" value={groupe} onChange={(e) => setGroupe(e.target.value)} />
      <button onClick={ajouterEtudiant}>Ajouter</button>
      <input type="file" accept=".json" onChange={importerEtudiants} />

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr><th>Nom</th><th>Prénom</th><th>Niveau</th><th>Spécialité</th><th>Groupe</th><th>Action</th></tr>
        </thead>
        <tbody>
          {etudiants.map((e) => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>{e.niveau}</td>
              <td>{e.specialite}</td>
              <td>{e.groupe}</td>
              <td><button onClick={() => supprimerEtudiant(e.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* ================= ENSEIGNANTS ================= */}
      <h2>Gestion des Enseignants</h2>
      <input placeholder="Nom" value={nomEns} onChange={(e) => setNomEns(e.target.value)} />
      <input placeholder="Prénom" value={prenomEns} onChange={(e) => setPrenomEns(e.target.value)} />
      <button onClick={ajouterEnseignant}>Ajouter</button>
      <input type="file" accept=".json" onChange={importerEnseignants} />

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr><th>Nom</th><th>Prénom</th><th>Action</th></tr>
        </thead>
        <tbody>
          {enseignants.map((e) => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td><button onClick={() => supprimerEnseignant(e.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* ================= MODULES ================= */}
      <h2>Gestion des Modules</h2>
      <input placeholder="Nom du module" value={nomModule} onChange={(e) => setNomModule(e.target.value)} />
      <select value={ensResponsable} onChange={(e) => setEnsResponsable(e.target.value)}>
        <option value="">-- Enseignant responsable --</option>
        {enseignants.map((e) => (
          <option key={e.id} value={`${e.nom} ${e.prenom}`}>{e.nom} {e.prenom}</option>
        ))}
      </select>
      <button onClick={ajouterModule}>Ajouter</button>
      <input type="file" accept=".json" onChange={importerModules} />

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr><th>Module</th><th>Enseignant</th><th>Action</th></tr>
        </thead>
        <tbody>
          {modules.map((m) => (
            <tr key={m.id}>
              <td>{m.nom}</td>
              <td>{m.enseignant}</td>
              <td><button onClick={() => supprimerModule(m.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* ================= SALLES ================= */}
      <h2>Gestion des Salles</h2>
      <Salles />
    </div>
  );
}

/******************** SALLES ********************/
function Salles() {
  const [nomSalle, setNomSalle] = useState("");
  const [capacite, setCapacite] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [salles, setSalles] = useState([]);

  const ajouterSalle = () => {
    if (!nomSalle || !capacite || !localisation) return;
    setSalles([...salles, { id: Date.now(), nomSalle, capacite, localisation }]);
    setNomSalle(""); setCapacite(""); setLocalisation("");
  };

  const supprimerSalle = (id) => {
    setSalles(salles.filter((s) => s.id !== id));
  };

  const importerSalles = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setSalles(JSON.parse(event.target.result));
    reader.readAsText(file);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", background: "#f4f4f4" }}>
      <h3>Ajouter une salle</h3>
      <input placeholder="Nom de la salle" value={nomSalle} onChange={(e) => setNomSalle(e.target.value)} />
      <input type="number" placeholder="Capacité" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
      <input placeholder="Localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
      <button onClick={ajouterSalle}>Ajouter</button>
      <input type="file" accept=".json" onChange={importerSalles} />

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr><th>Nom</th><th>Capacité</th><th>Localisation</th><th>Action</th></tr>
        </thead>
        <tbody>
          {salles.map((s) => (
            <tr key={s.id}>
              <td>{s.nomSalle}</td>
              <td>{s.capacite}</td>
              <td>{s.localisation}</td>
              <td><button onClick={() => supprimerSalle(s.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
