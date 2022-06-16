import React from "react";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>
            <div id="laBoiteASel">
                <Link to="/"><img id="laBoiteASel__logo" src="../../../images/logo.svg"  width="80" height="90" alt="Retour à la page d'accueil"/></Link>
                <h1  id="laBoiteASel__nom">La Boîte à Sel</h1>
            </div>

            <div id="menu">
                <Link className="menu__lien" to="/">Accueil</Link>
                <Link className="menu__lien" to="/test">Test</Link>
                <Link className="menu__lien" to="/annonces">Annonces</Link>
                <Link to="/messaging">Messagerie</Link>
            </div>
        </header>
    );
}

export default Header;
