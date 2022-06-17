import React from "react";
import {Helmet} from "react-helmet";

const Faq = () => {
    require("../../../public/css/basePage.css");
    const title = "Tutoriel";
    
    return (
        <main>
            <Helmet>
                    <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>

            <div id="bloc1" className="bloc bloc--bg-red">
                <div className="bloc-text">
                    <h2 className="bloc-text--title"> Comment poster une annonce ? </h2>
                    <p> Vous pouvez poster une annonce en vous rendant dans la section annonces... </p>
                </div>
            </div>
            <div id="bloc2" className="bloc bloc--bg-yellow">
                <div className="bloc-text">
                    <h2 className="bloc-text--title"> Comment fonctionne les échanges sur le site ? </h2>
                    <p> Les échanges fonctionnent... </p>
                </div>
            </div>
        </main>
    );
}

export default Faq;