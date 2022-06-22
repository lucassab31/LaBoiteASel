import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {lazy} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import ListAnnonces from './ListAnnonces';
import Annonce from './Annonce';
import EditCompteUser from './EditCompteUser';
import Home from "./Home";
import Login from "./Login";
import Test from "./Test";
import Messaging from "./Messaging";
import Validation from "./Validation";
import CompteUser from './CompteUser';
import Faq from "./FAQ";
import FormAnnonce from './FormAnnonce';
import {Helmet} from "react-helmet";
import PanelAdmin from "./PanelAdmin";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Helmet titleTemplate="La Boîte à sel | %s">
                </Helmet>
                {/* possible de les mettre dans des components */}
                <Header/>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route path="/utilisateur/*" element={<CompteUser />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/annonces" element={<ListAnnonces/>} />
                    <Route path="/validation" element={<Validation />} />
                    <Route path="/annonce" element={<Annonce/>} />
                    <Route path="/messaging/*" element={<Messaging/>}/>
                    <Route path="/tutoriel" element={<Faq/>}/>
                    <Route path="/create" element={<FormAnnonce/>}/>
                    <Route path="/admin/*" element={<PanelAdmin/>}/>
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
