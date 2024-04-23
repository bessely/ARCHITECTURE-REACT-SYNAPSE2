import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import DataTable from '../../../globalComponents/DataTable';
import Modal from '../../../globalComponents/Modal';
import { Danger } from '../../../services/CustomToast';
import { bindProfilToCompte, bindProfilToUser } from '../../../services/Profil';
import { formatLargeLabel, getCurrentPath, getThisInLocalstore, purgeStrorage } from '../../../services/globalFunction';
import { setModalAssoProfil, } from '../../../store/Profil/Profil';
import RenderActionProfil from './RenderActionProfil';

function ModalAssoProfil() {
    const dispacth = useDispatch();
    const { status, profilList, modalAssoProfil } = useSelector(state => state.profils);
    const { currentUtilisateur } = useSelector(state => state.utilisateurs);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!modalAssoProfil.open) {
            purgeStrorage("tabChecked");
        }
    }, [modalAssoProfil.open]);
    /** soumission du rapprochement automatique
     *  @évènement onClick
     */
    const handleSubmit = (e) => {
        let tabChecked = getThisInLocalstore("tabChecked") ? getThisInLocalstore("tabChecked") : [];
        if (tabChecked.length===0) {
        Danger.fire({ title: "Selectionnez au moins un profil." });
        }else{
        if (getCurrentPath() === "Utilisateur") {
            dispacth(bindProfilToUser(currentUtilisateur[0]?.LG_UTIID));
        }
        if (getCurrentPath() === "Societe") {
            dispacth(bindProfilToCompte());
        }
            dispacth(setModalAssoProfil({ ...modalAssoProfil,open:false}));
        }
    };

    return (
        <Modal
            modaleSate       = {modalAssoProfil}
            setModalSate     = {setModalAssoProfil}
            OnActionBtnClick = {handleSubmit}
        >
        <div className="widget-content widget-content-area br-6">
                <DataTable
                    footer        = {false}
                    dataTableName = "profilList"
                    data          = {profilList}
                    loader        = {status.profil}
                    column        = {
                        [
                            {name : '#'              ,class:"text-left"   ,dataKey:"#"                  ,dataKeyClass:'text-left'   },
                            {name : 'DESCRIPTION'    ,class:"text-left" ,dataKey:"STR_PRODESCRIPTION" ,dataKeyClass:'text-left',
                                action : (item)=>{
                                    return (
                                        item?.STR_PRODESCRIPTION?.length>30 ?
                                            <>
                                                <div data-tooltip-id="myDescription" data-tooltip-content={item.STR_PRODESCRIPTION} > {formatLargeLabel(30,item.STR_PRODESCRIPTION)}</div>
                                                <Tooltip id="myDescription"/>
                                            </>
                                        :
                                            item.STR_PRODESCRIPTION
                                    );
                                }
                            },
                            {name : 'LIBELLE' ,class:"text-center" ,dataKey:"STR_PRONAME" ,dataKeyClass:'text-left'  ,
                                action : (item)=>{
                                    return (
                                        item?.STR_PRONAME?.length>30 ?
                                            <>
                                                {/* <ReactTooltip /> */}
                                                <div data-tip={item.STR_PRONAME} > {formatLargeLabel(30,item.STR_PRONAME)}</div>
                                            </>
                                        :
                                            item.STR_PRONAME
                                    );
                                }
                            },
                            {name : 'ACTION'        ,class:"text-center",dataKey:"", 
                                action: (item,index)=>{
                                    return (<RenderActionProfil item={item} index={index} />);
                                }, 
                                dataKeyClass:'text-center'
                            }
                        ]
                    }
                />
        </div>
        </Modal>
    )
}

export default ModalAssoProfil