// ...existing code...
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import Admine from "./interface/Admine.jsx";
import Chef from "./interface/Chef.jsx";
import Enseignant from "./interface/Enseignant.jsx";
import Etudiant from "./interface/Etudiant.jsx";

function FormPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const matricule = (formData.get("matricule") || "").toString().trim().toUpperCase();

    if (!matricule) {
      alert("Veuillez saisir un matricule.");
      return;
    }

    // règles de redirection selon le préfixe du matricule
    if (/^ADM/.test(matricule)) {
      navigate("/admine");
    } else if (/^CH(E)?/.test(matricule) || /^CH/.test(matricule)) {
      navigate("/chef");
    } else if (/^EN/.test(matricule)) {
      navigate("/enseignant");
    } else if (/^ET/.test(matricule)) {
      navigate("/etudiant");
    } else {
      // fallback : si aucune règle ne correspond, rester sur la page ou envoyer vers "/"
      alert("Matricule non reconnu. Vérifiez le format.");
      navigate("/");
    }
  };

  return (
    <div className="form-center">
      <form className="form-card" onSubmit={handleSubmit}>


        <div className="form-group">
          <label htmlFor="matricule">Matricule</label>
          <input id="matricule" name="matricule" type="text" placeholder="Ex: ADM001, CH123, EN045, ET678" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="password" placeholder="Votre mot de passe" required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">Valider</button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/admine" element={<Admine />} />
      <Route path="/chef" element={<Chef />} />
      <Route path="/enseignant" element={<Enseignant />} />
      <Route path="/etudiant" element={<Etudiant />} />
    </Routes>
  );
}
// ...existing code...