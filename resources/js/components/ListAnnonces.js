import React from "react";
import css from "../../../public/css/listAnnonces.css";


const ListAnnonces = () => {

    return (
        <section id="annonces">

            <div  id="filtres">
                <h2>Filtres</h2>
                <p>
                    Aidez-vous des filtres afin de repérer les annonces
                    qui peuvent vous intéresser.
                </p>

                <div className="filtres_container">
                    <label>Catégorie</label>
                    <input type="text" id="category" placeholder="Exemple : Bricolage" name="category"/>
                </div>

                <div className="filtres_container">
                    <label>Date</label>
                    <input type="text" id="date" placeholder="24/06/2022" name="date"/>
                </div>
                <div className="filtres_container">
                    <label>Durée du service (en heures)</label>
                    <input type="number" id="lengthService" placeholder="1 heure" name="lengthService" minLength="4" maxLength="8"/>
                </div>

                <button className="button-blue">Filtrez les annonces</button>
            </div>

            <div id="listAnnonces">
                <h2>Liste des annonces</h2>
            </div>
        </section>
    );
}

export default ListAnnonces;
