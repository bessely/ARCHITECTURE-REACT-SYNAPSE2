import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErreurObject from '../../../globalComponents/ErreurObject';
import Modal from '../../../globalComponents/Modal';
import { Info } from "../../../services/CustomToast";
import { collectProfilChecked, createProfil, createSwitchProfilPrivilege, updateProfil } from '../../../services/Profil';
import { filterData, purgeStrorage, validateData } from '../../../services/globalFunction';
import { setCurrentProfil, setModalProfil, setformErreur } from '../../../store/Profil/Profil';
import ListProfilPrivilege from './ListProfilPrivilege';

/**
 * LE COMPOSANT MODAL DE CREATION OU DE MODIFICATION D'UN PROFIL
 * CONTIENT LE FORMULAIRE DE CREATION OU DE MODIFICATION D'UN PROFIL ET LA LISTE DES PRIVILEGES (LES MENUS)
**/
function ModalProfil() {
    const { modalProfil, currentProfil, formErreur } = useSelector((state) => state.profils);
    const Dispacth = useDispatch();

    /** Pendant la saisi dans le formulaire d'un Profil
     * @évènement onChange
     **/
    const captureSaisie = (e) => {
        const { id, value } = e.target;
        console.log("Champ :", id, "Valeur :", value);
        Dispacth(setCurrentProfil({ ...currentProfil, [id]: value })); //<- sauvegardes des champs du formulaire
        Dispacth(setformErreur({ ...formErreur, [id]: "" }));
    }; 

    /** VALIDATION DU FORMULAIRE  : en attendant de maitriser formik
     * @param {array} data les champs du formulaire à valider
     * @function
     **/
    const validation = () => {
        var erreur = {};
        erreur.STR_PROTYPE           = validateData(currentProfil.STR_PROTYPE        ,"string",[3,32  ],true);
        // erreur.SOCIETE            = validateData(currentProfil.SOCIETE            ,"string",[3,255 ],true);
        erreur.STR_PRODESCRIPTION    = validateData(currentProfil.STR_PRODESCRIPTION ,"string",[3,255 ],true);
        erreur.STR_PRONAME           = validateData(currentProfil.STR_PRONAME        ,"string",[3,255 ],true);
        console.log(erreur);
        return  filterData(erreur,true);
    };

    /** soumission du formulaire de creation de profil après correction sauf en cas de suppression
     *  @évènement onClick
     **/
    const handleSubmit = (e) => {
        e.preventDefault();
        let errorlog = {};
        errorlog     = validation();
        console.log(errorlog);
        Dispacth(setformErreur(errorlog));
        if (Object.keys(errorlog).length === 0) {  //si plus ou pas d'erreur 
            if (modalProfil.mode === "creation") {
                console.log(currentProfil);
                Dispacth(createProfil(currentProfil)); //on gère en meme temps la création du privilège
                return;
            }
            if (modalProfil.mode === "modification") {
                collectProfilChecked();
                Dispacth(updateProfil(currentProfil));
                Dispacth(createSwitchProfilPrivilege(currentProfil.LG_PROID));
            }
        }else {
            Info.fire({ title: "Corrigez les erreurs!" });
        }
    };

    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!modalProfil.open) {
            purgeStrorage("tabChecked");
        }
    },[modalProfil.open]);

    return (
        <Modal
            modaleSate       = {modalProfil}
            setModalSate     = {setModalProfil}
            OnActionBtnClick = {handleSubmit}
        >
            <div className='border border-primary rounded p-3 register-modal shadow'  >
                <div className='form-row mb-2 mx-0 border border-ligth rounded p-3' style={{ backgroundColor: 'rgba(88, 115, 229, 0.1)' }}>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="STR_PRONAME">LIBELLE</label> <small className="text-danger">*</small>
                        <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_PRONAME" value={currentProfil.STR_PRONAME ?? ""} placeholder="Entrer le nom du profil" />
                        <ErreurObject>{formErreur.STR_PRONAME}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-6">
                        <label htmlFor="STR_PRODESCRIPTION">DESCRIPTION</label> <small className="text-danger">*</small>
                        <input onChange={captureSaisie} type="text" className="form-control mb-1" id="STR_PRODESCRIPTION" value={currentProfil.STR_PRODESCRIPTION ?? ""} placeholder="Entrer la description du profil" />
                        <ErreurObject>{formErreur.STR_PRODESCRIPTION}</ErreurObject>
                    </div>
                    <div className="form-group mb-0 col-md-12">
                        <label>Type</label>
                        <select className='form-control' onChange={captureSaisie} id="STR_PROTYPE" value={currentProfil.STR_PROTYPE}>
                            <option value="">Sélectionner un type de profil</option>
                            <option value="Système">Système</option>
                            <option value="Métier">Métier</option>
                        </select>
                        <ErreurObject>{formErreur.STR_PROTYPE}</ErreurObject>
                    </div>
                </div>
                <ListProfilPrivilege />
            </div>
        </Modal>
    )
}

export default ModalProfil