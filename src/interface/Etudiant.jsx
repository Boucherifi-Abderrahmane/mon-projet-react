import React from "react";
import "./Etudiant.css";

export default function Etudiant() {
  return (
    <div className="etud-page">
      <div className="etud-card">

        <div>
          <h1 className="etud-title">Etudiant</h1>
          
        </div>

        <div className="etud-buttons">
          <p className="chef-text">click ici pour telecharger votre emploie du temps</p>
          <button className="btn btn-blue">Telecharger</button>
        </div>

      </div>
    </div>
  );
}