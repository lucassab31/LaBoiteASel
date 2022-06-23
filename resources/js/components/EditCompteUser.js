import React, { useState, useEffect, useFocus } from "react";
import { Button } from "react-bootstrap";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const EditCompteUser = () => {
    const API_URL = process.env.MIX_APP_URL + 'api/';


    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState();
    const [resp, setResp] = useState({});
    const [edited, setEdit] = useState();
    const [focusInput, setFocusInput] = useState();
    const [list, setList] = useState("");
    const [result, setResult] = useState({
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        address: "",
        zipCode: "",
        city: "",
        password: "",
    });

    const EditUser = () => {
        //aria-live="polite" : to indicate a message for screen-readers
        return edited ? <div> <p onBlur={destroyMessage} id="edited" aria-live="polite"> Vos informations ont bien été modifiée !</p> </div> : null;
    }


    function destroyMessage(e){
        setTimeout(setEdit(false), 5000);
        e.target.removeAttribute("tabindex");
    }

    useEffect(()=>{
        const message = document.querySelector( '#edited' );
        //set tabindex to focus on the message when scroll then remove it when the focus on the element is lost
        if(message){
            message.setAttribute("tabindex", "-1");
            message.scrollIntoView( { behavior: 'smooth', block: 'start' } );
            message.focus();
            //message.onblur = message.removeAttribute("tabindex");
        }
    }, [EditUser])

    useEffect(() => {
        fetchUser();
    }, []);
    async function fetchUser() {
        const queryParams = new URLSearchParams(window.location.search);
        const apiUser = await axios.get(API_URL + "users/view/0", { headers: { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') } });
        setFirstName(apiUser.data.data.firstName);
        setLastName(apiUser.data.data.lastName);
        setEmail(apiUser.data.data.email);
        setPhone(apiUser.data.data.phone);
        setAddress(apiUser.data.data.address);
        setZipCode(apiUser.data.data.zipCode);
        setCity(apiUser.data.data.city);
    }

    async function update() {
        let data = {
            "lastName": lastName,
            "firstName": firstName,
            "phone": phone,
            "email": email,
            "address": address,
            "zipCode": zipCode,
            "city": city,
            "password": password,
        };

        await axios.post(
            API_URL + "users/edit",
            data,
            {
                headers: { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') }
            }
        )
            .then(res => (console.log(res.data), setEdit(res.data.validate_err ? false : true), setErrors(res.data.validate_err)));
    }

    async function submitForm(e) {
        e.preventDefault();
        update();  
    }

    useEffect(() => {
        setFocus();
    }, [errors]);


    useEffect(() => {
        if (focusInput) {
            focusInput.focus();
        }
    }, [focusInput]);

    function setFocus() {
        //set focus on the first invalid input
        let input = document.querySelectorAll("[aria-invalid=true]")[0];
        if (input) {
            setFocusInput(input);
        }
    }

    function removeError(name) {
        //remove attributes when error is resolved
        let input = document.querySelector("[data-name=" + name + "]");
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
    }

    function formError(name) {
        // set aria-invalid = true for screen-reader & aria-describedby which read the error when focus is on field
        let input = document.querySelector("[data-name=" + name + "]");
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", name + "__error");
    }

    const DisplayErrors = (inputName) => {
        if (errors) {
            //formError(inputName.inputName);
            let contentErr = `${errors[inputName.inputName]}`;
            return contentErr && contentErr !== "undefined" ? (formError(inputName.inputName), <p id={inputName.inputName + "__error"} className="field_error"> {contentErr} </p>) : (removeError(inputName.inputName), null);
        }
        else {
            return null;
        }
    }

    return (
        <main>
            <div className="bloc-white">
                <img className="bg-image" alt="" src="../../../images/jardin-profile.jpg"></img>
                <div className="user-image"><img alt="" src="../../../images/exemple-profile.png"></img><p>{resp.firstName} {resp.lastName}</p></div>
                <div className="bloc-menu">
                    <Button className="button-form">
                        <ArrowBackIcon aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} navigate="./CompteUser.js" />Retour au profil
                    </Button>
                </div>
            </div>
            <div className="bloc-red">
                <div className="edit-panel">
                    <h3 className="panel-title">Modifier mes informations</h3>

                    <EditUser/>

                    <form onSubmit={submitForm} >
                        <fieldset className="form-user">
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="lastName">Nom :</label>
                            <input
                                aria-required="true"
                                data-name="lastName"
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => (setLastName(e.target.value))}
                                placeholder="Votre nom..." />
                            <DisplayErrors inputName="lastName"></DisplayErrors>
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="firstName">Prénom :</label>
                            <input
                                aria-required="true"
                                data-name="firstName"
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => (setFirstName(e.target.value))}
                                placeholder="Votre prénom..." />
                            <DisplayErrors inputName="firstName"></DisplayErrors>
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="phone">Téléphone :</label>
                            <input
                                aria-required="true"
                                data-name="phone"
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => (setPhone(e.target.value))}
                                placeholder="Votre numéro de téléphone..." />
                            <DisplayErrors inputName="phone"></DisplayErrors>
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="mail">E-mail :</label>
                            <input
                                aria-required="true"
                                data-name="email"
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => (setEmail(e.target.value))}
                                placeholder="Votre e-mail..." />
                            <DisplayErrors inputName="email"></DisplayErrors>
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="address">Adresse :</label>
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
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="city">Ville :</label>
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
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="zipcode">Code postal :</label>
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
                            <label className="label" style={{ fontWeight: "bold", color: '#1F294C' }} htmlFor="lastName">Mot de passe :</label>
                            <input
                                aria-required="false"
                                data-name="password"
                                id="password"
                                type="string"
                                value={password}
                                onChange={(e) => (setPassword(e.target.value))}
                                placeholder="Votre mot de passe..." />
                            <DisplayErrors inputName="password"></DisplayErrors>
                        </fieldset>
                        <button className="button-form">
                            <PlaylistAddCheckIcon aria-hidden="true" style={{ color: '#5BB286', fontSize: 30 }} />Enregistrer mes informations
                        </button>
                        
                    </form>

                </div>
            </div>
        </main>
    );
}

export default EditCompteUser;
