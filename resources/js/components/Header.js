import React from "react";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>
            <img src="../../../images/logo_color.png"  width="80" height="90" alt="logo de l'association Boite à Sel"/>
            <h1>La Boîte à Sel</h1>
            <Link to="/">Accueil</Link>
            <Link to="/test">Test</Link>
        </header>
    );
}

export default Header;
