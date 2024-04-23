import React from 'react';

/**
 * LE COMPOSANT QUI AFFICHE LES ERREURS SOUS LES CHAMPS DE SAISIE
 * @param {JSX} children
*/
function ErreurObject({children}) {
    if (children!=="" && children!==undefined) {
        return (
            <div className=" mt-1">
                <span className="badge badge-danger font-weight-bold w-100">
                {children}
                </span>
            </div>
        )
    }
}

export default ErreurObject