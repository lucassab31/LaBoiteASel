import React from "react";
import { Link, Route, Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import Home from "./Home";
import Test from "./Test";

const Header = () => {
 
    return (
        <Router>
            <div>
                <Link to="/">Accueil</Link>
                <Link to="/test">Test</Link>

                <Route path="/" component={Home} />
                <Route path="/test" component={Test} />
            </div>
        </Router>
    );
}

if (document.getElementById('hello-react')) {
    const root = createRoot(document.getElementById('hello-react'));
    root.render(<Header />);
}

export default Header;