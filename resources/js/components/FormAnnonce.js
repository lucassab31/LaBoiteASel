import React, {useState, useEffect, useFocus} from "react";
import {Helmet} from "react-helmet";

const FormAnnonce = () => {
    const API_URL = process.env.MIX_APP_URL +'api/'
    require("../../../public/css/basePage.css");
    const title = "Créez votre annonce";
    const [errors, setErrors] = useState();
    const [toolsReq, setToolsReq] = useState();
    const [created, setCreated] = useState();

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
        await axios.get(
            API_URL + "posts/add", 
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        )
        .then(
            response => (setList(response.data.data.map(item => ( 
            <option 
                value={Object.values(item)[0]}
                key={Object.values(item)[0]}> {Object.values(item)[1]} 
            </option>))))
        )    
    };

    async function send(){
        const date = dateTimePost ? new Date(dateTimePost) : "";
        let data = {
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
            "datetimePost" : date ? date.toISOString().slice(0, 19).replace('T', ' ') : '',
            "datetimeType" : datetimeType
        };
        console.log(data);
        await axios.post(
            API_URL + "posts/add", 
            data, 
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        )
        .then(res => (console.log(res.data),setCreated(res.data.validate_err ? false : true), setErrors(res.data.validate_err)));
    }


    useEffect(() => {
        fetchCategory();
    }, []);

    const CreateAnnonce = () => {
        //aria-live="polite" : to indicate a message for screen-readers
        return created ? <div> <p onBlur={destroyMessage} id="created" aria-live="polite"> Votre annonce a bien été créee !</p> </div> : null;
    }


    function destroyMessage(e){
        setTimeout(setCreated(false), 5000);
        e.target.removeAttribute("tabindex");
    }

    useEffect(()=>{
        const message = document.querySelector( '#created' );
        //set tabindex to focus on the message when scroll then remove it when the focus on the element is lost
        if(message){
            message.setAttribute("tabindex", "-1");
            message.scrollIntoView( { behavior: 'smooth', block: 'start' } );
            message.focus();
            //message.onblur = message.removeAttribute("tabindex");
        }
    }, [CreateAnnonce])

    function setListResult(){

        const date = dateTimePost ? new Date(dateTimePost) : "";
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
            "datetimePost" : date ? date.toISOString().slice(0, 19).replace('T', ' ') : '',
            "datetimeType" : datetimeType
        });
        console.log(result);
    }

    async function submitForm(e) {
        e.preventDefault();
        //setListResult();
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
        //set focus on the first invalid input
        let input = document.querySelectorAll("[aria-invalid=true]")[0];
        if(input){
        setFocusInput(input);
        }
    }

    function removeError(name){
        //remove attributes when error is resolved
        let input = document.querySelector("[data-name=" + name + "]");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
    }

    function formError(name){
        // set aria-invalid = true for screen-reader & aria-describedby which read the error when focus is on field
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

            <CreateAnnonce/>
           
            <form onSubmit={submitForm} >
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
                                onChange={(e) => (setTitre(e.target.value))}
                                placeholder="mon titre d'annonce..."/>
                            <DisplayErrors inputName="title"></DisplayErrors>

                           
                            <label htmlFor="description">  Votre description </label>
                            <textarea 
                                aria-required="true" 
                                data-name="description" 
                                id="description" 
                                type="text" 
                                value={description}
                                onChange={(e) => (setDescription(e.target.value))}
                                placeholder="ma description..."
                            />
                            <DisplayErrors inputName="description"></DisplayErrors>
                            

                        </div>

                        <div className="form__block__column">

                           
                            <label htmlFor="category"> Choisissez une catégorie </label>
                            <select data-name="category_id" aria-required="true" value={category_id} onChange={(e) => (setCategoryId(e.target.value))} id="category">
                                <option disabled value=""> -- Choisir une option -- </option>
                                {list}
                            </select>
                            <DisplayErrors inputName="category_id"></DisplayErrors>

                            
                            <label htmlFor="saltNumber"> Nombre de grains de sel </label>
                            <input 
                                aria-required="true"
                                value={cost}
                                onChange={(e) => (setCost(e.target.value))}
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
                        <legend className="form__block__title"> Des outils sont-ils nécessaires ?</legend>

                        <div className="form__block__column form__block__wrapper">
                            <label htmlFor="type_tools"> Veuillez renseignez les outils qui vont être utilisés (par exemple : "pelle, seau")</label>
                            <input 
                            data-name="toolsType" 
                            id="type_tools" 
                            type="text"
                            value={toolsType}
                            disabled={toolsReq === "false" ? true : false}
                            onChange={(e) => (setToolsType(e.target.value))}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="group-radios">
                        <legend> Ces outils seront-ils fournis ? </legend>
                        <DisplayErrors inputName="toolsProvided"></DisplayErrors>

                        <select name="tools" data-name="toolsProvided" aria-required="true" value={toolsProvided} onChange={(e) => (setToolsProvided(e.target.value))} id="tools">
                            <option value="" disabled>Choisir une option</option>
                            <option value="Y">Oui</option>
                            <option value="N">Non</option>
                            <option value="A">Outils non nécessaires</option>
                        </select>
                    </fieldset>
                </div>

                <div className="form__block-3 form__block bloc--bg-yellow">

                    <fieldset>
                        <legend className="form__block__title"> Date et durée pour le service demandé </legend>

                        <div className="bloc--2-2 form__block__wrapper">

                        
                            <div className="form__block__column">

                                    <label htmlFor="dateType"> Choisissez si vous souhaitez mettre une date de fin, une date de début, ou une date précise </label>
                                    <select data-name="datetimeType" id="dateType" value={datetimeType} onChange={(e) => (setDateTimeType(e.target.value))}>
                                        <option disabled value=""> -- Choisir une option -- </option>
                                        <option value='B'> Avant la date choisie </option>
                                        <option value='O'> Seulement date choisie </option>
                                        <option value='A'> A partir de la date choisie </option>
                                    </select>

                                <label htmlFor="date"> Choisissez la date </label>
                                <input  
                                    value={dateTimePost}
                                    onChange={(e) => (setDateTimePost(e.target.value))}
                                    data-name="datetimePost" 
                                    id="date" 
                                    type="datetime-local"
                                />  
                            </div>

                            <div className="form__block__column">
                                <label htmlFor="lengthService"> Durée en heures </label>
                            
                                <select aria-required="true" data-name="timeLength" id="lengthService" value={timeLength} onChange={(e) => (setTimeLength(e.target.value))}>
                                    <option disabled value=""> -- Choisir une durée -- </option>
                                    <option value='15'>15 mins</option>
                                    <option value='30'>30 mins</option>
                                    <option value='45'>45 mins</option>
                                    <option value='60'>1 heure</option>
                                    <option value='90'>1h30</option>
                                    <option value='120'>2h</option>
                                    <option value='150'>+ de 2 heures</option>
                                </select>
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
                                onChange={(e) => (setAddress(e.target.value))}
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
                                onChange={(e) => (setCity(e.target.value))}
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
                                onChange={(e) => (setZipCode(e.target.value))}
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

                <button className="button-yellow"> Créer votre annonce </button>

            </form>
        </main>
    );
}

export default FormAnnonce;
