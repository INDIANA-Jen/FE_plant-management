import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from "./components/Homepage"
import Inscrire from "./components/Inscrire";
import Connecter from "./components/Connecter";
import Profil from "./components/Profil";

function App() {
  return (
    <Router>
      <>
      <Routes>
        <Route path="/" element={<Homepage title="Solution d'entretien de leurs plantes" />} />
        <Route path="/inscrires" element={<Inscrire />} />
        <Route path="/connecters" element={<Connecter />} />
        <Route path="/profils" element={<Profil />} />
      </Routes>
      </>
    </Router>
  );
}

export default App;