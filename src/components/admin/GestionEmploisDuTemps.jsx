import { useEffect, useState } from "react";

export default function GestionEmploisDuTemps() {
  const [emploi, setEmploi] = useState([]);

  const generer = async () => {
    await fetch("http://127.0.0.1:8000/api/emploi-du-temps/generer", {
      method: "POST",
    });
    charger();
  };

  const charger = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/emploi-du-temps");
    const data = await res.json();
    setEmploi(data);
  };

  useEffect(() => {
    charger();
  }, []);

  const groupes = emploi.reduce((acc, e) => {
    const key = `${e.niveau} - ${e.specialite}`;
    acc[key] = acc[key] || [];
    acc[key].push(e);
    return acc;
  }, {});

  return (
    <div className="card">
      <h2>Emploi du Temps</h2>
      <button onClick={generer}>Générer</button>

      {Object.entries(groupes).map(([titre, lignes]) => (
        <div key={titre}>
          <h3>{titre}</h3>

          <table className="data-table">
            <thead>
              <tr>
                <th>Jour</th>
                <th>Heure</th>
                <th>Module</th>
                <th>Enseignant</th>
                <th>Salle</th>
              </tr>
            </thead>
            <tbody>
              {lignes.map(e => (
                <tr key={e.id}>
                  <td>{e.jour}</td>
                  <td>{e.heure_debut} - {e.heure_fin}</td>
                  <td>{e.module}</td>
                  <td>{e.enseignant}</td>
                  <td>{e.salle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
