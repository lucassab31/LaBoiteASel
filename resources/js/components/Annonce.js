import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Helmet} from "react-helmet";

const Annonce = () => {
    require("../../../public/css/annonce.css");

    
    return (
        <section id="annonce">
            <Helmet>
                    <title>Titre de l'annonce</title>
            </Helmet>
           
            <div id="annonce_basicInfos">
                <div>
                    <h2>Titre de l'annonce</h2>
                    <p>Crée le par</p>
                    <div>
                        <div>
                            <CategoryIcon style={{ color: '#5BB286', fontSize:30}}/>
                            <p>Catégorie : </p>
                        </div>
                        <div>
                            <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                            <p>Date</p>
                        </div>
                        <div>
                            <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                            <p>Environ combien de temps</p>
                        </div>
                        <div>
                            <p>30 grains de sel</p>
                        </div>
                    </div>
                    <button className="yellowButton">Rendre service</button>
                </div>
            </div>

            <div id="description">
                <h3>Description</h3>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat lacinia diam ac molestie. Mauris eleifend nunc non dui suscipit, ac pellentesque tellus congue.
                        Curabitur placerat libero lectus, a consequat ex cursus ut. 
                        Aenean imperdiet varius nunc, vel condimentum dolor malesuada at. Nulla interdum purus velit, congue euismod mi bibendum quis. Quisque ultrices auctor aliquam. 
                    </p>
                </div>
            </div>

            <div id="details">
                <h3>Autres détails</h3>
                <div id="details__infos">
                    <div>
                        <LocationOnIcon style={{ color: '#5BB286', fontSize:30}} />
                        <p>Localisation : Exemple </p>
                    </div>

                    <div>
                        <ConstructionIcon style={{ color: '#5BB286', fontSize:30}}/>
                        <p>Pas d'outils nécessaires</p>
                    </div>
                </div>
            </div>

            <div id="annonces">
            
            </div>
        </section>
    );
}

export default Annonce;
