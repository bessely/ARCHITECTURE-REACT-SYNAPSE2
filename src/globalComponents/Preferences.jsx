import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Success } from '../services/CustomToast';
import { getThisInLocalstore, writeThisInLocalstore } from '../services/globalFunction';
import { setModalPreferences } from '../store/Utilisateurs/Utilisateur';
import Modal from './Modal';

function Preferences() {
        const {modalPreferences} = useSelector((state) => state.utilisateurs);
        useEffect(() => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [modalPreferences]);
        const handleClick = (e)=>{
                let $this           = e.target;
                let idDeducted      = $this.htmlFor;
                let checkbox        = document.getElementById(idDeducted);
                let newChekBoxState = !checkbox.checked;
                checkbox.checked    = newChekBoxState;
                writeThisInLocalstore(newChekBoxState, idDeducted);
                switch (idDeducted) {
                        case "prefAudio":
                                if (getThisInLocalstore("prefAudio")) {
                                        Success.fire({title:"Correctement pris en compte"})
                                }
                                break
                        case "prefVoice":
                                if (getThisInLocalstore("prefVoice")) {
                                        Success.fire({title:"Correctement pris en compte"})
                                }
                                break
                        default:
                                break;
                }
        }
        return (
                <Modal
                        modaleSate       = {modalPreferences}
                        setModalSate     = {setModalPreferences}
                        OnActionBtnClick = {handleClick}
                >
                        <h5 className='text-center text-muted'>Préférences & accessibilité</h5>
                        <hr className="line-dark" />
                        <div className='bg-light p-3 border rounded shadow-sm mb-2'> 
                                <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info" >
                                                <input type="checkbox" onChange={(e)=>{}} checked={getThisInLocalstore("prefAudio")}  className="preference custom-control-input" id="prefAudio" />
                                                <label  onClick={(e)=>{handleClick(e)}}  className="preference custom-control-label" htmlFor="prefAudio"  >Activer les notifications sonores </label>
                                        </div>
                                </div>
                        </div>
                        <div className='bg-light p-3 border rounded shadow-sm mb-2'> 
                                <div className="form-check pl-0">
                                        <div className="custom-control custom-checkbox checkbox-info" >
                                                <input type="checkbox" onChange={(e)=>{}} checked={getThisInLocalstore("prefVoice")}  className="preference custom-control-input" id="prefVoice" />
                                                <label  onClick={(e)=>{handleClick(e)}}  className="preference custom-control-label" htmlFor="prefVoice"  >Activer la lecture du texte des notifications  </label>
                                        </div>
                                </div>
                        </div>
                </Modal>
        )
}

export default Preferences