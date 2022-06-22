import React, {useState, useEffect, useFocus} from "react";
import {Helmet} from "react-helmet";
const API_URL = process.env.MIX_APP_URL +'api/'; 

const FormEditUser = () => {

    // get the id of the category
    const url = window.location.href;
    const urlSplit = url.split('/');
    console.log(urlSplit[6]);

    //require("../../../public/css/formNewUser.css");
    const [errors, setErrors] = useState();
    const [edited, setEdited] = useState();
    const [focusInput, setFocusInput] = useState();
    //const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    async function send(){
        let data = {
            "role": role,
        };
        console.log(data);
        await axios.post(
            API_URL + "admin/users/changeUserStatus/"+urlSplit[6], 
            data, 
            { headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}}
        )
        .then(res => (console.log(res.data),setEdited(res.data.error ? false : true), setErrors(res.data.error)));
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

    const MessageUserEdited = () => {
        //aria-live="polite" : to indicate a message for screen-readers
        return edited ? <div className="bloc--bg-red"> <p onBlur={destroyMessage} id="edited" aria-live="polite"> Votre venez de modifier le statut de cet utilisateur !</p> </div> : null;
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
    }, [MessageUserEdited])

    function destroyMessage(e){
        setTimeout(setEdited(false), 5000);
        e.target.removeAttribute("tabindex");
    }

    return (
        <main className="main-formEditCategory">
            <Helmet>
                <title> Modifier le statut de cet utilisateur</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - Modifier le statut de cet utilisateur</p>
  
            <MessageUserEdited/>
           <h2>Modifier le statut de cet utilisateur</h2>
            <form onSubmit={submitForm}>
                <div className="bloc--bg-yellow form">
                    <div className="form__inputsContainer">
                        <label htmlFor="role">Rôle de l'utilisateur</label>
                        <select name="role" data-name="role" aria-required="true" value={role} onChange={(e) => (setRole(e.target.value))} id="role">
                                <option value="" disabled>Choisir un rôle pour l'utilisateur</option>
                                <option value="U">Utilisateur</option>
                                <option value="A">Membre du conseil d'administration (admin)</option>
                        </select>
                        <DisplayErrors inputName="role"></DisplayErrors>
                    </div>

                    {/*<div className="form__inputsContainer">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            aria-required="true" data-name="password"
                            value={password} onChange={(e) => (setPassword(e.target.value))}
                            id="password" type="text" 
                            placeholder="Mot de passe"/>
                        <DisplayErrors inputName="password"></DisplayErrors>
                    </div>*/}
                </div>
                <button className="button-yellow"> Modifiez le statut de cet utilisateur</button>
            </form>
        </main>
    );
}

export default FormEditUser;