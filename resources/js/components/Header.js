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

            <nav id="menu">
                <Link className="menu__lien" to="/">Accueil</Link>
                <Link className="menu__lien" to="/annonces">Annonces</Link>
                <LinkLogin />
            </nav>

            {/*<Menu className="menuBurger" customBurgerIcon={ <img src="../../../images/menu.png" /> }>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
            </Menu>*/}
        </header>
        
    );
}

export default Header;
