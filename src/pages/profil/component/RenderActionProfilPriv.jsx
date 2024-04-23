import React from 'react';
import { Danger } from '../../../services/CustomToast';
import { collectProfilChecked } from '../../../services/Profil';

function RenderActionProfilPriv({item,index}) {
        /** A la selection d'un privilège on coche ou dechoche le checkbox puis on garde en memoire tt les id de privileges cochés
         *  @évènement onClick
         */
        const handleChange = (e) => {
                let $this           = e.target;
                let idDeducted      = $this.htmlFor;
                if ($this.getAttribute('data-id') !=="1") { // le menu groupe CONVERGENCE ne doit pas etre déchoché
                        let checkbox        = document.getElementById(idDeducted);
                        let newChekBoxState = !checkbox.checked;
                        checkbox.checked    = newChekBoxState;
                }else{
                        Danger.fire({ title: "Ce menu doit rester toujours coché." });
                }
                collectProfilChecked();
        };
        return (
                <div className="form-group mb-0 mx-2">
                        <div className="form-check pl-0">
                                <div className="custom-control custom-checkbox checkbox-info">
                                        <input checked={item.checked} onChange={(e) => { handleChange(e) }} data-id={item.LG_PRIID} type="checkbox" className="privileges_ custom-control-input" id={"ckd" + index} />
                                        <label onClick={(e) => { handleChange(e) }} data-id={item.LG_PRIID} data-profil={JSON.stringify(item)} className="custom-control-label" htmlFor={"ckd" + index}></label>
                                </div>
                        </div>
                </div>
        )
}

export default RenderActionProfilPriv