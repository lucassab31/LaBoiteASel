import React from "react";
import {Helmet} from "react-helmet";

const Cloture = () => {
    require("../../../public/css/basePage.css");
    const title = "Cloture de l'échange" + "- variable nom annonce";
    
    return (
        <main>
            <Helmet>
                    <title>{title}</title>
            </Helmet>
            <p role="status" class="visually-hidden"> La Boite à Sel - {title} </p>

            <div id="bloc1" className="bloc bloc--bg-red">
                <div className="bloc-text">
                    <h2 className="bloc-text--title"> Le service a été rendu, l'échange de grains de sel a été effectué. </h2>
                    <p> Cette annonce est désormais cloturée. </p>
                </div>
            </div>
        </main>
    );
}

export default Cloture;