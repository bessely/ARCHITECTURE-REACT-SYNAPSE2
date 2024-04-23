import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';

/** LE COMPOSANT PRINCIPAL DES MODALES
 * @param {object} children Le contenu de la modale
 * @param {object} modaleSate L'etat de la modale
 * @param {function} setModalSate La fonction qui permet de modifier l'etat de la modale
 * @param {function} OnActionBtnClick La fonction qui permet de gerer l'action du bouton d'action de la modale
 * @returns JSX
 */
function Modal({children, modaleSate, setModalSate,OnActionBtnClick}) {

    const dispatch                  = useDispatch();
    let style                       = {display: 'block', paddingRight: 17};
    let overlay                     = 'modal-backdrop bg-dark fade show';

    // fermeture de la modale à partir du bouton de fermeture en haut à droite
    const closeButtonTrigger = (e)=>{
        e.preventDefault(); 
        dispatch(setModalSate({...modaleSate,open:false}));
    };

    // fermeture de la modale à partir de l'overlay (zone hors de la modale)
    const closeFromOutside = (e) => {
        e.preventDefault();
        if (!e.target.closest('.modal-dialog')) {
            dispatch(setModalSate({ ...modaleSate, open: false }));
        }
    };

    if (!modaleSate.open) {
        overlay = '';
        style   = {display: 'none'};
    }

    if (modaleSate.size===undefined || modaleSate.size === "") {
        dispatch(setModalSate({...modaleSate,size:"xl"}));
    }

    if (modaleSate.size === "fullscreen") {
        return (
            <>
                <div className={"" + (modaleSate.open ? "modal fade show" : "modal fade hide")} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" style={style} aria-modal="true">
                    <div className={""} role="document">
                        <div className="modal-content"  style={{position:'absolute', top:"0", bottom:"0", width: "100vw", height: "100vh", "borderRadius":"0"}}>
                            <div className="modal-body p-0" style={{ maxHeight: "900px", overflow: "auto" }}>
                                {/* Votre contenu */}
                                    {children}
                                {/* Votre contenu */}
                            </div>
                                {
                                    modaleSate.buttonName!=="" || modaleSate.buttonName!==undefined ?
                                        <div className="modal-footer">
                                            <button onClick={(e) => { closeButtonTrigger(e) }} className="btn btn-secondary" data-dismiss="modal"> Fermer </button>
                                            <button onClick={(e) => { OnActionBtnClick(e) }} type="button" className={modaleSate.btnclass}>{modaleSate.buttonName}</button>
                                        </div>
                                        :
                                        null
                                }
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (modaleSate.size === "profil") {
        return (
            <>
            <div onClick={(e) => { closeFromOutside(e) }}  className={"" +( modaleSate.open ? "modal fade show" : "modal fade hide")} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle-1" style={style} aria-modal="true">
                <div className={"modal-dialog modal-dialog-centered modal-"+modaleSate.size+""} role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                                {/* Votre contenu */}
                                    {children}
                                {/* Votre contenu */}

                        </div>
                    </div>
                </div>
            </div>
            <div className={overlay}></div>
        </>
        )
    }

    if (modaleSate.size === "critère") {
        return (
            <>
            <div onClick={(e) => { closeFromOutside(e) }}  className={"" +( modaleSate.open ? "modal fade show" : "modal fade hide")} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle-2" style={style} aria-modal="true">
                <div className={"modal-dialog modal-dialog-centered"} role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                                {/* Votre contenu */}
                                    {children}
                                {/* Votre contenu */}
                        </div>
                        {
                            modaleSate.buttonName!=="" || modaleSate.buttonName!==undefined ?
                                <div className="modal-footer">
                                    {/* <button onClick={(e) => { closeButtonTrigger(e) }} className="btn" data-dismiss="modal"> <i className="flaticon-cancel-12" /> Fermer</button> */}
                                    <button onClick={(e) => { OnActionBtnClick(e) }} type="button" className={modaleSate.btnclass}>{modaleSate.buttonName}</button>
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
            <div className={overlay}></div>
        </>
        )
    }

    if (modaleSate.size === "commentaire") {
        return (
            <>
            <div onClick={(e) => { closeFromOutside(e) }}  className={"" +( modaleSate.open ? "modal fade show" : "modal fade hide")} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle-2" style={style} aria-modal="true">
                <div className={"modal-dialog modal-lg modal-dialog-centered"} role="document">
                    <div className="modal-content p-0  border shadow">
                        <h6 className="modal-title m-2" id="exampleModalCenterTitle-1">{modaleSate.title}</h6> 
                        <div className="modal-body p-2">
                                {/* Votre contenu */}
                                    {children}
                                {/* Votre contenu */}
                        </div>
                            {
                                modaleSate.buttonName !== "" || modaleSate.buttonName !== undefined ?
                                    <div className="modal-footer">
                                        <button onClick={(e) => { closeButtonTrigger(e) }} className="btn btn-secondary" data-dismiss="modal">  Fermer</button>
                                        <button onClick={(e) => { OnActionBtnClick(e) }} type="button" className={modaleSate.btnclass}>{modaleSate.buttonName}</button>
                                    </div>
                                    :
                                    ""
                            }
                    </div>
                </div>
            </div>
            <div className={overlay}></div>
        </>
        )
    }

    if (modaleSate.size === "session") {
        return (
            <>
                <div onClick={(e) => { OnActionBtnClick(e) }} className={"" + (modaleSate.open ? "modal fade show" : "modal fade hide")} role="dialog" aria-labelledby="myExtraLargeModalLabel" style={{ display: 'block', paddingRight: 17, zIndex: 1059 }} aria-modal="false">
                    <div className={""} role="document">
                        <div className="modal-content" style={{ position: 'absolute', top: "0", bottom: "0", width: "100vw", height: "auto", "borderRadius": "0" }}>
                            <div className="modal-body p-0 m-0">
                                {/* Votre contenu */}
                                {children}
                                {/* Votre contenu */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (modaleSate.size === "lg"){
        return (
            <>
                <div onClick={(e) => { closeFromOutside(e) }} className={"" + (modaleSate.open ? "modal animated slideInRight show" : "modal fade hide")} tabIndex={-1} role="dialog" aria-labelledby="myExtraLargeModalLabel" style={style} aria-modal="true">
                    <div className={"modal-dialog modal-lg modal-dialog-centered"} role="document" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',width: '90%', maxWidth: '90%' }}>
                        <div className="modal-content" style={{ width: '100%', height: '80vh' }}>
                            <div className="modal-header">
                                <h5 className="modal-title text-success" id="myExtraLargeModalLabel">{modaleSate.title}</h5>
                                <button onClick={(e) => { closeButtonTrigger(e) }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} /></svg>
                                </button>
                            </div>
                            <div className="modal-body p-3" style={{ maxHeight: "700px", overflow: "auto" }}>
                                {/* Votre contenu */}
                                {children}
                                {/* Votre contenu */}
                            </div>
                            {
                                modaleSate.buttonName !== "" || modaleSate.buttonName !== undefined ?
                                    <div className="modal-footer">
                                        <Tooltip />
                                        <button onClick={(e) => { closeButtonTrigger(e) }} className="btn btn-outline-dark" data-dismiss="modal">Fermer</button>
                                        <button onClick={(e) => { OnActionBtnClick(e) }} type="button" className={modaleSate.btnclass}>{modaleSate.buttonName}</button>
                                    </div>
                                    :
                                    ""
                            }
                        </div>
                    </div>
                </div>
                <div className={overlay}></div>
            </>
        )
    }

    // default size xl ici
    return (
        <>
            <div onClick={(e) => { closeFromOutside(e) }} className={"" + (modaleSate.open ? "modal animated slideInRight show" : "modal fade hide")} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" style={style} aria-modal="true">
                <div className={"modal-dialog modal-"+modaleSate.size+""} role="document" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '90%' }}>
                    <div className="modal-content" style={{ width: '100%', height: '80vh' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{modaleSate.title}</h5> 
                            <button onClick={(e) => { closeButtonTrigger(e) }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx={12} cy={12} r={10} /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} /></svg>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: "700px", overflow: "auto" }}>
                                {/* Votre contenu */}
                                    {children}
                                {/* Votre contenu */}
                        </div>
                                {
                                    modaleSate.buttonName!=="" || modaleSate.buttonName!==undefined ?
                                        <div className="modal-footer">
                                            <Tooltip/>
                                            <button onClick={(e) => { closeButtonTrigger(e) }} className="btn btn-secondary" data-dismiss="modal">  Fermer</button>
                                            <button onClick={(e) => { OnActionBtnClick(e) }} type="button" className={modaleSate.btnclass}>{modaleSate.buttonName}</button>
                                        </div>
                                        :
                                        ""
                                }
                    </div>
                </div>
            </div>
            <div className={overlay}></div>
        </>
    )
}

export default Modal