import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Helmet} from "react-helmet";

const FormAnnonce = () => {
    require("../../../public/css/annonce.css");
    const title = "Créez votre annonce";
    const tools = false;

    return (
        <section id="annonce">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p role="status" class="visually-hidden"> La Boite à Sel - {title} </p>
           
            <form>
                <label htmlFor="title"> Titre de votre annonce (exemple : "Besoin d'aide pour tailler ma haie") </label>
                <input id="title" type="text" placeholder="titre..."/>

                <label htmlFor="description">  Votre description </label>
                <input id="description" type="text" placeholder="ma description..."/>

                <label htmlFor="localisation">  Votre zone géographique (par exemple : "18ème arrondissement de Paris") </label>
                <input id="localisation" type="text" placeholder="ma zone géographique..."/>

                <label htmlFor="category"> Choisir une catégorie </label>
                <select id="category"> 
                    <option> Category </option>
                </select>

                <fieldset className="group-radios">
                    <legend> Des outils sont-ils nécessaires ? </legend>

                    <div className="group-radios__radio">
                        <input  id="tools_yes" type="radio" value="oui" name="tools"/>
                        <label htmlFor="tools_yes"> Oui </label>
                    </div>

                    <div className="group-radios__radio">
                        <input  id="tools_no" type="radio" value="non" name="tools"/>
                        <label htmlFor="tools_no"> Non </label>
                    </div>
                </fieldset>

                {tools === true && 
                    <div>
                        <label htmlFor="type_tools"> Veuillez renseignez les outils nécessaires </label>
                        <input id="type_tools" type="text"/>

                        <fieldset className="group-radios">
                            <legend> Ces outils seront-ils fournis ? </legend>

                            <div className="group-radios__radio">
                                <input id="unrequired" type="radio" value="oui" name="tools"/>
                                <label htmlFor="unrequired"> Oui </label>
                            </div>

                            <div className="group-radios__radio">
                                <input id="required" type="radio" value="non" name="tools"/>
                                <label htmlFor="required"> Non </label>
                            </div>
                        </fieldset>
                    </div>
                }
            </form>
        </section>
    );
}

export default FormAnnonce;
