import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Test from "./Test";

function Example() {
    return (
        <BrowserRouter>
            <div>
                <Link to="/">Accueil</Link>
                <Link to="/test">Test</Link>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
