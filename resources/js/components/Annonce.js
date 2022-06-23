import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
const API_URL = process.env.MIX_APP_URL +'api/'; 


const Annonce = () => {

    let  baseUrl = API_URL+"posts/"; 
    console.log(baseUrl);

    // get the id of the post from the url 
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');

    // fetch data of the post from the database 
    const [state, setDataPost] = useState({
        dataPost: '', 
        listCategories:'', 
        postCreatedAt:''
    });
    const fetchDataPost = async () => {
        const apiPost = await axios.get(baseUrl+"view/"+id, 
        {
            headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
        });

        const apiCategories = await axios.get(baseUrl+"add",
        {
            headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
        });
        //console.log(apiPost.data.data); 

        let date = apiPost.data.data.created_at;
        date = new Date(apiPost.data.data.created_at).toISOString().slice(0,10);
        apiPost.data.data.created_at = date; 
        //console.log(apiPost.data.data.created_at);
     
        // find category name for each post
        for (let category of apiCategories.data.data) {
            if (category.id === apiPost.data.data.category_id ) {
                apiPost.data.data.category_name = category.title;
                //console.log(post.category_name);
            }
        }

        // firstname & lastname of the user 
        let username = apiPost.data.data.user.firstName + " " + apiPost.data.data.user.lastName; 

        setDataPost({
            dataPost: await apiPost.data.data, 
            listCategories: await apiCategories.data.data,
            postCreatedAt : await  apiPost.data.data.created_at, 
            userName : await username
        });
    };
    useEffect(() => {
        fetchDataPost();
    }, []);

    require("../../../public/css/annonce.css");
    const title = state.dataPost.title;

    const datePost = () => {
        switch (state.dataPost.datetimeType) {
            case "B":
                return "Avant le ";
                break;
            case "O":
                return "À faire le ";
                break;
            case "A":
                return "Après le ";
                break; 
        } 
    }

    const tools = () => {
        //console.log(state.dataPost.toolsType);
        let tools = state.dataPost.toolsType; 
        if (state.dataPost.toolsProvided === "Y") {
            return "Tous les outils nécessaires seront fournis.";
        }
        else if (state.dataPost.toolsProvided === "N") {
            return "Il faudra apporter les outils suivants : "+tools+".";
        }
        else if (state.dataPost.toolsProvided === "A") {
            return "Pas d'outils nécessaires";
        }
    };

    
    return (
        <main id="annonce">
            <Helmet>
                    <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
            
            <div id="annonce_basicInfosContainer">
                <div id="annonce_basicInfos">
                    <h2>{state.dataPost.title}</h2>
                    <p>Crée le 

                        <Moment className="annonce_basicInfosDateCreation" format="DD/MM/YYYY">
                            {state.postCreatedAt} 
                        </Moment>

                         par {state.userName}</p>
                    <div>
                        <div className="firstRow">
                            <div id="annonce_basicInfos-Category">
                                <CategoryIcon style={{ color: '#5BB286', fontSize:30}}/>
                                <p>{state.dataPost.category_name}</p>
                            </div>

                            {(() => {
                                if (state.dataPost.datetimePost) {
                                    return (
                                        <div id="annonce_basicInfos-Date">
                                            <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                            <p>
                                                {datePost()} 
                                                <Moment format="DD/MM/YYYY">
                                                    {state.dataPost.datetimePost}
                                                </Moment>
                                            </p>
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                       
                       <div className="secondRow">
                            <div id="annonce_basicInfos-Length">
                                <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                <p>{state.dataPost.timeLength} minutes</p>
                            </div>
                            <div id="annonce_basicInfos-salt">
                                <img src="../../../images/grains_sel.svg" alt=""/>
                                <p>{state.dataPost.cost} grains de sel</p>
                            </div>
                       </div>
                    </div>
                    <div id="annonce_actionBtn">
                        <Link  className="yellowButton" to={`/validation?id=${state.dataPost.user_id}`}>Rendre service</Link>
                    </div>
                </div>

                <div id="annonce__btn">
                    <Link to="/annonces" className="button-blue btn_listPosts">Retour à la liste des annonces</Link>
                    <Link className="button-blue"  to={`/utilisateur?id=${state.dataPost.user_id}`}>Voir le profil de la personne</Link>
                </div>
            </div>

            <div id="description">
                <h3>Description</h3>
                <div>
                    <p>
                     {state.dataPost.description}
                    </p>
                </div>
            </div>

            <div id="details">
                <h3>Autres détails</h3>
                <div id="details__infos">
                    <div>
                        <LocationOnIcon style={{ color: '#5BB286', fontSize:30}} />
                        <p>Localisation : {state.dataPost.city}</p>
                    </div>

                    <div>
                        <ConstructionIcon style={{ color: '#5BB286', fontSize:30}}/>
                        <p>{tools()}</p>
                    </div>
                </div>
            </div>

            <div id="annonces">
            
            </div>

        </main>
    );
}

export default Annonce;
