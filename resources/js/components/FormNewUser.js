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
                    <label htmlFor="firstname"> Nom du membre </label>
                    <input 
                        aria-required="true" 
                        data-name="firstname" 
                        id="firstname" 
                        type="text" 
                        placeholder="Prénom"/>
                </div>

                <div>
                    <label htmlFor="lastname"> Nom du membre </label>
                    <input 
                        aria-required="true" 
                        data-name="lastname" 
                        id="lastname" 
                        type="text" 
                        placeholder="Nom"/>
                </div>
            </form>
        </main>
    );
}

export default FormNewUser;