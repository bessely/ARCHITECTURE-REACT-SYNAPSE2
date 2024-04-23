import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../globalComponents/Modal';
import { Info } from '../../../services/CustomToast';
import { createUtilisateur, updateUtilisateur } from '../../../services/Utilisateurs';
import { filterData, validateData } from '../../../services/globalFunction';
import { setCurrentUtilisateur, setModalUtilisateur, setformErreur } from '../../../store/Utilisateurs/Utilisateur';
import FormUtilisateur from './FormUtilisateur';


function ModalUtilisateur(){
    const { modalUtilisateur, currentUtilisateur, formErreur } = useSelector((state) => state.utilisateurs);
    const { listAgenceOptions }                                = useSelector((state) => state.agences);
    const Dispacth                                             = useDispatch();
    /** Pendant la saisi dans le formulaire d'un Utilisateur
       * @évènement onChange
       */
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        Dispacth(setCurrentUtilisateur({ ...currentUtilisateur, [id]: value })); //<- sauvegardes des champs du formulaire
        Dispacth(setformErreur({ ...formErreur, [id]: "" }));
    };

    /** Renseigne les selections dans le state de l'acteur en cours(currentActor) de creation ou de modification
     *@param {string} typelist= {pays, groupe; statusjuri}
     *@param {object} item reviens avec l'element selectionné 
     *@function
     */
    const setSelection = (item) => {
        Dispacth(setCurrentUtilisateur({ ...currentUtilisateur, [item.typeList]: item }));
        Dispacth(setformErreur({ ...formErreur, [item.typeList]: "" }));
    };

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     */
    const validation = () => {
        var erreur = {};
        erreur.STR_UTIFIRSTNAME = validateData(currentUtilisateur.STR_UTIFIRSTNAME ,"string",[3,32  ],true);
        erreur.STR_UTILASTNAME  = validateData(currentUtilisateur.STR_UTILASTNAME  ,"string",[3,255 ],true);
        erreur.STR_UTILOGIN     = validateData(currentUtilisateur.STR_UTILOGIN     ,"string",[3,255 ],true);
        erreur.STR_UTIMATRICULE = validateData(currentUtilisateur.STR_UTIMATRICULE ,"string",[3,255 ],true);
        erreur.STR_UTIMAIL      = validateData(currentUtilisateur.STR_UTIMAIL      ,"mail"  ,[3,255 ],true);
        erreur.STR_UTIPHONE     = validateData(currentUtilisateur.STR_UTIPHONE     ,"string",[4,255 ],true);
        erreur.AGENCE           = validateData(currentUtilisateur.AGENCE?.value    ,"string",[3,255 ],true);
        return  filterData(erreur,true);
    };

    /** soumission du formulaire de creation d'utilisateur après correction sauf en cas de suppression
     *  @évènement onClick
     */
    const handleSubmit = (e) => {
        let errorlog = {};
        e.preventDefault();
        errorlog = validation();
        Dispacth(setformErreur(errorlog));
        if (Object.keys(errorlog).length === 0){  //si plus ou pas d'erreur  
            if (modalUtilisateur.mode === "creation"){
                Dispacth(createUtilisateur(currentUtilisateur));
            }
            if (modalUtilisateur.mode === "modification"){
                Dispacth(updateUtilisateur(currentUtilisateur));
            }
        }else {
            Info.fire({ title: "Corrigez les erreurs!" });
        }
    };
    return (
        <Modal
            modaleSate       = {modalUtilisateur}
            setModalSate     = {setModalUtilisateur}
            OnActionBtnClick = {handleSubmit}
        >
            <FormUtilisateur
                captureSaisie      = {captureSaisie}
                formErreur         = {formErreur}
                currentUtilisateur = {currentUtilisateur}
                setSelection       = {setSelection}
                listAgenceOptions  = {listAgenceOptions}
            /> 
        </Modal>
    )
}

export default ModalUtilisateur