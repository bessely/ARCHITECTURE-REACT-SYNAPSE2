import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Container from "../../globalComponents/Container";
import NavBar from "../../globalComponents/NavBar";
import { PAGINATION } from "../../globalComponents/Pagination";
import { CustumSelectStyl } from '../../services/CustumSelectStyl';
import { loadDataPisteAuditList } from '../../services/PisteAudit';
import { loadDataUtilisateurList } from '../../services/Utilisateurs';
import { setSelectedUser, setformErreur } from '../../store/PisteAudit/PisteAudit';
import ListAudit from './component/ListAudit';

function PisteAudit() {
    const [saisie, setSaisie] = useState({ LG_UTIID: "", DT_BEGIN: "", DT_END: "", STR_PISTYPE: "", start: 0, listParPage: PAGINATION.listParPage, search: "" });
    const dispatch = useDispatch();
    const { UtilisateurList } = useSelector((state) => state.utilisateurs);

    useEffect(() => {
        dispatch(loadDataUtilisateurList({ start: 0, listParPage: 5000 }));
    }, [dispatch]);

    const saisieEnCours = (e, id) => {
        if (id !== undefined) {
            setSaisie({ ...saisie, [id]: e.value });
            if (id === "LG_UTIID") {
                dispatch(setSelectedUser(e.value));
            }
        } else {
            let { id, value } = e.target;
            setSaisie({ ...saisie, [id]: value });
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === "Backspace" || e.key === "Delete" || e.key === "Enter") {
            if (saisie.search !== "") {
                dispatch(loadDataPisteAuditList({ LG_UTIID: saisie.LG_UTIID, DT_BEGIN: saisie.DT_BEGIN, DT_END: saisie.DT_END, STR_PISTYPE: saisie.STR_PISTYPE, start: 0, listParPage: PAGINATION.listParPage, search: "%" + saisie.search + "%" }))
            } else {
                dispatch(loadDataPisteAuditList({ LG_UTIID: saisie.LG_UTIID, DT_BEGIN: saisie.DT_BEGIN, DT_END: saisie.DT_END, STR_PISTYPE: saisie.STR_PISTYPE, start: 0, listParPage: PAGINATION.listParPage, search: "" }))
            }
        }
    };

    const clearItems = () => {
        setSaisie({ LG_UTIID: "", DT_BEGIN: "", DT_END: "", STR_PISTYPE: "", start: 0, listParPage: PAGINATION.listParPage, search: "" });
        dispatch(loadDataPisteAuditList({ LG_UTIID: saisie.LG_UTIID, DT_BEGIN: saisie.DT_BEGIN, DT_END: saisie.DT_END, STR_PISTYPE: saisie.STR_PISTYPE, start: 0, listParPage: PAGINATION.listParPage, search: "" }))
    }

    const TitlePage = "PISTE AUDIT"; // Titre de la page

    return (
        <>
            <NavBar title={TitlePage}>
                <div className="main-content-wrap mobile-menu-content bg-off-white m-0">
                    <Container TitlePage={TitlePage}>
                        {/* ZONE DE TRI */}
                            <div className="card mb-5" style={{backgroundColor:"#f5f5f5"}}>
                                <div className="card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#fff" }}>
                                       <div className="col-md-8 mb-3">
                                            <label htmlFor="listname">La liste des utilisateurs</label>
                                            <Select
                                                className="mb-1"
                                                id="LG_UTIID"
                                                placeholder="Selectionnez un utilisateur"
                                                styles={CustumSelectStyl}
                                                onChange={(e) => saisieEnCours(e, "LG_UTIID")}
                                                options={UtilisateurList}
                                            />
                                            <small role='button' className="form-text text-muted" onClick={(e) => { clearItems(e) }}>Cliquez ici pour vider tous les champs</small>
                                        </div>
                                    <div className="row w-100">
                                        <div className="col-md-3 mb-3">
                                            <label>Type</label>
                                            <select className='form-control' onChange={saisieEnCours} id="STR_PISTYPE" value={saisie.STR_PISTYPE}>
                                                <option value="">Sélectionner une action</option>
                                                <option value="Configuration">CONFIGURATION</option>
                                                <option value="Connexion">CONNEXION</option>
                                                <option value="création">CREATION</option>
                                                <option value="suppression">SUPPRESSION</option>
                                                <option value="Modification">MODIFICATION</option>
                                                <option value="Deconnexion">DECONNEXION</option>
                                                <option value="Reinitialisation">REINITIALISATION</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Date début</label>
                                            <input name="date" id="DT_BEGIN" placeholder="date placeholder" onChange={saisieEnCours} value={saisie.DT_BEGIN} type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label style={{ marginRight: 5 }}>Date fin</label>
                                            <input name="date" id="DT_END" placeholder="date placeholder" onChange={saisieEnCours} value={saisie.DT_END} type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-3">
                                            <button className="btn btn-outline-success btn-lg mt-4"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    dispatch(loadDataPisteAuditList({ LG_UTIID: saisie.LG_UTIID, DT_BEGIN: saisie.DT_BEGIN, DT_END: saisie.DT_END, STR_PISTYPE: saisie.STR_PISTYPE, start: 0, listParPage: PAGINATION.listParPage, search: "%" + saisie.search + "%" }))
                                                    dispatch(setformErreur([]))
                                                }}
                                            >
                                                <i className={"fa fa-search fs-4 mr-2 text-sucess font-weight-lighter"} />Démarrer la recherche
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* ZONE DE TRI */}

                        {/* ZONE DE RECHERCHE */}
                        <div className="card" style={{backgroundColor:"#f5f5f5"}}>
                            <div className="card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#fff" }}>
                                <div className="col-8 m-0">
                                <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie.search} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Affiner la recherche : saisissez un mot clé" />
                                    <small id="emailHelp1" className="form-text text-muted">Taper sur la touche Enter pour demarrer la recherche.</small>
                                </div>
                            </div>
                        </div>
                         {/* ZONE DE RECHERCHE */}
                         <div className="card mt-5">
                            <div className="card-body">
                                <ListAudit />
                            </div>
                        </div>
                    </Container>
                </div>
            </NavBar>
        </>
    )
}

export default PisteAudit;
