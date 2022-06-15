import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import Home from "./Home";
import Test from "./Test";

function App() {
    return (
        <BrowserRouter>
            <div>
                {/* possible de les mettre dans des components */}
                <Header/>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/test" element={<Test />} />
                </Routes>

                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
