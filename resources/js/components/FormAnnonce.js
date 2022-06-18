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
    const [result, setResult] = useState({
        title : "",
        category_id : "",
        toolsType : "",
        toolsProvided : "",
        description : "",
        timeLength : "",
        cost : "",
        address : "",
        zipCode : "",
        city : ""
    });

    async function fetchPosts() {
        await axios.get("http://127.0.0.1:8000/api/posts/add")
        .then(
            response => (
                setList(
                    response.data.data.map(
                        item => ( 
                        <option data-name="category_id" value={Object.values(item)[0]} key={Object.values(item)[0]}> {Object.values(item)[1]} </option>)
                    )
                )
            )
        )    
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(()=> {
        send();
    }, [result]);

    function changeTools(e) {
        setTools(e.currentTarget.value);
    }

    const createAnnonce = () => {
        return (
            <main>
                <div>
                    <p> Votre annonce a bien été créee !</p>
                </div>
            </main>
        );
    }

    async function submitForm(e) {
        e.preventDefault(); 
        let form = e.target;
        //let results = [];

        //traitement du formulaire

        //select
        let select = document.getElementById('category');
        let option = select.options[select.selectedIndex];
        let optionKey = option.getAttribute("data-name"); 
        let results = {};
        results = {...results, [optionKey] : option.value};

        for(let item of form){

            //other inputs
            let type = item.getAttribute("type");
            const keyItem = item.getAttribute("data-name");
            const valueItem = item.value;
           

            if(type !== "radio") {

                if(keyItem && keyItem.length > 0 && valueItem.length > 0){
                    //setResult({...result, [keyItem] : valueItem});
                    results = {...results, [keyItem] : valueItem};
                }

            }

            else {
                let radios = [];
                radios.push(item);
                if(keyItem && keyItem.length > 0 && valueItem.length > 0){
                    Array.from(radios).find(radio => radio.checked ? results = {...results, [keyItem] : valueItem} : "");
                   
                }
            }
        }

        results = {...results, id : 1};

        setResult(results);
    }


    async function send(){
        console.log(result);
        await axios.post("http://127.0.0.1:8000/api/posts/add", result).then(res => console.log(res.data));
    }

    const GetInfosTools = (obj) => {
        //issue : tabulation error on radio inputs
        if(obj.render == "true"){
            return (
                <div className="form__block__column">
                    <label htmlFor="type_tools"> Veuillez renseignez les outils nécessaires (par exemple : "pelle, seau") </label>
                    <input data-name="toolsType" id="type_tools" type="text"/>

                    <fieldset className="group-radios">
                        <legend> Ces outils seront-ils fournis ? </legend>

                        <div className="group-radios__radio">
                            <input data-name="toolsProvided" id="unrequired" type="radio" value="B" name="gettools"/>
                            <label htmlFor="unrequired"> Oui </label>
                        </div>

                        <div className="group-radios__radio">
                            <input data-name="toolsProvided" id="required" type="radio" value="A" name="gettools"/>
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
           
            <form onSubmit={submitForm}>
                <fieldset className="form__block-1 form__block bloc--bg-yellow">
                    <legend className="form__block__title">Création d'annonce</legend>

                    <div className="bloc--2-2 form__block__wrapper">
                        
                        <div className="form__block__column">

                            <label htmlFor="title"> Titre de votre annonce (par exemple : "Besoin d'aide pour tailler ma haie") </label>
                            <input data-name="title" id="title" type="text" placeholder="mon titre d'annonce..."/>

                            <label htmlFor="description">  Votre description </label>
                            <textarea data-name="description" id="description" type="text" placeholder="ma description..."/>

                        </div>

                        <div className="form__block__column">

                            <label htmlFor="category"> Choisissez une catégorie </label>
                            <select id="category">
                                {list}
                            </select>

                            <label htmlFor="saltNumber"> Nombre de grains de sel </label>
                            <input data-name="cost" type="number" id="saltNumber"/>

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
                                <input data-name="datetimePost" id="date" type="date"/>
                            </div>

                            <div className="form__block__column">
                                <label htmlFor="time"> Durée en heures, par exemple pour 3 heures marquer "3" </label>
                                <input data-name="timeLength" id="time" type="number"/>
                            </div>

                        </div>

                    </fieldset>
                </div>

                <fieldset className="form__block-4 form__block bloc--bg-yellow">

                    <legend className="form__block__title">Votre adresse</legend>

                    <div className="bloc--2-2 form__block__wrapper">

                        <div className="form__block__column">

                            <label htmlFor="address"> Votre numéro et nom de rue (ces informations ne sera pas visible sur l'annonce) </label>
                            <input data-name="address" id="address" type="text" placeholder="mes numéro et nom de rue..."/>

                            <label htmlFor="city"> Votre ville </label>
                            <input data-name="city" id="city" type="text" placeholder="ma ville..."/>
                        
                        </div>

                        <div className="form__block__column">

                            <label htmlFor="zipcode"> Votre code postal </label>
                            <input data-name="zipCode" id="zipcode" type="text" placeholder="mon code postal..."/>

                        </div>

                    </div>
                
                </fieldset>

                <button type="submit" className="button-yellow"> Créer votre annonce </button>

            </form>
        </main>
    );
}

export default FormAnnonce;
