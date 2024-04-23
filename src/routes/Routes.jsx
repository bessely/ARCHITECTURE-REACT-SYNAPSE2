import React, { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BASEROOT } from '../services/serveur';

//lazy loading permet de charger les composants uniquement au besoin  { ça rend l'appli plus lentes en principe mais plus performante et moin groumande en memoire mais une fois builder la lenteur est imperceptible pour le client}
const Connexion       = lazy(() => import("../pages/connexion/Connexion"));
const PageNotFound    = lazy(() => import("../pages/PageNotFound"));
const Dashboard       = lazy(() => import("../pages/dashboard/Dashboard"));
const Rapprochement   = lazy(() => import("../pages/rapprochement/rapprochement"));
const Validation      = lazy(() => import("../pages/validation/validation"));
const Derapprochement = lazy(() => import("../pages/derapprochement/derapprochement"));
const Recherche       = lazy(() => import("../pages/recherche/recherche"));
const Utilisateur     = lazy(() => import("../pages/utilisateur/Utlisateur"));
const Profil          = lazy(() => import("../pages/profil/Profil"));
const Agence          = lazy(() => import("../pages/agence/Agence"));
const Audit           = lazy(() => import("../pages/audit/Audit"));
const Forget          = lazy(() => import("../pages/forget/Forget"));

function RoutesApp() {
    return (
        <Router basename={BASEROOT}>
            <Routes>
                <Route path = "/"                element={<Dashboard        />} />
                <Route path = "/Connexion"       element={<Connexion        />} />
                <Route path = "/Rapprochement"   element={<Rapprochement    />} />
                <Route path = "/Validation"      element={<Validation       />} />
                <Route path = "/Derapprochement" element={<Derapprochement  />} />
                <Route path = "/Recherche"       element={<Recherche        />} />
                <Route path = "/PageNotFound"    element={<PageNotFound     />} />
                <Route path = "/Utilisateur"     element={<Utilisateur      />} />
                <Route path = "/Profil"          element={<Profil           />} />
                <Route path = "/Agence"          element={<Agence           />} />
                <Route path = "/Audit"           element={<Audit            />} />
                <Route path = "/Forget"          element={<Forget           />} />
            </Routes>
        </Router>
    )
}

export default RoutesApp