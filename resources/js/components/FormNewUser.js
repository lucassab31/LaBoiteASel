import React from "react";
import {Helmet} from "react-helmet";
const API_URL = process.env.MIX_APP_URL +'api/'; 

const FormNewUser = () => {
    require("../../../public/css/formNewUser.css");

    async function submitForm(e) {
        e.preventDefault();
    }

    return (
        <main className="main-formNewUser">
            <Helmet>
                <title>La Boîte à Sel - Ajouter un membre</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - Ajouter un membre </p>
            
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="firstname">Prénom</label>
                    <input 
                        aria-required="true" 
                        data-name="firstname" 
                        autoComplete="given-name"
                        id="firstname" 
                        type="text" 
                        placeholder="Prénom"/>
                </div>

                <div>
                    <label htmlFor="lastname">Nom</label>
                    <input 
                        aria-required="true" 
                        data-name="lastname" 
                        autoComplete="family-name"
                        id="lastname" 
                        type="text" 
                        placeholder="Nom"/>
                </div>

                <div>
                    <label htmlFor="email">Adresse mail</label>
                    <input 
                        aria-required="true" 
                        data-name="email" 
                        id="email" 
                        autoComplete="email"
                        type="mail" 
                        placeholder="Adresse email"/>
                </div>

                <div>
                    <label htmlFor="phone">Numéro de téléphone</label>
                    <input 
                    aria-required="true" autoComplete="tel-national"
                    data-name="phone"  type="tel" id="phone" name="phone" 
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Numéro de téléphone"/>
                </div>

                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        aria-required="true" autoComplete="new-password"
                        data-name="password" 
                        type="password" 
                        id="password" name="password" minLength="8" 
                        required placeholder="Un mot de passe temporaire"/>
                </div>

                <div>
                    <label htmlFor="dateBirth">Date de naissance</label>
                    <input  
                        autoComplete="bday"
                        data-name="dateBirth" 
                        id="dateBirth" 
                        type="datetime-local"
                    />  
                </div>

                <div>
                    <div>
                        <label htmlFor="adress">Adresse</label>
                        <input 
                            aria-required="true" 
                            data-name="adress" 
                            autoComplete="street-address" 
                            id="adress" 
                            type="text" 
                            placeholder="Adresse"/>
                    </div>

                    <div>
                        <label htmlFor="city"> Votre ville </label>
                        <input 
                            aria-required="true"
                            autoComplete="address-level2" 
                            data-name="city" 
                            id="city" 
                            type="text" 
                            placeholder="Ville"
                        />
                    </div>

                    <div>
                        <label htmlFor="zipcode"> Votre code postal </label>
                        <input 
                            aria-required="true" 
                            autoComplete="postal-code" 
                            data-name="zipCode" 
                            id="zipcode" 
                            type="text" 
                            placeholder="Code postal"
                        />
                    </div>
                </div>

                <button className="button-yellow"> Ajouter un nouveau membre </button>
            </form>
        </main>
    );
}

export default FormNewUser;