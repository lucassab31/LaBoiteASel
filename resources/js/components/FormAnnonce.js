import React, {useState, useEffect} from "react";
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Helmet} from "react-helmet";

const FormAnnonce = () => {
    require("../../../public/css/basePage.css");
    const title = "Créez votre annonce";
    const [tools, setTools] = useState("false");
    const [list, setList] = useState([]);

    async function fetchPosts() {
        await axios.get("http://127.0.0.1:8000/api/posts/add")
        .then(
            response => (
                setList(
                    response.data.data.map(
                        item => ( 
                        <option key={Object.values(item)[0]}> {Object.values(item)[1]} </option>)
                    )
                )
            )
        )    
    };

    useEffect(() => {
        fetchPosts();

    }, []);


    function changeTools(e) {
        setTools(e.currentTarget.value);
    }

    async function submitForm() {

    }

    const GetInfosTools = (obj) => {
        //issue : tabulation error on radio inputs
        if(obj.render == "true"){
            return (
                <div className="form__block__column">
                    <label htmlFor="type_tools"> Veuillez renseignez les outils nécessaires (par exemple : "pelle, seau") </label>
                    <input id="type_tools" type="text"/>

                    <fieldset className="group-radios">
                        <legend> Ces outils seront-ils fournis ? </legend>

                        <div className="group-radios__radio">
                            <input id="unrequired" type="radio" value="oui" name="gettools"/>
                            <label htmlFor="unrequired"> Oui </label>
                        </div>

                        <div className="group-radios__radio">
                            <input id="required" type="radio" value="non" name="gettools"/>
                            <label htmlFor="required"> Non </label>
                        </div>
                    </fieldset>
                </div>
            )
        }
        else {
            return null;
        }
    }

    return (
        <main id="formAnnonce">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>

            <h2> Annonce </h2>
           
            <form>
                <fieldset className="form__block-1 form__block bloc--bg-yellow">
                    <legend className="form__block__title">Création d'annonce</legend>

                    <div className="bloc--2-2 form__block__wrapper">
                        
                        <div className="form__block__column">

                            <label htmlFor="title"> Titre de votre annonce (par exemple : "Besoin d'aide pour tailler ma haie") </label>
                            <input id="title" type="text" placeholder="mon titre d'annonce..."/>

                            <label htmlFor="description">  Votre description </label>
                            <textarea id="description" type="text" placeholder="ma description..."/>

                        </div>

                        <div className="form__block__column">

                            <label htmlFor="category"> Choisissez une catégorie </label>
                            <select id="category">
                                {list}
                            </select>

                            <label htmlFor="saltNumber"> Nombre de grains de sel </label>
                            <input type="number" id="saltNumber"/>

                        </div>

                    </div>

                </fieldset>

                <div className="form__block-2 form__block bloc--bg-yellow bloc--2-2">
                    <fieldset className="group-radios form__block__column">
                        <legend className="form__block__title"> Des outils sont-ils nécessaires ? </legend>
                        
                        <div className="group-radios__radio form__block__wrapper">
                            <input id="tools_yes" onChange={changeTools} type="radio" value="true" name="toolsreq"/>
                            <label htmlFor="tools_yes"> Oui </label>
                        </div>

                        <div className="group-radios__radio form__block__wrapper">
                            <input id="tools_no" onChange={changeTools} type="radio" value="false" name="toolsreq"/>
                            <label htmlFor="tools_no"> Non </label>
                        </div>
                    </fieldset>

                    <GetInfosTools render={tools}/>
                </div>

                <div className="form__block-3 form__block bloc--bg-yellow">

                    <fieldset>
                        <legend className="form__block__title"> Date et une durée pour le service demandé </legend>

                        <div className="bloc--2-2 form__block__wrapper">
                        
                            <div className="form__block__column">
                                <label htmlFor="date"> Date </label>
                                <input id="date" type="date"/>
                            </div>

                            <div className="form__block__column">
                                <label htmlFor="time"> Durée </label>
                                <input id="time" type="time"/>
                            </div>

                        </div>

                    </fieldset>
                </div>

                <fieldset className="form__block-4 form__block bloc--bg-yellow">

                    <legend className="form__block__title">Votre adresse</legend>

                    <div className="bloc--2-2 form__block__wrapper">

                        <div className="form__block__column">

                            <label htmlFor="address"> Votre numéro et nom de rue (ces informations ne sera pas visible sur l'annonce) </label>
                            <input id="address" type="text" placeholder="mes numéro et nom de rue..."/>

                            <label htmlFor="city"> Votre ville </label>
                            <input id="city" type="text" placeholder="ma ville..."/>
                        
                        </div>

                        <div className="form__block__column">

                            <label htmlFor="zipcode"> Votre code postal </label>
                            <input id="zipcode" type="text" placeholder="mon code postal..."/>

                        </div>

                    </div>
                
                </fieldset>

                <button type="submit" className="button-yellow" onClick={submitForm}> Créer votre annonce </button>

            </form>
        </main>
    );
}

export default FormAnnonce;
