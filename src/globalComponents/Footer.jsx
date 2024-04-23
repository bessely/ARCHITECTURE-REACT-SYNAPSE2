import React from 'react';
import { getFullYear, packageJSON } from '../services/globalFunction';

/** LE PIED DE PAGE  CONTIEN LE COPIRIGHT ET LE LIEN VER LA PAGE DU CONSTRUCTEUR DE L'APPLICATION
 * @returns JSX
 */
function Footer() {
    return (
            <>
                <div className="sidebar-overlay open">
                </div>
                <div className="flex-grow-1">
                </div><div className="app-footer">
                    <div className="footer-bottom pt-3 d-flex flex-column flex-sm-row align-items-center">
                        <a href={packageJSON.WEBSITE} className="btn btn-success text-white btn-rounded" target="_blank">SYNAPSE GROUPE</a>
                        <span className="flex-grow-1"></span>
                        <div className="d-flex align-items-center">
                            <img className="logo" src="APP_LOGO.png" alt="" />
                            <div>
                                <p className="m-0">&copy; {getFullYear()}  SYNAPSE GROUPE</p> [ {packageJSON.name} ] - Version {packageJSON.version}
                                <p className="m-0">Tous Droits Reservés</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}
export default Footer