import React, {useState, useEffect, useFocus} from "react";
import {Helmet} from "react-helmet";

const FormAnnonce = () => {
    require("../../../public/css/basePage.css");
    const title = "Créez votre annonce";
    const [errors, setErrors] = useState();

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [toolsProvided, setToolsProvided] = useState("");
    const [toolsType, setToolsType] = useState("");
    const [timeLength, setTimeLength] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [cost, setCost] = useState("");
    const [dateTimePost, setDateTimePost] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [datetimeType, setDateTimeType] = useState("");

    const [focusInput, setFocusInput] = useState();
    const [list, setList] = useState("");
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
        city : "",
        datetimePost : "",
        datetimeType : ""
    });

    async function fetchCategory() {
        await axios.get("http://127.0.0.1:8000/api/posts/add")
        .then(
            response => (setList(response.data.data.map(item => ( 
            <option 
                value={Object.values(item)[0]}
                key={Object.values(item)[0]}> {Object.values(item)[1]} 
            </option>))))
        )    
    };

    async function send(){
        console.log(result);
        await axios.post("http://127.0.0.1:8000/api/posts/add", result)
            .then(res => (console.log(res.data), setErrors(res.data.validate_err)));
    }


    useEffect(() => {
        fetchCategory();
    }, []);

    const createAnnonce = () => {
        return (
            <main>
                <div>
                    <p> Votre annonce a bien été créee !</p>
                </div>
            </main>
        );
    }

    function setListResult(){
       
        dateTimePost ? date = new Date(dateTimePost) : date = new Date();
        console.log(date.toISOString().slice(0, 19).replace('T', ' '));
        setResult({
            "title" : titre, 
            "category_id" : category_id,
            "description" : description, 
            "address" : address, 
            "toolsProvided" : toolsProvided,
            "zipCode" : zipCode,
            "timeLength" : timeLength,
            "toolsType" : toolsType,
            "cost" : cost,
            "city" : city,
            "datetimePost" : date.toISOString().slice(0, 19).replace('T', ' '),
            "datetimeType" : datetimeType
        })
    }

    async function submitForm(e) {
        e.preventDefault();
        setListResult();
        send();
    }

    useEffect(() => {
        setFocus();
    }, [errors]);


    useEffect(() => {
        if(focusInput){
            focusInput.focus();
        }
    }, [focusInput]);
   

    function setFocus(){
        let input = document.querySelectorAll("[aria-invalid=true]")[0];
        if(input){
        setFocusInput(input);
        }
    }

    function removeError(name){
        let input = document.querySelector("[data-name=" + name + "]");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
    }

    function formError(name){
        let input = document.querySelector("[data-name=" + name + "]");
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", name + "__error");
    }

    const DisplayErrors = (inputName) => {
        if(errors){
            //formError(inputName.inputName);
            let contentErr = `${errors[inputName.inputName]}`;
            return contentErr && contentErr !== "undefined" ? (formError(inputName.inputName), <p id={inputName.inputName + "__error"} className="field_error"> {contentErr} </p>) : (removeError(inputName.inputName), null);
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
                            <input 
                                aria-required="true" 
                                data-name="title" 
                                id="title" 
                                type="text" 
                                value={titre}
                                onChange={(e) => (setTitre(e.target.value), setListResult())}
                                placeholder="mon titre d'annonce..."/>
                            <DisplayErrors inputName="title"></DisplayErrors>

                           
                            <label htmlFor="description">  Votre description </label>
                            <textarea 
                                aria-required="true" 
                                data-name="description" 
                                id="description" 
                                type="text" 
                                value={description}
                                onChange={(e) => (setDescription(e.target.value), setListResult())}
                                placeholder="ma description..."
                            />
                            <DisplayErrors inputName="description"></DisplayErrors>
                            

                        </div>

                        <div className="form__block__column">

                           
                            <label htmlFor="category"> Choisissez une catégorie </label>
                            <select data-name="category_id" aria-required="true" value={category_id} onChange={(e) => (setCategoryId(e.target.value), setListResult())} id="category">
                                <option disabled value=""> -- Choisir une option -- </option>
                                {list}
                            </select>
                            <DisplayErrors inputName="category_id"></DisplayErrors>

                            
                            <label htmlFor="saltNumber"> Nombre de grains de sel </label>
                            <input 
                                aria-required="true"
                                value={cost}
                                onChange={(e) => (setCost(e.target.value), setListResult())}
                                data-name="cost" 
                                type="number" 
                                id="saltNumber"
                            />
                            <DisplayErrors inputName="cost"></DisplayErrors>

                        </div>

                    </div>

                </fieldset>

                <div className="form__block-2 form__block bloc--bg-yellow bloc--2-2">
                    <fieldset className="group-radios form__block__column">
                        <legend className="form__block__title"> Des outils sont-ils nécessaires ? </legend>
                        
                        <div className="group-radios__radio form__block__wrapper">
                            <input id="tools_yes" type="radio" value="true" name="toolsreq"/>
                            <label htmlFor="tools_yes"> Oui </label>
                        </div>

                        <div className="group-radios__radio form__block__wrapper">
                            <input 
                            id="tools_no" 
                            type="radio" 
                            value="false" 
                            name="toolsreq"
                            />
                            <label htmlFor="tools_no"> Non </label>
                        </div>

                        <div className="form__block__column">
                            <label htmlFor="type_tools"> Veuillez renseignez les outils nécessaires (par exemple : "pelle, seau") </label>
                            <input 
                            data-name="toolsType" 
                            id="type_tools" 
                            type="text"
                            value={toolsType}
                            onChange={(e) => (setToolsType(e.target.value), setListResult())}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="group-radios">
                        <legend> Ces outils seront-ils fournis ? </legend>
                        <DisplayErrors inputName="toolsProvided"></DisplayErrors>

                        <div className="group-radios__radio">
                            <input 
                                data-name="toolsProvided" 
                                id="unrequired" 
                                type="radio" 
                                value="B"
                                onClick = {()=>{setToolsProvided("B")}}
                                onChange={()=>{setListResult()}}
                                name="gettools"/>
                            <label htmlFor="unrequired"> Oui </label>
                        </div>

                        <div className="group-radios__radio">
                            <input 
                                data-name="toolsProvided" 
                                id="required" 
                                type="radio" 
                                name="gettools"
                                value="A"
                                onClick={()=> {setToolsProvided("A")}}
                                onChange={()=> {setListResult()}}
                            />
                            <label htmlFor="required"> Non </label>
                        </div>
                    </fieldset>
                </div>

                <div className="form__block-3 form__block bloc--bg-yellow">

                    <fieldset>
                        <legend className="form__block__title"> Date et une durée pour le service demandé </legend>

                        <div className="bloc--2-2 form__block__wrapper">

                        
                            <div className="form__block__column">

                                    <label htmlFor="dateType"> Choisissez si vous souhaitez mettre une date de fin, une date de début, ou une date précise de réalisation </label>
                                    <select data-name="datetimeType" id="dateType" value={datetimeType} onChange={(e) => (setDateTimeType(e.target.value), setListResult())}>
                                        <option disabled value=""> -- Choisir une option -- </option>
                                        <option value='A'> Avant la date choisie </option>
                                        <option value='B'> Seulement date choisie </option>
                                        <option value='O'> A partir de la date choisie </option>
                                    </select>

                                <label htmlFor="date"> Date </label>
                                <input  
                                    value={dateTimePost}
                                    onChange={(e) => (setDateTimePost(e.target.value), setListResult())}
                                    data-name="datetimePost" 
                                    id="date" 
                                    type="datetime-local"
                                />
                                
                            </div>

                            <div className="form__block__column">
                                <label htmlFor="time"> Durée en heures (par exemple pour 3 heures marquer "3") </label>
                                <input 
                                    value={timeLength}
                                    onChange={(e) => (setTimeLength(e.target.value), setListResult())}
                                    data-name="timeLength" 
                                    id="time" 
                                    type="number"
                                />
                            </div>

                        </div>

                    </fieldset>
                </div>

                <fieldset className="form__block-4 form__block bloc--bg-yellow">

                    <legend className="form__block__title">Votre adresse</legend>

                    <div className="bloc--2-2 form__block__wrapper">

                        <div className="form__block__column">

                            <label htmlFor="address"> Votre numéro et nom de rue (ces informations ne sera pas visible sur l'annonce) </label>
                            <input 
                                value={address}
                                onChange={(e) => (setAddress(e.target.value), setListResult())}
                                aria-required="true" 
                                autoComplete="street-address" 
                                data-name="address" 
                                id="address" 
                                type="text" 
                                placeholder="mes numéro et nom de rue..."
                            />
                            <DisplayErrors inputName="address"></DisplayErrors>

                            <label htmlFor="city"> Votre ville </label>
                            <input 
                                aria-required="true"
                                value={city}
                                onChange={(e) => (setCity(e.target.value), setListResult())}
                                autoComplete="address-level2" 
                                data-name="city" 
                                id="city" 
                                type="text" 
                                placeholder="ma ville..."
                            />
                            <DisplayErrors inputName="city"></DisplayErrors>
                        
                        </div>

                        <div className="form__block__column">

                            <label htmlFor="zipcode"> Votre code postal </label>
                            <input 
                                value={zipCode}
                                onChange={(e) => (setZipCode(e.target.value), setListResult())}
                                aria-required="true" 
                                autoComplete="postal-code" 
                                data-name="zipCode" 
                                id="zipcode" 
                                type="text" 
                                placeholder="mon code postal..."
                            />
                            <DisplayErrors inputName="zipCode"></DisplayErrors>

                        </div>

                    </div>
                
                </fieldset>

                <button onClick={submitForm} className="button-yellow"> Créer votre annonce </button>

            </form>
        </main>
    );
}

export default FormAnnonce;
