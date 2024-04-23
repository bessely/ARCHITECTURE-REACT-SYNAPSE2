import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from "../../globalComponents/Container";
import NavBar from "../../globalComponents/NavBar";
import { PAGINATION } from "../../globalComponents/Pagination";
import { loadDataProfilList } from '../../services/Profil';
import { initProfilState, loadDataProfilPrivilegeList } from '../../store/Profil/Privilege';
import { setCurrentProfil, setModalProfil, setformErreur } from '../../store/Profil/Profil';
import ListProfil from './component/ListProfil';
import ModalProfil from './component/ModalProfil';

/**
 * LE COMPOSANT PRINCIPAL DE LA PAGES  PROFILS
*/
function Profil() {
  const [saisie, setSaisie]     = useState("");
  const dispatch                = useDispatch();

  useEffect(() => {
    dispatch(loadDataProfilList({ start: 0, listParPage: PAGINATION.listParPage }));
    dispatch(loadDataProfilPrivilegeList({ start: 0, listParPage: PAGINATION.listParPage }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  
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
        if (saisie!=="") 
        {
          dispatch(loadDataProfilList({ search: "%"+saisie+"%", start: 0, listParPage: PAGINATION.listParPage }));
        }else{
          dispatch(loadDataProfilList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
        }
    }
  };

  const TitlePage = "Profils"; // Titre de la page

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
                                      <input type="search" onChange={saisieEnCours} onKeyUp={handleKeyUp} value={saisie} className="form-control" id="search" aria-describedby="emailHelp1" placeholder="Rechercher un Profil : saisissez un mot clé" />
                                      <small id="emailHelp1" className="form-text text-muted">Taper sur la touche Enter pour demarrer la recherche.</small>
                                    </div>
                                    <button className="col-2 btn btn-outline-success m-0 p-0  btn-lg"
                                            onClick={(e)=>{
                                              e.preventDefault()
                                              dispatch(initProfilState())
                                              dispatch(setCurrentProfil({LG_PROID: "", STR_PRONAME:"", STR_PRODESCRIPTION:"", STR_PROTYPE: "", SOCIETE: [{}] }))
                                              dispatch(setformErreur([]))
                                              dispatch(setModalProfil({ open: true, mode:"creation", size: "lg", title: "Nouveau Profil", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-success" }))
                                            }
                                          }
                                    >
                                    Nouveau Profil
                                    </button>
                                  </div>
                            {/* ZONE DE RECHERCHE */}
                            <div className="card-body">
                              <ListProfil />
                            </div>
                        </div>
                    </div>
                  </Container>
            </div>
        </NavBar>
      <ModalProfil/>
    </>
  )
}

export default Profil;