import React, {useEffect, createRef} from "react";
import {Link, useLocation} from "react-router-dom";
//import { fallDown as Menu } from 'react-burger-menu'

const Header = () => {
    let location = useLocation();
    const firstFocus = createRef();

    useEffect(() => { 
        firstFocus.current.focus();
    }, [location]);

    const LinkLogin = () => {
        if (window.sessionStorage.getItem('token') != undefined) {
            return <Link className="menu__lien" to="/utilisateur">Mon compte</Link>;
        } else {
            return <Link className="menu__lien" to="/connexion">Se connecter</Link>;
        }
    }

    return (
        <header>
            <div id="laBoiteASel">
                <Link ref={firstFocus} to="/"><img id="laBoiteASel__logo" src="../../../images/logo.svg" alt="Retour à la page d'accueil"/></Link>
                <h1 id="laBoiteASel__nom">La Boîte à Sel</h1>
            </div>

           {/*<div id="menu">
                <Link className="menu__lien" to="/">Accueil</Link>
                <Link className="menu__lien" to="/annonces">Annonces</Link>
                <LinkLogin />
            </div>*/}

            <div class="top-nav">
                <input id="menu-toggle" type="checkbox" />
                <label class='menu-button-container' for="menu-toggle">
                <div class='menu-button'></div>
                </label>
                <ul class="menu">
                    <li><Link className="menu__lien" to="/">Accueil</Link></li>
                    <li><Link className="menu__lien" to="/annonces">Annonces</Link></li>
                    <li><LinkLogin /></li>
                </ul>
            </div>
            
        </header>
        
    );
}

export default Header;
