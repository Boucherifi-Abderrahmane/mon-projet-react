// ...existing code...
import "./App.css";
import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Admine from "./Admine.jsx";
import Chef from "./Chef.jsx";
import Enseignant from "./Enseignant.jsx";
import Etudiant from "./Etudiant.jsx";

// ---------- FORM PAGE ----------
function FormPage() {
  const navigate = useNavigate();

  // 🔥 test Laravel API ici
  useEffect(() => {
    fetch("http://localhost:8000/api/test")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const matricule = (formData.get("matricule") || "").toString().trim().toUpperCase();

    if (!matricule) {
      alert("Veuillez saisir un matricule.");
      return;
    }

    if (/^ADM/.test(matricule)) { 
      navigate("/admine");
    } else if (/^CH(E)?/.test(matricule) || /^CH/.test(matricule)) {
      navigate("/chef");
    } else if (/^EN/.test(matricule)) {
      navigate("/enseignant");
    } else if (/^ET/.test(matricule)) {
      navigate("/etudiant");
    } else {
      alert("Matricule non reconnu. Vérifiez le format.");
      navigate("/");
    }
  };

  return (
    
    <div className="form-center">
      <div className="form-header" >
        <h1>Connexion</h1>
        <p>Veuillez entrer votre matricule et mot de passe.</p>
      </div>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="matricule">Matricule</label>
          <input id="matricule" name="matricule" type="text" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input id="password" name="password" type="password" required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn">Valider</button>
        </div>
      </form>
    </div>
  );
}

// ---------- APP ROUTES ----------
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
