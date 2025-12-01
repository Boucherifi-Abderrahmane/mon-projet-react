import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage.jsx";
import FormPage from "./interface/App.jsx"; // App.jsx contient FormPage et autres interfaces
import Admine from "./interface/Admine.jsx";
import Chef from "./interface/Chef.jsx";
import Enseignant from "./interface/Enseignant.jsx";
import Etudiant from "./interface/Etudiant.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<LandingPage />} />

        {/* Page de formulaire */}
        <Route path="/app" element={<FormPage />} />

        {/* Autres interfaces */}
        <Route path="/admine" element={<Admine />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/enseignant" element={<Enseignant />} />
        <Route path="/etudiant" element={<Etudiant />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
