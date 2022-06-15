import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import {IconContext} from "react-icons";

const Footer = () => {

    return (
        <footer>
            <div id="reseauxSociaux">
                <i className="reseauxSociaux__icon">  <span className="visually-hidden"> Lien vers la page Facebook de l' association</span></i>
            </div>
            <IconContext.Provider value={{ style: {fontSize: '30px', color: "red"}}}>
                 <FacebookIcon className="reseauxSociaux__icon" color="white" fontSize="large"/>
            </IconContext.Provider>

            <p>Tout droits réservés © 2022 La Boîte à Sel, inc.</p>
            <div id="rgpd">
                <a href="#">Mentions Légales</a>
                <span> | </span>
                <a href="#">Politique de confidentialité</a>
            </div>
        </footer>
    );
}

export default Footer;
