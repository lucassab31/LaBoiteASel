import React from "react";
import { useState, useEffect } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {Helmet} from "react-helmet";
const API_URL = process.env.MIX_APP_URL +'api/'; 

const Validation = () => {
    require("../../../public/css/validation.css");
    const title = "Validation de ma demande"; 

     // get the id of the user who made the post from the url 
     const queryParams = new URLSearchParams(window.location.search);
     const id = queryParams.get('id');
     let  baseUrl = API_URL+"users/"; 

     const [state, setData] = useState({
        userName: '', 
    });

    const fetchUserName = async () => {
        const apiUser = await axios.get(baseUrl+"view/"+id, 
        { headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}}); 
        setData({
            userName: await apiUser.data.data, 
        });
    };
    useEffect(() => {
        fetchUserName();
    }, []);

    return (
        <main className="main-validation">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>

            <div className="bloc--icon"><ThumbUpAltIcon  aria-hidden="true" style={{ color: '#5BB286', fontSize:80}}/></div>
            <div className="bloc-yellow">
                <h2 className="bloc-title">Votre demande a bien été envoyée à {state.userName.firstName} . {state.userName.lastName} !</h2>
                <p>Vous recevrez une réponse dès que possible.</p>
            </div>
        </main>
    );
}

export default Validation;