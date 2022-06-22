import React, {useState, useEffect, useFocus} from "react";
import {Helmet} from "react-helmet";
const API_URL = process.env.MIX_APP_URL +'api/'; 

const FormNewUser = () => {
    require("../../../public/css/formNewUser.css");

    const [errors, setErrors] = useState();
    const [focusInput, setFocusInput] = useState();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [created, setCreated] = useState();
    const [dateBirth, setDateBirth] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const [result, setResult] = useState({
        firstname:"", 
        lastname:"",
        email:"",
        phone:"", 
        //password: "", 
        dateBirth:"",
        cost : 0,
        address : "",
        zipCode : "",
        city : "",
    });

    async function send(){
        const date = dateBirth ? new Date(dateBirth) : "";

        let data = {
            "firstName": firstname, 
            "lastName": lastname,
            "email": email,
            "phone": phone, 
            //"password": password, 
            "dateOfBirth": dateBirth ? date.toISOString().slice(0, 19).replace('T', ' ') : '',
            "money" : 0,
            "role": "U",
            "address" : address,
            "zipCode" : zipCode,
            "city" : city,
        };
        //console.log(data);
        await axios.post(
            API_URL + "admin/users/add", 
            data, 
            { headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}}
        )
        .then(res => (console.log(res.data),setCreated(res.data.error ? false : true), setErrors(res.data.error)));
    }

    useEffect(() => {
        setFocus();
    }, [errors]);


    useEffect(() => {
        if(focusInput){
            focusInput.focus();
        }
    }, [focusInput]);

    async function submitForm(e) {
        e.preventDefault();
        send();
    }

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

    const MessageMemberCreated = () => {
        //aria-live="polite" : to indicate a message for screen-readers
        return created ? <div className="bloc--bg-red"> <p onBlur={destroyMessage} id="created" aria-live="polite"> Votre venez d'ajouter un nouveau membre sur la plateforme !</p> </div> : null;
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
    }, [MessageMemberCreated])

    function destroyMessage(e){
        setTimeout(setCreated(false), 5000);
        e.target.removeAttribute("tabindex");
    }

    return (
        <main className="main-formNewUser">
            <Helmet>
                <title> Ajouter un membre</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - Ajouter un membre </p>
            
            <MessageMemberCreated/>
            <h2>Ajouter un nouveau membre</h2>
            <form onSubmit={submitForm}>
                <div className="bloc--bg-yellow form">
                    <div className="form__inputsContainer">
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                            aria-required="true" 
                            data-name="firstName" 
                            value={firstname} onChange={(e) => (setFirstname(e.target.value))}
                            autoComplete="given-name"
                            id="firstname" 
                            type="text" 
                            placeholder="Prénom"/>
                        <DisplayErrors inputName="firstName"></DisplayErrors>
                    </div>

                    <div className="form__inputsContainer">
                        <label htmlFor="lastname">Nom</label>
                        <input 
                            aria-required="true" autoComplete="family-name"
                            data-name="lastName"
                            value={lastname} onChange={(e) => (setLastname(e.target.value))}
                            id="lastname" 
                            type="text" 
                            placeholder="Nom"/>
                        <DisplayErrors inputName="lastName"></DisplayErrors>
                    </div>

                    <div className="form__inputsContainer">
                        <label htmlFor="email">Adresse mail</label>
                        <input 
                            aria-required="true" autoComplete="email"
                            data-name="email" 
                            id="email" 
                            value={email} onChange={(e) => (setEmail(e.target.value))}
                            type="mail" 
                            placeholder="Adresse email"/>
                        <DisplayErrors inputName="email"></DisplayErrors>
                    </div>

                    <div className="form__inputsContainer">
                        <label htmlFor="phone">Numéro de téléphone</label>
                        <input 
                        aria-required="true" autoComplete="tel-local"
                        data-name="phone"  type="tel" id="phone" name="phone" 
                        value={phone} onChange={(e) => (setPhone(e.target.value))}
                        placeholder="Numéro de téléphone"/>
                        <DisplayErrors inputName="phone"></DisplayErrors>
                    </div>

                    <div className="form__inputsContainer">
                        <label htmlFor="dateBirth">Date de naissance</label>
                        <input  
                            autoComplete="bday" data-name="dateOfBirth" 
                            value={dateBirth} onChange={(e) => (setDateBirth(e.target.value))}
                            id="dateBirth" 
                            type="datetime-local"
                        />  
                        <DisplayErrors inputName="dateOfBirth"></DisplayErrors>
                    </div>

                    <div>
                        <div className="form__inputsContainer">
                            <label htmlFor="address">Adresse</label>
                            <input 
                                aria-required="true"  autoComplete="street-address"
                                data-name="address" id="address" type="text" 
                                value={address} onChange={(e) => (setAddress(e.target.value))}
                                placeholder="Adresse"/>
                             <DisplayErrors inputName="address"></DisplayErrors>
                        </div>

                        <div className="form__inputsContainer">
                            <label htmlFor="city"> Votre ville </label>
                            <input 
                                aria-required="true" autoComplete="address-level2" 
                                value={city} onChange={(e) => (setCity(e.target.value))}
                                data-name="city" id="city" type="text" 
                                placeholder="Ville"
                            />
                            <DisplayErrors inputName="city"></DisplayErrors>
                        </div>

                        <div className="form__inputsContainer">
                            <label htmlFor="zipcode"> Votre code postal </label>
                            <input 
                                aria-required="true" autoComplete="postal-code" 
                                data-name="zipCode" id="zipcode" type="text" 
                                value={zipCode} onChange={(e) => (setZipCode(e.target.value))}
                                placeholder="Code postal"
                            />
                            <DisplayErrors inputName="zipCode"></DisplayErrors>
                        </div>
                    </div>
                </div>
                <button className="button-yellow"> Ajouter un nouveau membre </button>
            </form>
        </main>
    );
}

export default FormNewUser;