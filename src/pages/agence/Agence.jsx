import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from "../../globalComponents/Container";
import NavBar from "../../globalComponents/NavBar";
import { PAGINATION } from "../../globalComponents/Pagination";
import { loadDataAgenceList } from '../../services/Agence';
import { setCurrentAgence, setformErreur, setModalAgence } from '../../store/Agences/Agences';
import ListAgence from './component/ListAgence';
import ModalAgence from './component/ModalAgence';

function Agence() {  
  const [saisie, setSaisie] = useState("");
  const dispatch            = useDispatch();
  
  /**La saisie dans le input de recherche 
   * @évènement onChange
  */
  const saisieEnCours = (e) => {
    setSaisie(e.target.value);
  };

  /**manipulation des touches pendant la recherche
  * @évènement onKeyUp
  */
  const handleKeyUp = (e) => {
    if (e.key === "Backspace" || e.key === "Delete" || e.key ==="Enter") {
        if (saisie!=="") {
          dispatch(loadDataAgenceList({ search: "%"+saisie+"%", start: 0, listParPage: PAGINATION.listParPage }));
        }else{
          dispatch(loadDataAgenceList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
        }
    }
  };

  const TitlePage = "Agence";

  return (
    <>
    <NavBar title={TitlePage}>
        <div className="main-content-wrap mobile-menu-content bg-off-white m-0">
              <Container TitlePage={TitlePage}>
                <div className="col-md-12 mb-4">
                    <div className="card">
                        {/* ZONE DE RECHERCHE */}
                          <div className="card d-flex flex-wrap flex-row justify-content-between mb-3 p-3" style={{ backgroundColor: "#f5f5f5" }} >
                                <div className="col-8 m-0">
                                  <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Rechercher une utilisateur : saisissez un mot clé" />
                                  <small id="emailHelp1" className="form-text text-muted">Taper sur la touche Enter pour demarrer la recherche.</small>
                                </div>
                                <button className="col-2 btn btn-outline-success m-0 p-0  btn-lg"
                                         onClick={(e)=>
                                            {
                                              e.preventDefault()
                                              dispatch(setCurrentAgence([]))
                                              dispatch(setformErreur([]))
                                              dispatch(setModalAgence({ open: true, mode:"creation", size: "lg", title: "Nouvelle Agence", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-success" }))}
                                            }
                                >
                                  Nouvelle agence
                                </button>
                              </div>
                         {/* ZONE DE RECHERCHE */}
                        <div className="card-body">
                          <ListAgence />
                        </div>
                    </div>
                </div>
              </Container>
        </div>
    </NavBar>
    <ModalAgence/>
  </>
  )
}

export default Agence;