import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {

    return (
        <footer>
            <div id="reseauxSociaux">
                {/*
                    <img src="../../../images/facebook.png"  width="80" height="90" alt="logo de Facebook"/>
                    <img src="../../../images/email.png"  width="80" height="90" alt="illustration d'une enveloppe"/>
                    <img src="../../../images/youtube.png"  width="80" height="90" alt="logo de Youtube"/>
                    <img src="../../../images/twitter.png"  width="80" height="90" alt="logo de Twitter"/>
                 */}
            </div>
            <p>Tout droits réservés © 2022 La Boîte à Sel, inc.</p>
            <a href="#">Mentions Légales</a>
            <a href="#">Politique de confidentialité</a>
        </footer>
    );
}

export default Footer;
