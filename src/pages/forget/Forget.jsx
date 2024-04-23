import React from 'react';
import { useDispatch } from 'react-redux';
import { revoverPassWord  } from '../../services/Utilisateurs';
import { packageJSON } from '../../services/globalFunction';
import { BASEROOT } from '../../services/serveur';
import '@fortawesome/fontawesome-free/css/all.css';


function Forget() {
    const dispatch = useDispatch();
    const doForget = (e) => {
        e.preventDefault();
        let username = document.getElementById("username");
        dispatch(revoverPassWord(username.value));
    };
    
    return (
        <div className="auth-layout-wrap" style={{backgroundImage: `url('/assets/images/test.jpg')`}}>
            <div className="auth-content">
                <div className="card o-hidden shadow border border-success">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-4">
                                <div className="auth-logo text-left mb-4"></div>
                                <h1 className="mb-0 text-18 font-weight-bold">Mot de passe oublié !</h1>
                                   <small>{packageJSON?.description}</small><br /><br />
                                <span className=''><i className='fa fa-arrow-right'></i>&nbsp;Un nouveau mot de passe vous sera transmis sur votre mail.</span>
                                <form onSubmit={(e)=>{doForget(e)}} className="mt-2">
                                    <div className="form-group">
                                        <label htmlFor="email">Identifiant Utilisateur</label>
                                        <input className="form-control form-control-rounded" id="username" name='username' type="text"placeholder="Saisir votre identifiant utilisateur..." />
                                    </div>
                                    <button className="btn btn-rounded btn-success btn-block mt-2">Réinitialiser&nbsp;<i className="fa fa-sign-in"></i></button>
                                </form>
                                <div className="mt-3 text-center"><a className="text-muted" href={BASEROOT + "Connexion"}>
                                    <u>Se connecter</u></a>
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
        </div>

    
    )
}

export default Forget