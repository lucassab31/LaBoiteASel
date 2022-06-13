import React from "react";
import { Link} from "react-router-dom";

const Header = () => {
 
    return (
        <header>
            <h1>Header</h1>
            <Link to="/">Accueil</Link>
            <Link to="/test">Test</Link>
        </header>
    );
}

export default Header;