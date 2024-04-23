import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormPassUser from '../pages/utilisateur/component/FormPassUser';
import FormUtilisateur from '../pages/utilisateur/component/FormUtilisateur';
import { Info } from '../services/CustomToast';
import { changePassWord, updateUtilisateur } from '../services/Utilisateurs';
import { filterData, validateData } from '../services/globalFunction';
import { setCurrentUtilisateur, setModalCompte, setformErreur } from '../store/Utilisateurs/Utilisateur';
import Modal from './Modal';

/**
 * MODALE DE GESTION DU COMPE DE L'UTILISATEUR CONNECTE
 * COMPOSANT AUTONONE
 * IL CONTIENT LE FORMULAIRE DE MODIFICATION DES INFOS DU COMPTE DE L'UTILISATEUR CONNECTE [FormUtilisateur.jsx]
 * IL CONTIENT LE FORMULAIRE DE MODIFICATION DU PASSWORD DE L'UTILISATEUR CONNECTE [FormPassUser.jsx]
 **/
function Compte() {
  const { modalCompte,currentUtilisateur, formErreur } = useSelector((state) => state.utilisateurs);
  const { listAgenceOptions } = useSelector((state) => state.agences);
  const Dispacth = useDispatch();
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
   * @function
   */
  const setSelection = (item) => {
    Dispacth(setCurrentUtilisateur({ ...currentUtilisateur, [item.typeList]: item }));
    Dispacth(setformErreur({ ...formErreur, [item.typeList]: "" }));
  };

  /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
   * @param {array} data les champs du formulaire à valider
   * @function
   */
  const validation = (form) => {
    var erreur = {};
    if (form === "pwsd") {
      erreur.OLD_PASSWORD  = validateData(currentUtilisateur.OLD_PASSWORD ,"string",[4,32],true);
      erreur.NEW_PASSWORD  = validateData(currentUtilisateur.NEW_PASSWORD ,"string",[4,32],true);
      if (currentUtilisateur.NEW_PASSWORD !== currentUtilisateur.NEW_PASSWORD2) {
        erreur.NEW_PASSWORD2 = "les 2 mots de passe sont différents !";
        erreur.NEW_PASSWORD  = "les 2 mots de passe sont différents !";
      }
      return  filterData(erreur,true);
    }
    erreur.STR_UTIFIRSTNAME = validateData(currentUtilisateur.STR_UTIFIRSTNAME ,"string",[3,32  ],true);
    erreur.STR_UTILASTNAME  = validateData(currentUtilisateur.STR_UTILASTNAME  ,"string",[3,255 ],true);
    erreur.STR_UTILOGIN     = validateData(currentUtilisateur.STR_UTILOGIN     ,"string",[3,255 ],true);
    erreur.STR_UTIMATRICULE = validateData(currentUtilisateur.STR_UTIMATRICULE ,"string",[3,255 ],true);
    erreur.STR_UTIMAIL      = validateData(currentUtilisateur.STR_UTIMAIL      ,"mail"  ,[3,255 ],true);
    erreur.STR_UTIPHONE     = validateData(currentUtilisateur.STR_UTIPHONE     ,"string",[3,255 ],true);
    // erreur.AGENCE           = validateData(currentUtilisateur.AGENCE           ,"string",[3,255 ],true);
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
    if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur  
      Dispacth(updateUtilisateur(currentUtilisateur));
    }
    else {
      Info.fire({ title: "Corrigez les erreurs!" });
    }
  };

  const handleSubmitPwd = (e) => {
    e.preventDefault();
    let errorlog = {};
    errorlog     = validation("pwsd");
    Dispacth(setformErreur(errorlog));
    if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur  
      Dispacth(changePassWord(currentUtilisateur));
    }
    else {
      Info.fire({ title: "Corrigez les erreurs!" });
    }
  };
  
  return (
    <Modal
      modaleSate       = {modalCompte}
      setModalSate     = {setModalCompte}
      OnActionBtnClick = {handleSubmit}
    >
      <div className='d-flex flex-wrap justify-content-between rounded'>
        <p>Mes identifiants</p>
        <FormUtilisateur
          handleSubmit       = {handleSubmit}
          captureSaisie      = {captureSaisie}
          formErreur         = {formErreur}
          currentUtilisateur = {currentUtilisateur}
          setSelection       = {setSelection}
          listAgenceOptions  = {listAgenceOptions}
          className          = 'col-12 mb-3'
          btnTitle           = 'Mettre à jour'
          formType           = 'compte'
        />
        <br />
        <br />
        <p>Mon mot de passe</p>
        <FormPassUser
          handleSubmitPwd    = {handleSubmitPwd}
          captureSaisie      = {captureSaisie}
          formErreur         = {formErreur}
          currentUtilisateur = {currentUtilisateur}
          className          = 'col-12 mb-3'
        />
      </div>
    </Modal>
  )
}

export default Compte