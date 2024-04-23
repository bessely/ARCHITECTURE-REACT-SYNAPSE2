import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import NavBar from "../../globalComponents/NavBar";
import ListUtilisateur from '../utilisateur/component/ListUtilisateur';
import ModalUtilisateur from '../utilisateur/component/ModalUtilisateur';
import { setCurrentUtilisateur, setModalUtilisateur, setformErreur } from '../../store/Utilisateurs/Utilisateur';
import Container from '../../globalComponents/Container';
import { loadDataUtilisateurList } from '../../services/Utilisateurs';
import { PAGINATION } from '../../globalComponents/Pagination';

/**
 * LE DASHBOARD
 * @returns JSX
 */
function Utilisateur() {
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
              dispatch(loadDataUtilisateurList({ search: "%"+saisie+"%", start: 0, listParPage: PAGINATION.listParPage }));
            }else{
              dispatch(loadDataUtilisateurList({ search: saisie, start: 0, listParPage: PAGINATION.listParPage }));
            }
        }
      };
  

  const TitlePage = "Utilisateur"; // Titre de la page
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
                                          onClick={(e)=>{
                                              dispatch(setformErreur([]));
                                              dispatch(setModalUtilisateur({ open: true, mode:"creation", size: "lg", title: "Nouvel utilisateur", button:true,  buttonName:"Enregistrer", inputstate: "", btnclass: "btn btn-success" }));
                                              dispatch(setCurrentUtilisateur([{ LG_UTIID: "", STR_UTIMAIL: "", STR_UTIPHONE: "", STR_UTIPIC: "", STR_UTIFIRSTNAME: "", STR_UTILASTNAME: "", STR_UTILOGIN:"",  AGENCE:[{}] }]));
                                          }}
                                  >
                                    Nouvel utilisateur
                                  </button>
                                </div>
                           {/* ZONE DE RECHERCHE */}
                          <div className="card-body">
                            <ListUtilisateur/>
                          </div>
                      </div>
                  </div>
                </Container>
          </div>
      </NavBar>
      <ModalUtilisateur/>
    </>
  )
}

export default Utilisateur;