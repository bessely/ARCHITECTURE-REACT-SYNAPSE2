import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doConnexion } from '../../services/Utilisateurs';
import { packageJSON, purgeStrorage } from '../../services/globalFunction';
import { BASEROOT } from '../../services/serveur';
import ModalProfile from './component/ModalProfile';
import '@fortawesome/fontawesome-free/css/all.css';


function Connexion() {
    // const style = {
    //         backgroundImage    : `url(assets/img/20943673.png)`,
    //         backgroundPosition : 'bottom right',
    //         backgroundSize     : '600px',
    //         backgroundRepeat   : 'no-repeat' //cahierBack_1.jpg
    //     };
    const dispatch = useDispatch();
    useEffect(() => {
                purgeStrorage("loginUtilisateur");
                purgeStrorage("currentProfile");
    },[]);

    const doConnexionx = (e) => {
        e.preventDefault();
        let username= document.getElementById("username");
        let password= document.getElementById("password");
        dispatch(doConnexion({STR_UTILOGIN:username.value,STR_UTIPASSWORD:password.value}));
    };
    
    return (
        <div className="auth-layout-wrap" style={{backgroundImage: `url('/assets/images/test.jpg')`}}>
            <div className="auth-content">
                <div className="card o-hidden shadow border border-success">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-4">
                                <div className="auth-logo text-left mb-4"></div>
                                <h1 className="mb-0 text-18 font-weight-bold">AUTHENTIFICATION</h1>
                                   <small>{packageJSON?.description}</small>
                                <form onSubmit={(e)=>{doConnexionx(e)}} className="mt-2">
                                    <div className="form-group">
                                        <label htmlFor="email">Identifiant Utilisateur</label>
                                        <input className="form-control form-control-rounded" id="username" name='username' type="text"placeholder="Identifiant Utilisateur..." />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Mot de Passe</label>
                                        <input className="form-control form-control-rounded" id="password" name='password' type="password" placeholder="Mot de passe ..." />
                                    </div>
                                    <button className="btn btn-rounded btn-success btn-block mt-2">Connexion&nbsp;<i className="fa fa-sign-in"></i></button>
                                </form>
                                <div className="mt-3 text-center"><a className="text-muted" href={BASEROOT + "Forget"}>
                                    <u>Mot de passe oublié ?</u></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center d-flex align-items-center justify-content-center">
                            <img src='APP_LOGO_INDEX.png' alt='Logo' />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2 border-top pb-3 ">
                         <div className="col-auto d-flex flex-column align-items-center">
                            <small className="text-muted font-weight-bold mt-2">© SYNAPSE GROUPE</small>
                            <small className="text-muted font-weight-bold mt-2">{"Version " + packageJSON.version}</small>
                        </div>
                    </div>
                </div>
            </div>
            <ModalProfile/>
        </div>

    
    )
}

export default Connexion