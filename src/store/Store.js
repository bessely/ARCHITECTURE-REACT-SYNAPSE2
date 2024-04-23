import { configureStore } from "@reduxjs/toolkit";
import utilisateurReducer from './Utilisateurs/Utilisateur';
import agenceReducer from './Agences/Agences';
import profilprivilegesReducer from './Profil/Privilege';
import profilReducer from './Profil/Profil';
import auditeReducer from './PisteAudit/PisteAudit';

export const Store = configureStore ({
  reducer: {
    utilisateurs    :  utilisateurReducer,
    agences         :  agenceReducer,
    profils         :  profilReducer,
    profilprivileges:  profilprivilegesReducer,
    pisteaudites    :  auditeReducer, 
  }
});