import React from 'react';
import ModalProfile from '../pages/connexion/component/ModalProfile';
import Header from "../globalComponents/Header";
import Footer from "./Footer";



/** LE CONTAINER DU CONTENU DE LA PAGE EN COURS IL CONTIENT AUSSI LE FOOTER ET LA MODALPROFILE
 * @param {JSX} children Les composants enfants qui constituent le contenu de la page
 * @returns JSX
 */
function Container({ TitlePage, children }) {
    return (
        <>
                    <Header />
                    <div className="main-content pt-4">
                        <div className="breadcrumb">
                            <i className='fa fa-arrow-circle-right text-success'></i><h1>&nbsp;{ TitlePage }</h1>
                       </div>
                       <div class="separator-breadcrumb border-top"></div>
                         {children}
                    </div>
                    <Footer />
                    <ModalProfile/>
        </>
    )
}

export default Container