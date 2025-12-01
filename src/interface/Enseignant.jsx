import React from "react";
import "./Enseignant.css";

export default function Etudiant() {
  return (
    <div className="ens-page">
      <div className="ens-card">

        <div>
          <h1 className="ens-title">Enseignant</h1>
          
        </div>

        <div className="ens-buttons">
          <p className="ens-text">click ici pour telecharger votre emploie du temps</p>
          <button className="btn btn-blue">Telecharger</button>
        </div>

      </div>
    </div>
  );
}