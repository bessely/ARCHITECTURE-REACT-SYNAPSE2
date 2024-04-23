import moment from "moment";
//import { matchIsValidColor } from "mui-color-input";
import { MemoryRouter } from "react-router";
import { BASEURL } from "./serveur";

export const packageJSON = require("../../package.json");

/** CONSERVE UNE VARIABLE EN MEMOIRE LOCAL POUR QUELLE SOIT DISPONIBLE DANS TTE L'aPPLI
    @param {any} laVariable la variable ou constante  a mettre en memoire
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
    @author @bessely
 */
export const  writeThisInLocalstore = (laVariable, NomDeLaVariable)=>{
    localStorage.setItem(NomDeLaVariable, JSON.stringify(laVariable));
}

/** RECUPERER UNE VARIABLE DANS LE LOCAL STORAGE 
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
    @author @bessely
*/
export const getThisInLocalstore = (NomDeLaVariable) => {
    return (JSON.parse(localStorage.getItem(NomDeLaVariable)));
}
/** VIDER UNE MEMORE OU LE LOCAL STORAGE EN ENTIER 
    @param {string} NomDeLaVariable le nom de recuperation de la variable ou de la constante
    @author @bessely
*/
export const purgeStrorage = (NomDeLaVariable) => {
    if (NomDeLaVariable===undefined) {
        localStorage.clear();
    } else {
        localStorage.removeItem(NomDeLaVariable);
    }
    return true;
}

/** RECUPERER UN PARAMETRE SPECIFIQUE DANS l'URL 
    @param {string} sParam le nom de du parametre a recupérer dans l'url
    @author @bessely
*/
export const  getUrlParameter = (sParam)=>{
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    return false;
}

/**RETOURNE LE DERNIER ELMENT DE LA BARRE D'ADRESSE [le nom du fichier en cours d'execusion]
 * 
 * @returns {string}
 * @author @bessely
 */
export const getCurrentPath = () =>{
    let pathname = window.location.pathname;
    return pathname.split("/").pop();
}

/**RETOURNE LA RACINE DE L'URL
 * 
 * @returns Origine url
 * @author @bessely
 */
export const getUrlOrigin = () =>{
    return (window.location.protocol+"//"+window.location.hostname);
}

/**FORMATTEUR DE LIBELLE : dimininue la taille d'un text puis ajoute 3 points de suspension a la fin du caractère si et seulement si le text est superieur au nombre de caratere a retienir
 *@param {integer} maxCaract 
 *@param {string} label 
 *@returns {string}
 *@author @bessely
 */
export const formatLargeLabel = (maxCaract,label) =>{
        if (label.length > maxCaract) {
            return label.toString().substring(0, maxCaract) + "..."
        }
        return label;
}

/**
 * FORMATE UNE DATE AU FORMAT xx-xx-XXXX vers une date  xx/xx/XXXX
 * @param {date} dateAformater 
 * @returns
 * @author @bessely
 */
export const formatDate = (dateAformater)=>{
    if (dateAformater!=="" && dateAformater!==undefined && dateAformater!=="") {
            let xxxx = dateAformater.split("-");
            return xxxx[2]+"/"+xxxx[1]+"/"+xxxx[0]
    }
    return ""
};

/**
 * LECTEUR DE SON
 * @param {string} data le lien  vers le fichier audio
 * @returns Noice
 * @author @bessely
 */
export const playSond = (data=BASEURL+"assets/audio/pop-39222.mp3") =>{
    if (getThisInLocalstore("prefAudio")) {
        console.log(data);
        const audio = new Audio(data);
        audio.play();
    }
    return;
}


/**
 *  LECTEUR DE A VOIX [SYNTHETISEUR]
 * @param {string} textToSpell le text à lire
 * @returns texte voice spelling in french
 * @author @bessely
 */
