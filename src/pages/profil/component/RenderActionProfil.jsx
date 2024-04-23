import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { collectProfilChecked, deleteProfil, getDataProfil } from '../../../services/Profil';
import { getCurrentPath } from '../../../services/globalFunction';
import { loadDataProfilPrivilegeList } from '../../../store/Profil/Privilege';
import { setCurrentProfil, setModalProfil, setformErreur } from '../../../store/Profil/Profil';

function RenderActionProfil({item,index}) {
        const dispatch = useDispatch(); 
        /** A la selection d'un profil
         *  @évènement onChange
         */
        const handleChange = (e) => {
                let $this           = e.target;
                let idDeducted      = $this.htmlFor;
                let checkbox        = document.getElementById(idDeducted);
                let newChekBoxState = !checkbox.checked;
                checkbox.checked    = newChekBoxState;
                collectProfilChecked();
        };
        /**SUPPRESSION D'UN ACTEUR
         * @param {object}  profil 
         * @function
         */
        const deleteProfilConfirme = (profil) => {
                Swal.fire({
                title              : profil.name,
                text               : "Confirmez la suppression ?",
                icon               : "warning",
                iconColor          : "red",
                focusConfirm       : false,
                buttonsStyling     : true,
                customClass        : {
                        confirmButton      : "btn-success",
                        cancelButton       : "btn-dark",
                },
                confirmButtonColor : '#d33',
                showCancelButton   : true,
                showCloseButton    : true,
                confirmButtonText  : "Supprimer",
                cancelButtonText   : "Annuler",
                }).then((result) => {
                if (result.isConfirmed) {
                        dispatch(deleteProfil(profil.id));
                }
                });
        };
        if (getCurrentPath()==="Profil") {
                return (
                        <div className="btn-group" role="group" aria-label="Basic example">
                                
                                <div onClick={(e) => {
                                                dispatch(setModalProfil({ open: true, mode:"modification", size: "lg", title: item.STR_PRODESCRIPTION, button:true,  buttonName:"Modifier", inputstate: "", btnclass: "btn btn-success" }));
                                                dispatch(setformErreur([]))
                                                dispatch(setCurrentProfil([ {LG_PROID:item.LG_PROID, STR_PRONAME:"", STR_PRODESCRIPTION:"", STR_PROTYPE: "", LG_SOCID:"", SOCIETE:[{}]} ]));
                                                dispatch(getDataProfil(item.LG_PROID));
                                                dispatch(loadDataProfilPrivilegeList({LG_PROID:item.LG_PROID}));
                                        }}
                                        role="button"
                                >
                                        <svg data-tooltip-id="readProfilDescription" data-tooltip-content={"Modifier / Consulter "+item.STR_PRODESCRIPTION} xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-success feather feather-edit">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        <Tooltip id="readProfilDescription" />
                                </div>
                                <div 
                                        role="button"
                                        onClick={(e) => {
                                                e.preventDefault()
                                                deleteProfilConfirme({id: item.LG_PROID, name:item.STR_PRONAME});
                                        }}
                                        >
                                        <svg data-tooltip-id="deleteProfilDescription"  data-tooltip-content={"Supprimer le profil "+item.STR_PRODESCRIPTION} data-background-color="red"  xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className=" text-danger ml-4 feather feather-x-circle">
                                                <circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} />
                                        </svg>
                                        <Tooltip id="deleteProfilDescription" />
                                </div>
                        </div>
                )
        }
        return (
                <div className="btn-group" role="group" aria-label="Basic example">
                        <div key={"globalinp_profil_" + index} className="form-group mb-0 mx-2">
                                <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info">
                                                <input type="checkbox" data-id={item.LG_PROID} data-profil={JSON.stringify(item)} className="profil custom-control-input" id={"ckd_pro" + index} />
                                                <label onClick={(e) => { handleChange(e) }} data-id={item.LG_PROID} data-profil={JSON.stringify(item)} className="profil_label custom-control-label" htmlFor={"ckd_pro" + index}></label>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default RenderActionProfil