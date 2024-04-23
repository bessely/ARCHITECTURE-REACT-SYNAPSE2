import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doDisConnexion, getCurrentProfile, getDataUtilisateur, getLoginUtilisateur, lockSession, popUpProfil } from '../services/Utilisateurs';
import { setCurrentUtilisateur, setModalCompte, setformErreur, setModalPreferences } from '../store/Utilisateurs/Utilisateur';
import { Tooltip } from 'react-tooltip'; 
import { BASEROOT } from '../services/serveur';



function Header(){
    const dispatch                                            = useDispatch();
    const { loginUtilisateur, modalPreferences, modalCompte } = useSelector((state) => state.utilisateurs);
    return (
        <>
            <div className="switch-overlay"></div>
            <header className="main-header bg-white d-flex justify-content-between p-2">
                        <div className="header-toggle">
                            <div className="menu-toggle mobile-menu-icon">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            {/* Partie de gauche du header */}
                            <i class="i-Administrator text-20 mr-2 text-muted font-weight-bold"></i>&nbsp;
                            <span className="font-weight-bold mt-2">
                                {getLoginUtilisateur()?.str_FIRST_LAST_NAME}
                            </span> &nbsp;
                            <i className='i-Pause-2 font-weight-bold mt-2'></i> &nbsp;
                            <i className="i-File-Clipboard-File--Text text-20 mr-2 text-muted font-weight-bold"></i>
                            &nbsp;
                            <span className="mt-2 text-success">
                                {getCurrentProfile()?.STR_PRODESCRIPTION}
                            </span>
                            {/* Fin de partie de gauche */}
                        </div>
                        <div className="header-part-right">
                            {/* Partien de droite du header */}
                                        {
                                         loginUtilisateur.dataPro!==undefined && loginUtilisateur.dataPro.length >=2 ?
                                        <a href="#" data-tooltip-id="myBasculer" data-tooltip-content="Changer de profil" role="button" onClick={(e) => { dispatch(popUpProfil(e)) }}><i className="i-Remove-User text-20 mr-4 text-muted font-weight-bold icon-header"></i>
                                           <Tooltip id="myBasculer"/>
                                        </a>
                                        : //pour les utilisateurs a 1 seul profil on affiche pas cette section
                                        null
                                        }
                                         <a href="" data-tooltip-id="myCompte" data-tooltip-content="Voir mes informations utilisateurs" onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(getDataUtilisateur());
                                            dispatch(setformErreur([]))
                                            dispatch(setModalCompte({ ...modalCompte, open: true, size: "lg", btnclass: "d-none" }));
                                            dispatch(setCurrentUtilisateur([{ LG_UTIID: "", STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN: "", AGENCE: [{}] }]));
                                        }}><i className="i-Love-User text-20 mr-4 text-muted font-weight-bold icon-header"></i> 
                                         <Tooltip id='myCompte'/>
                                        </a>
                                        <a href="#" data-tooltip-id="myPreference" data-tooltip-content="Choix des préférences" role="button" onClick={(e)=>{ e.preventDefault(); dispatch(setModalPreferences({...modalPreferences,open:true, size:"profil", title:"Préférences & accéssibilité"})) }}><i className="i-Double-Tap text-20 mr-4 text-muted font-weight-bold icon-header"></i> 
                                         <Tooltip id='myPreference' />
                                        </a>
                                        <a href="#" role="button" data-tooltip-id="myDoconnexion" data-tooltip-content="Se deconnecter" 
                                        onClick={(e) => { dispatch(doDisConnexion(BASEROOT+"Connexion"));
                                         dispatch(lockSession(e));
                                        }}>
                                            <i className="i-Lock-User text-20 mr-4 text-muted font-weight-bold icon-header"></i> 
                                         <Tooltip id='myDoconnexion'/>
                                        </a>
                            {/* <div className="dropdown dropleft"><i className="i-Safe-Box text-muted header-icon" id="dropdownMenuButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <h5 className="font-weight-bold mt-2 ml-2 mb-2"><i className="fa fa-circle-user text-success"></i>&nbsp;{getLoginUtilisateur()?.str_FIRST_LAST_NAME}</h5>
                                    <span className="mt-2 ml-2 mb-3"><i className="fa fa-arrow-circle-right text-success"></i>&nbsp;{getCurrentProfile()?.STR_PRODESCRIPTION}</span>
                                    <div className="menu-icon-grid">
                                        {
                                         loginUtilisateur.dataPro!==undefined && loginUtilisateur.dataPro.length >=2 ?
                                        <a href="#" role="button" onClick={(e) => { dispatch(popUpProfil(e)) }}><i className="i-Remove-User"></i>
                                        Basculer
                                        </a>
                                        : //pour les utilisateurs a 1 seul profil on affiche pas cette section
                                        null
                                        }
                                        <a href="" onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(getDataUtilisateur());
                                            dispatch(setformErreur([]))
                                            dispatch(setModalCompte({ ...modalCompte, open: true, size: "lg", btnclass: "d-none" }));
                                            dispatch(setCurrentUtilisateur([{ LG_UTIID: "", STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN: "", AGENCE: [{}] }]));
                                        }}><i className="i-Love-User"></i> 
                                        M-Compte
                                        </a>
                                        <a href="#" role="button" onClick={(e)=>{ e.preventDefault(); dispatch(setModalPreferences({...modalPreferences,open:true, size:"profil", title:"Préférences & accéssibilité"})) }}><i className="i-Double-Tap text-20 mr-2"></i> 
                                        Préférence
                                        </a>
                                        <a href="#" role="button" 
                                        onClick={(e) => { dispatch(doDisConnexion(BASEROOT+"Connexion"));
                                         dispatch(lockSession(e));
                                        }}>
                                            <i className="i-Lock-User"></i> 
                                        Déconnexion
                                        </a>
                                    </div>
                                </div>
                            </div> */}
                    {/* Fin de partie de droite */}
                        </div>
            </header>
        </>
    );
}

export default Header