export const spellNotification=(textToSpell="Une erreur inconnue est survenue.")=>{
    if (getThisInLocalstore("prefVoice")) {
        if ('speechSynthesis' in window) { //Je vérifie dabord que cette fonctionalité est supportée par le navigateur
            for (let index = 0; index < speechSynthesis.getVoices().length; index++) { // je parcours les langues supportée
                if (speechSynthesis.getVoices()[index].lang==="fr-FR") { // si francais supporté alors on joue la voix en français
                    okToSpeak(textToSpell);
                    break;
                }
            }
            function okToSpeak(textToSpell){
                let msg    = new SpeechSynthesisUtterance(textToSpell);
                msg.lang   = "fr-FR";
                msg.pitch  = 1.1;
                msg.addEventListener("end",()=>{
                        return true;
                });
                speechSynthesis.speak(msg);
            }
        }
    }
    return false;
}


export const getFullYear = () => {
    return new Date().getFullYear();
};

export const fileName = ()=>{
    console.log(__filename);
    console.log(__dirname);
    console.log(MemoryRouter);
}

/**
 * Controle la variable selon les spécifications demandées
 * @param {any} value 
 * @param {string} name l'erreur à retouné
 * @param {any} requiredType 
 * @param {array} size min - max au the value 
 * @param {boolean} required
 * @param {object} api 
 * @returns 
 */
export const validateData = (value, requiredType, [minlength=0,maxLength=1000], required=false) =>{
    if (value!==undefined && value!=="" && value!==null) {
        if (!(requiredType!==undefined &&  requiredType!==""  && typeof(value)==requiredType)) {
            if (requiredType!=="mail" && requiredType!=="date" && requiredType!=="date2" ) {
                return "Le champs doit être de type "+requiredType;
            }
        }
        if (requiredType!==undefined && requiredType!=="" && requiredType!==null) {
            if (requiredType==="mail") {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if ( !(emailRegex.test(value)) ) {
                    return "email invalide";
                }
            }
            if (requiredType==="string") {
                if ( !(value.length>= minlength && value.length <= maxLength) ) {
                    if (minlength===maxLength) {
                        return "exactement "+maxLength+" caractères requis";
                    }
                    return "entre "+minlength+" et "+maxLength+" caractères requis";
                }
            }
            if (requiredType==="number") {
                if ( !(value>= minlength && value <= maxLength) ) {
                    if (!isNaN(value)) {
                        return "doit être compris "+minlength+" et "+maxLength;
                    }else{
                        if (required) {
                            return "obligatoire";
                        }
                    }
                }
            }
            if (requiredType==="array" && Array.isArray(value)) {
                if ( !(value.length> minlength && value.length <= maxLength) ) {
                    return " au moins "+minlength+" enregistrement(s) requis";
                }
            }
            if (requiredType==="object" && typeof(value)!=="object") {
                return "un type objet est requis"
            }
            if (requiredType==="date") {
                if ( !(value.length === maxLength) ) {
                    return "format DD/MM/YYYY requis";
                }
                if (moment(value, 'DD/MM/YYYY', true).format()==="Invalid date") {
                    return "contient une date non valide";
                }
            }
            if (requiredType==="date2") {
                if ( !(value.length === maxLength) ) {
                    return "format YYYY-MM-DD requis";
                }
                if (moment(value, 'YYYY-MM-DD', true).format()==="Invalid date") {
                    return "contient une date non valide";
                }
            }
            // if (requiredType==="color") {
            //     if (!matchIsValidColor(value)) {
            //         return "code couleur invalide"
            //     }
            // }
            return true;
        }
    }
    if (required) {
        return "obligatoire";
    }
    return true; // non bloquant au cas échéant
}

/**
 * Normalise un objet passer : retire les lignes qui ne respect pas la condition
 * @param {object} data 
 * @param {any} condition 
 * @returns 
 */
export const filterData = (data, condition) =>{
    const newObject = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== condition));
    console.log(data);
    console.log(newObject);
    return newObject;
}