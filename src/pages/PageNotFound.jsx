import React from 'react';
import { getCurrentPath, getThisInLocalstore } from '../services/globalFunction';
import { BASEROOT } from '../services/serveur';

function PageNotFound() {
    if (getCurrentPath() === "PageNotFound") {
        const premierLienAutorise = ()=>{
            let menuApplati = [];
            let menuAutorise = getThisInLocalstore("loginUtilisateur").groupmenu !== undefined ? getThisInLocalstore("loginUtilisateur")?.groupmenu[0]?.menu : false;
            if (menuAutorise) {
                for (let index = 0; index < menuAutorise.length; index++) {
                    if (menuAutorise[index].link !== "") {
                        menuApplati.push(menuAutorise[index].link);
                    }
                    if (menuAutorise[index].submenuList.length > 0) {
                        for (let j = 0; j < menuAutorise[index].submenuList.length; j++) {
                            if (menuAutorise[index].submenuList[j].link !== "") {
                                menuApplati.push(menuAutorise[index].submenuList[j].link);
                            }
                        }
                    }
                }
                if (menuApplati.length > 0) {
                    if (BASEROOT === "/") {
                        return menuApplati[0];
                    } else {
                        return "/convergence"+menuApplati[0];
                    }
                }
            }
            return BASEROOT+"Connexion";
        };
        return (
            <div className="not-found-wrap text-center m-0 p-0">
                <img src="APP_LOGO.png" width="150" className="navbar-logo" alt="logo" /> <br />
                <h1 className='text-muted mt-3'>PROJET STARTER</h1>
                <img width="550" className="m-0 p-0" src={BASEROOT + "assets/images/lost-page.svg"} alt={404} />
                <p className="mb-5 text-danger">Veuillez nous excuser ! Il semble que vous ayez essayé de visiter une page pour laquelle vous n’avez pas les autorisations nécessaires. 😊</p>
                <a className="btn btn-lg btn-success btn-rounded" href={premierLienAutorise()}>Retouner vers une page autorisée</a>
            </div>
        )
    }
    return (
        <div className="not-found-wrap text-center m-0 p-0">
                <img src="APP_LOGO.png" width="150" className="navbar-logo" alt="logo" /> <br />
                <h1 className='text-muted'>PROJET STARTER</h1>
                <img width="550" className="m-0 p-0" src={BASEROOT + "assets/images/lost-page.svg"} alt={404} />
                <p className="mb-5 text-muted text-18">Désolé ! la page que vous tentez de charger est introuvable.</p>
                <a className="btn btn-lg btn-success btn-rounded" href={BASEROOT + "Connexion"}>Retouner vers la page de connexion</a>
        </div>
    )
}

export default PageNotFound