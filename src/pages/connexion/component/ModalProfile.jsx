import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Modal from '../../../globalComponents/Modal';
import { switchProfil } from '../../../services/Utilisateurs';
import { formatLargeLabel } from '../../../services/globalFunction';
import { setModalProfile } from '../../../store/Utilisateurs/Utilisateur';

/** MODAL QUI PERMET DE CHOISIR UN PROFIL
 * @returns JSX
 */
function ModalProfile() {
    const dispatch       = useDispatch();
    const { modalProfile, loginUtilisateur } = useSelector((state) => state.utilisateurs);
    return (
        <Modal
             modaleSate   = {modalProfile}
             setModalSate = {setModalProfile}
        >
            <form>
                <p className="text-center"> <span className="font-weight-bold text-success">{loginUtilisateur ? "Bonjour, "+loginUtilisateur.str_FIRST_LAST_NAME : "Bonjour, "} </span> <br /> <small className=' text-muted font-weight-bold'>Choisissez un profil.</small></p>
                <ul className="list-group task-list-group shadow-sm text-center">
                    {
                        loginUtilisateur.dataPro!==undefined ?
                        loginUtilisateur.dataPro.map((item, index) => {
                            return (
                                (item.lg_PROFIL_ID!==undefined && item.STR_PRODESCRIPTION!==undefined && item.STR_PRONAME!==undefined) ?
                                        <li key={`profil-${index}`} className="list-group-item list-group-item-action p-2 m-0"
                                            onClick={(e) => {
                                                dispatch(switchProfil(e,item.lg_PROFIL_ID));
                                            }}
                                        >
                                            <div className="n-chk">
                                                <label className="new-control new-checkbox checkbox-primary w-100 justify-content-between">
                                                    <span className="new-control-indicator" />
                                                    <span className="ml-2">
                                                        {
                                                            item?.STR_PRODESCRIPTION?.length>35 ?
                                                                <>
                                                                    <span  data-tooltip-id="myTooltip" data-tooltip-content={item.STR_PRODESCRIPTION} className='m-0 p-0' role='button' > {formatLargeLabel(35,item.STR_PRODESCRIPTION)}</span>
                                                                </>
                                                            :
                                                                <>
                                                                    <span data-tooltip-id="myTooltip" data-tooltip-content={item.STR_PRONAME} className='m-0 p-0' role='button' > {item.STR_PRODESCRIPTION}</span>
                                                                </>
                                                        }
                                                        <Tooltip id='myTooltip' 
                                                         />
                                                    </span>
                                                </label>
                                            </div>
                                        </li>
                                        :
                                        null
                                )
                        })
                        :
                        null
                    }
                </ul>
            </form>
        </Modal>
    )
}

export default ModalProfile