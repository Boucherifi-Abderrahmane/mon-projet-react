import React from "react";
import "./Chef.css";

export default function Chef() {
  return (
    <div className="chef-page">
      <div className="chef-card">

        <div>
          <h1 className="chef-title">Chef de Département</h1>
          
        </div>

        {/* Boutons tout en bas à droite */}
        <div className="chef-buttons">
          <p className="chef-text">Choisissez une action :</p>
          <button className="btn btn-green">Publier</button>
          <button className="btn btn-red">Générer</button>
        </div>

      </div>
    </div>
  );
}
