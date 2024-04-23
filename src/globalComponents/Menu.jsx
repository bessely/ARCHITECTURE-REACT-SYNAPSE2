// Menu.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Danger } from '../services/CustomToast';
import { doDisConnexion, menuDispose } from '../services/Utilisateurs';
import { getThisInLocalstore } from '../services/globalFunction';
import { BASEROOT } from '../services/serveur';
import { setCurrentProfile, setLoginUtilisateur, setMenu, setSubMenuState } from '../store/Utilisateurs/Utilisateur';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/free-regular-svg-icons';
import Submenu from './Submenu';

// Styles CSS à intégrer dans le composant Menu
const styles = `
    /* Pour une transition plus douce */
    .menu li a i {
        transition: transform 30s ease;
    }

    /* Pour la rotation de l'icône */
    .rotate-90 {
        transform: rotate(90deg);
    }
`;

function Menu() {
    const { menu, currentProfile } = useSelector((state) => state.utilisateurs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoginUtilisateur(getThisInLocalstore("loginUtilisateur")));
        dispatch(setCurrentProfile(getThisInLocalstore("currentProfile")));
        if (currentProfile !== "") {
            dispatch(menuDispose(currentProfile));
        } else {
            if (getThisInLocalstore("currentProfile") !== "") {
                dispatch(menuDispose(getThisInLocalstore("currentProfile")));
            } else {
                Danger.fire("Vous n'avez pas de profil, Déconnexion en cours.");
                setTimeout(() => {
                    dispatch(doDisConnexion());
                }, 1000);
            }
        }
    }, [currentProfile, dispatch]);

    // État local pour suivre l'état d'affichage des sous-menus
    const [submenuVisible, setSubmenuVisible] = useState({});

    const handleMenuClick = (e, key) => {
        e.preventDefault();
        let Newmenu = [...menu];
        for (let index = 0; index < menu.length; index++) {
            if (index === key) {
                if (Newmenu[index].link !== "") {
                    if (BASEROOT === "/") {
                        window.location.href = Newmenu[index].link;
                    } else {
                        window.location.href = BASEROOT + Newmenu[index].link;
                    }
                } else {
                    // Mettre à jour l'état local pour afficher ou masquer les sous-menus
                    setSubmenuVisible({ ...submenuVisible, [key]: !submenuVisible[key] });
                    dispatch(setSubMenuState("active"));
                    Newmenu[index] = { ...Newmenu[index], state: "active" };
                }
            } else { 
                Newmenu[index] = { ...Newmenu[index], state: "hide" };
            }
        }
        dispatch(setMenu(Newmenu));
    };

    return (
        <>
             <style>{styles}</style>
            <ul className="menu-metismenu" id="menu">
                {menu.length > 0 ? menu.map((item, key) => (
                    <li className={"Ul_li--hover " + (item.state === "active" ? "menu active" : "menu")} key={"Menu" + key}>
                        <a onClick={(e) => { handleMenuClick(e, key) }} id={item.state} href={item.link ? item.link : ""} data-active={item.state ? "true" : "false"}>
                            <i className={item.svg + " text-20 mr-2 text-muted"} />
                            <span className="item-name text-15 text-muted">{item.title}</span>
                            {/* Ajout d'une icône dynamique basée sur l'état du sous-menu */}
                            {item.submenuList.length > 0 && (
                                <i className={`fas fa-angle-${submenuVisible[key] ? 'down' : 'left'} ml-auto`} style={{color:'gray'}} />
                            )}
                        </a>
                        {console.log(menu)}
                        {item.submenuList.length > 0 && submenuVisible[key] && <Submenu submenuList={item.submenuList} />}
                    </li>
                )) 
                : (
                    <li className="active menu" >
                        <a id="defaultmenu" href="##" data-active="true" className="text-center mx-auto d-block">
                            <div className="spinner-border loader-lg text-white"></div>
                        </a>
                    </li>
                )}
            </ul>
        </>
    );
}


export default Menu;
