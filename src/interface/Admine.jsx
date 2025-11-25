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

  /******************** ENSEIGNANTS ********************/
  const [enseignants, setEnseignants] = useState([]);
  const [nomEns, setNomEns] = useState("");
  const [prenomEns, setPrenomEns] = useState("");

  const ajouterEnseignant = () => {
    if (!nomEns || !grade) return;
    setEnseignants([...enseignants, { id: Date.now(), nom: nomEns, grade }]);
    setNomEns(""); setGrade("");
  };

  const supprimerEnseignant = (id) => {
    setEnseignants(enseignants.filter((e) => e.id !== id));
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
      <input placeholder="Nom enseignant" value={nomEns} onChange={(e) => setNomEns(e.target.value)} />
       <input placeholder="Prenom enseignant" value={prenomEns} onChange={(e) => setPrenomEns(e.target.value)} />
      <button onClick={ajouterEnseignant}>Ajouter</button>

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr><th>Nom</th><th>Prenom</th><th>Action</th></tr>
        </thead>
        <tbody>
          {enseignants.map((e) => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              
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
          <option key={e.id} value={e.nom}>{e.nom}</option>
        ))}
      </select>
      <button onClick={ajouterModule}>Ajouter</button>

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
  const [typeSalle, setTypeSalle] = useState("");
  const [salles, setSalles] = useState([]);

  const ajouterSalle = () => {
    if (!nomSalle || !capacite || !typeSalle) return;
    setSalles([...salles, { id: Date.now(), nomSalle, capacite, typeSalle }]);
    setNomSalle(""); setCapacite(""); setTypeSalle("");
  };

  const supprimerSalle = (id) => {
    setSalles(salles.filter((s) => s.id !== id));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", background: "#f4f4f4" }}>
      <h3>Ajouter une salle</h3>
      <input placeholder="Nom de la salle" value={nomSalle} onChange={(e) => setNomSalle(e.target.value)} />
      <input type="number" placeholder="Capacité" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
      <select value={typeSalle} onChange={(e) => setTypeSalle(e.target.value)}>
        <option value="">Type de salle</option>
        <option value="Cours">Salle de cours</option>
        <option value="TP">Salle TP</option>
        <option value="Amphi">Amphithéâtre</option>
      </select>
      <button onClick={ajouterSalle}>Ajouter</button>

      <table border="1" width="100%" style={{ marginTop: "10px" }}>
        <thead>
          <tr><th>Nom</th><th>Capacité</th><th>Type</th><th>Action</th></tr>
        </thead>
        <tbody>
          {salles.map((s) => (
            <tr key={s.id}>
              <td>{s.nomSalle}</td>
              <td>{s.capacite}</td>
              <td>{s.typeSalle}</td>
              <td><button onClick={() => supprimerSalle(s.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
