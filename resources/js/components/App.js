import React, {lazy} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import ListAnnonces from './ListAnnonces';
import Annonce from './Annonce';
import Home from "./Home";
import Login from "./Login";
import Test from "./Test";
import Messaging from "./Messaging";
import Validation from "./Validation";
import {Helmet} from "react-helmet";


function App() {
    return (
        <BrowserRouter>
            <div>
                <Helmet titleTemplate="La Boîte à sel | %s">
                    <meta charSet="utf-8" />
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                {/* possible de les mettre dans des components */}
                <Header/>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/annonces" element={<ListAnnonces/>} />
                    <Route path="/validation" element={<Validation />} />
                    <Route path="/annonce" element={<Annonce/>} />
                    <Route path="/messaging/*" element={<Messaging/>}/>
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
