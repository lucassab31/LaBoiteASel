import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {Helmet} from "react-helmet";
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const Annonce = () => {
    require("../../../public/css/annonce.css");
    const title = "Titre de l'annonce";

    let  baseUrl = "http://127.0.0.1:8000/api/posts/"; 

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
        const apiPost = await axios.get(baseUrl+"view/"+id);
        const apiCategories = await axios.get("http://127.0.0.1:8000/api/posts/add");

        //console.log(apiPost.data.data.created_at); 
        let date = apiPost.data.data.created_at;
        date = new Date(apiPost.data.data.created_at).toISOString().slice(0,10);
        console.log(date);

        apiPost.data.data.created_at = date; 
        console.log(apiPost.data.data.created_at);

        setDataPost({
            dataPost: await apiPost.data.data, 
            listCategories: await apiCategories.data.data,
            postCreatedAt : await  apiPost.data.data.created_at
        });

     
        
        // find category name for each post
        console.log("toto");
        for (let category of apiCategories.data.data) {
            if (category.id === apiPost.data.data.category_id ) {
                post.category_name = category.title;
                console.log(post.category_name);
            }
        }
        
    };
    useEffect(() => {
        fetchDataPost();

       }, []);

    


    //console.log(state.dataPost);
    //console.log(state.category);

    const tools = () => {
       
        if (state.dataPost.toolsProvided === "Y") {
            return "Tous les outils nécessaires seront fournis.";
        }
        else if (state.dataPost.toolsProvided === "N") {
            return "Il faudra apporter les outils nécessaires.";
        }
        else if (state.dataPost.toolsProvided === "A") {
            return "Pas d'outils nécessaires";
        }
    };

    
    return (
        <section id="annonce">
            <Helmet>
                    <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
            
            <div id="annonce_basicInfosContainer">
                <div id="annonce_basicInfos">
                    <h2>{state.dataPost.title}</h2>
                    <p>Crée le {state.postCreatedAt} par</p>
                    <div>
                        <div className="firstRow">
                            <div id="annonce_basicInfos-Category">
                                <CategoryIcon style={{ color: '#5BB286', fontSize:30}}/>
                                <p>Catégorie : </p>
                            </div>
                            <div id="annonce_basicInfos-Date">
                                <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                <p>Date</p>
                            </div>
                        </div>
                       
                       <div className="secondRow">
                            <div id="annonce_basicInfos-Length">
                                <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                <p>{state.dataPost.timeLength} heures</p>
                            </div>
                            <div id="annonce_basicInfos-salt">
                                <p>{state.dataPost.cost} grains de sel</p>
                            </div>
                       </div>
                    </div>
                    <div id="annonce_actionBtn">
                        <button className="yellowButton"><Link to="/validation">Rendre service</Link></button>
                    </div>
                </div>

                <div id="annonce__btn">
                    <button className="button-blue">Retour à la liste des annonces</button>
                    <button className="button-blue">Voir le profil de la personne</button>
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

        </section>
    );
}

export default Annonce;
