import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErreurObject from '../../../globalComponents/ErreurObject';
import Modal from '../../../globalComponents/Modal';
import { createAgence, updateAgence } from '../../../services/Agence';
import { Info } from "../../../services/CustomToast";
import { filterData, validateData } from '../../../services/globalFunction';
import { setCurrentAgence, setModalAgence, setformErreur } from '../../../store/Agences/Agences';
function ModalAgence() {
    const { modalAgence, currentAgence, formErreur } = useSelector((state) => state.agences);
    const dispatch     = useDispatch();
    
    /** Pendant la saisi dans le formulaire d'un agence
     * @évènement onChange
     */
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        dispatch(setCurrentAgence({ ...currentAgence, [id]: value })); //<- sauvegardes des champs du formulaire
        dispatch(setformErreur({ ...formErreur, [id]: "" }));
    };

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     */
    const validation = () => {
        var erreur    = {};
        erreur.STR_AGECODE         = validateData(currentAgence.STR_AGECODE         ,"string" , [3,32  ],true );
        erreur.STR_AGECODEBCEAO    = validateData(currentAgence.STR_AGECODEBCEAO    ,"string" , [3,255 ],true );
        erreur.STR_AGEDESCRIPTION  = validateData(currentAgence.STR_AGEDESCRIPTION  ,"string" , [3,255 ],false);
        erreur.STR_AGELOCALISATION = validateData(currentAgence.STR_AGELOCALISATION ,"string" , [3,255 ],true );
        erreur.STR_AGEBP           = validateData(currentAgence.STR_AGEBP           ,"string" , [3,255 ],false);
        erreur.STR_AGEMAIL         = validateData(currentAgence.STR_AGEMAIL         ,"mail"   , [6,255 ],true);
        erreur.STR_AGEPHONE        = validateData(currentAgence.STR_AGEPHONE        ,"string" , [4,255 ],true );
        erreur.STR_VILLE           = validateData(currentAgence.STR_VILLE           ,"string" , [3,255 ],true );
        erreur.STR_AGELONGITUDE    = validateData(currentAgence.STR_AGELONGITUDE    ,"string" , [3,255 ],false);
        erreur.STR_AGELATITUDE     = validateData(currentAgence.STR_AGELATITUDE     ,"string" , [3,255 ],false);
        return  filterData(erreur,true);
    };

    /** soumission du formulaire de creation d'agence après correction sauf en cas de suppression
     *  @évènement onClick
     */
    const handleSubmit = (e) => {
        let errorlog = {};
        e.preventDefault();
        errorlog = validation();
        dispatch(setformErreur(errorlog));
        if (Object.keys(errorlog).length === 0){  //si plus ou pas d'erreur  
            if (modalAgence.mode === "creation") {
                dispatch(createAgence(currentAgence));
            }
            if (modalAgence.mode === "modification") {
                dispatch(updateAgence(currentAgence));
            }
        }else {
            Info.fire({title: "Corrigez les erreurs!"}); 
        }
    };
    return (
        <Modal
            modaleSate       = {modalAgence}
            setModalSate     = {setModalAgence}
            OnActionBtnClick = {handleSubmit}
        >
            <div className='border border-primary rounded p-3 register-modal shadow'>
                <form>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGECODE">Code agence</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGECODE"  value={currentAgence.STR_AGECODE??""} placeholder="Code de l'agence" />
                            <ErreurObject>{formErreur.STR_AGECODE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6"> 
                            <label htmlFor="STR_AGECODEBCEAO">Code BCEAO agence</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGECODEBCEAO"  value={currentAgence.STR_AGECODEBCEAO??""} placeholder="Code BCEAO de l'agence" />
                            <ErreurObject>{formErreur.STR_AGECODEBCEAO}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-12">
                            <label htmlFor="STR_AGEDESCRIPTION">Description</label>
                            <textarea  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGEDESCRIPTION" value={currentAgence.STR_AGEDESCRIPTION??""} placeholder="Une brève description de l'agence" />
                            <ErreurObject>{formErreur.STR_AGEDESCRIPTION}</ErreurObject>
                        </div>
                    </div>
                    <div className="form-row mb-2">
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_VILLE">Ville</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_VILLE" value={currentAgence.STR_VILLE??""} placeholder="Ville ou commune de l'agence" />
                            <ErreurObject>{formErreur.STR_VILLE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGELOCALISATION">Localisation</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGELOCALISATION" value={currentAgence.STR_AGELOCALISATION ?? ""} placeholder="Localisation dans la ville (Commune, Quartier, Secteur, etc.)" />
                            <ErreurObject>{formErreur.STR_AGELOCALISATION}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGELONGITUDE">Longitude</label>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGELONGITUDE"  value={currentAgence.STR_AGELONGITUDE ?? ""} placeholder="Coordonnées GPS de la longitude sur la carte" />
                            <ErreurObject>{formErreur.STR_AGELONGITUDE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGELATITUDE">Latitude</label>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGELATITUDE" value={currentAgence.STR_AGELATITUDE ?? ""} placeholder="Coordonnées GPS de la latitude sur la carte" />
                            <ErreurObject>{formErreur.STR_AGELATITUDE}</ErreurObject>
                        </div>
                    </div>

                    <div className="form-row mb-2">
                    <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGEBP">Boite postale</label>
                            <input  onChange={captureSaisie} type="phone" className="form-control mb-1" id="STR_AGEBP" value={currentAgence.STR_AGEBP ?? ""} placeholder="La boite postale de l'agence" />
                            <ErreurObject>{formErreur.STR_AGEBP}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-md-6">
                            <label htmlFor="STR_AGEPHONE">Téléphone</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="phone" className="form-control mb-1" id="STR_AGEPHONE" value={currentAgence.STR_AGEPHONE ?? ""} placeholder="+000 00 00 00 00 00 (Indicatif + Numéro)" />
                            <ErreurObject>{formErreur.STR_AGEPHONE}</ErreurObject>
                        </div>
                        <div className="form-group mb-0 col-12">
                            <label htmlFor="STR_AGEMAIL">Email</label> <small className="text-danger">*</small>
                            <input  onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_AGEMAIL" value={currentAgence.STR_AGEMAIL ?? ""} placeholder="exemplemail@mail.com" />
                            <ErreurObject>{formErreur.STR_AGEMAIL}</ErreurObject>
                        </div>
                    </div>

                </form>

            </div>
        </Modal>
    )
}

export default ModalAgence