import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { getBindProfilUser } from '../../../services/Profil';
import { deleteUtilisateur, getDataUtilisateur } from '../../../services/Utilisateurs';
import { setModalAssoProfil } from '../../../store/Profil/Profil';
import { setCurrentUtilisateur, setModalUtilisateur, setformErreur } from '../../../store/Utilisateurs/Utilisateur';

/**
 * 
 * @param {object} item represente un utilisateur
 * @returns 
 */
function RenderActionUtilisateur({item}) {
        const dispatch = useDispatch();

        /**CONFIRMATION DE SUPPRESSION D'UN UTILISATEUR
         * @param {object}  utilisateur 
         * @function
         */
        const deleteUtilisateurConfirme = (utilisateur) => {
                Swal.fire({
                title          : utilisateur.name,
                text           : "Confirmez la suppression ?",
                icon           : "warning",
                iconColor      : "red",
                focusConfirm   : false,
                buttonsStyling : true,
                customClass:
                {
                        confirmButton : "btn-success",
                        cancelButton  : "btn-dark",
                },
                confirmButtonColor : '#d33',
                showCancelButton   : true,
                showCloseButton    : true,
                confirmButtonText  : "Supprimer",
                cancelButtonText   : "Annuler",
                }).then((result) => {
                if (result.isConfirmed) {
                        dispatch(deleteUtilisateur(utilisateur.id));
                }
                });
        };

        return (
                <div className="btn-group" role="group" aria-label="Basic example">
                        <div onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setModalUtilisateur({ open: true, mode: "modification", size: "lg", title: item.STR_UTIFIRSTNAME, button: true, buttonName: "Modifier", inputstate: "", btnclass: "btn btn-success" }));
                                        dispatch(setformErreur([]))
                                        dispatch(setCurrentUtilisateur([{ LG_UTIID: item.LG_UTIID, STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN:"",  AGENCE:[{}] }]));
                                        dispatch(getDataUtilisateur(item.LG_UTIID));
                                }}  role="button"
                        >
                                <svg data-tooltip-id="editTooltip" data-tooltip-content={"Modifier / Consulter "+item.STR_UTIFIRSTLASTNAME} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-success feather feather-edit">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                <Tooltip id='editTooltip'/>
                        </div>

                        <div onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(setCurrentUtilisateur([{ LG_UTIID: item.LG_UTIID, STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN: "", AGENCE: [{}] }]));
                                        dispatch(setModalAssoProfil({ open: true, mode: "creation", size: "lg", title: "les profils à rattacher à : " + item.STR_UTIFIRSTLASTNAME + " de l'agence " + item.LG_AGEID, button: true, buttonName: "Enregistrer", inputstate: "", btnclass: "btn btn-success" }))
                                        dispatch(getBindProfilUser(item.LG_UTIID));
                                }}
                                role="button"
                        >
                                <svg data-tooltip-id="linkTooltip" data-tooltip-content="Rattacher des profils utilisateurs" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-warning feather feather-user-check ml-4 ">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy={7} r={4} /><polyline points="17 11 19 13 23 9" />
                                </svg>
                                <Tooltip id='linkTooltip'/>
                        </div>
                        <div
                                onClick={(e) => {
                                        e.preventDefault()
                                        deleteUtilisateurConfirme({ id: item.LG_UTIID, name: item.STR_UTIFIRSTNAME });
                                }}
                                role="button"
                        >
                                <svg data-tooltip-id="deleteTooltip" data-tooltip-content={"Supprimer "+item.STR_UTIFIRSTLASTNAME} data-background-color="red" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
                                        <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                                </svg>
                                <Tooltip id='deleteTooltip'/>
                        </div>
                </div>
        )
}

export default RenderActionUtilisateur