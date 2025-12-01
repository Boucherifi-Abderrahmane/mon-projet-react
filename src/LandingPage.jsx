import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      
      {/* NAVBAR */}
      <nav className="landing-navbar">
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <h2 className="navbar-title">Gestion des Examens</h2>
        <div className="navbar-links">
          <button className="navbar-btn" onClick={() => alert("Tel: +2133333344434\nEmail: yassine@gmail.com")}>Contact US </button>
        </div>
      </nav>

      {/* CONTENU CENTRAL */}
      <div className="landing-card">
        <img src="/logo.png" alt="Logo" className="landing-logo" />
        <h1 className="landing-title">Gestion des Examens de votre établissement</h1>
        <p className="landing-description">Centralisez, organisez et suivez les examens facilement</p>
        <button className="landing-button" onClick={() => navigate("/app")}>Entrer</button>
      </div>

      {/* FOOTER */}
      <footer className="landing-footer">
        © 2025 - Gestion des Examens. Tous droits réservés.
      </footer>
    </div>
  );
}
