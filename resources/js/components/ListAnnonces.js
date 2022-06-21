import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect } from 'react';
import FlatList from 'flatlist-react';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import Moment from 'react-moment';
const API_URL = process.env.MIX_APP_URL +'api/'; 

const ListAnnonces = () => {
    require("../../../public/css/listAnnonces.css");
    const title = "Liste des annonces";
    
    // Display posts 
    // Fetch data from database to get list of posts and category
    let  baseUrl = API_URL+"posts/"; 
    const [state, setData] = useState({
        posts: [{
            title : "",
            category : {title:""},
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
        }], 
        listCategories:'',
    });

    const fetchPosts = async () => {
        const apiPosts = await axios.get(baseUrl,
        {
            headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
        });
        const apiCategories = await axios.get(baseUrl+"add", 
        {
            headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
        });

        setData({
            posts: await apiPosts.data.data, 
            listCategories: await apiCategories.data.data
        });
        //console.log(apiPosts.data.data);


        for (let post of apiPosts.data.data) {
            let dateText = ""; 
            switch (post.datetimeType) {
                case "B":
                    dateText =  "Avant le ";
                    break;
                case "O":
                    dateText =  "À faire le ";
                    break;
                case "A":
                    dateText =  "Après le ";
                    break; 
            } 
            post.dateText = dateText; 
        }
    };
    
    useEffect(() => {
            fetchPosts();
    }, []);


    // Filter part - form 
    const [category, setCategory] = useState("Jardinerie"); 
    const [lengthService, setLenghtService] = useState("15"); 
    const [date, setDate] = useState(""); 
    const [searchDateSpecification, setSearchDateSpecification] = useState("A"); 

    const handleCategoryChange = event => {
        setCategory(event.target.value);
    };
    const handleDateChange = event => {
        setDate(event.target.value);
    };
    const handleLengthServiceChange = event => {
        setLenghtService(event.target.value);
    };
    const handleSearchDateSpecificationChange = event => {
        setSearchDateSpecification(event.target.value);
    };

    const handleClick = event => {
        event.preventDefault();
        let idCategory;

        for (const item of state.listCategories) {
            if (item.title == category) {
                 idCategory = item.id; 
            }
        }
        
        let urlApiRequest = baseUrl+"postsFiltered/"+idCategory+"/"+lengthService+"/"+date+"/"+searchDateSpecification;
        //console.log(urlApiRequest);
        fetchFilteredPosts(urlApiRequest);
    }; 
    console.log(state.posts);

    const fetchFilteredPosts = async (urlRequest) => {
        await axios.get(urlRequest).then( resp=>{
              setData({
            ...state, posts: resp.data.data, 
    })});
    };

    const displayDatePost =  (item) => {
        //console.log(item);
       
        /*let dateText = ""; 
        switch (item.datetimeType) {
            case "B":
                dateText =  "Avant le ";
                break;
            case "O":
                dateText =  "À faire le ";
                break;
            case "A":
                dateText =  "Après le ";
                break; 
        } 
        item.dateText = dateText; 
        console.log(item);*/
    };


    return (
        <main id="annonces">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>

            <div  id="filtres">
                <h2>Filtres</h2>
                <p id="filtres__description">
                    Aidez-vous des filtres afin de repérer les annonces
                    qui peuvent vous intéresser.
                </p>


                {/* form to filter the posts */}
                <form>
                    <div className="filtres_container">
                        <label htmlFor="category">Catégorie</label>
                        <select value={category}  onChange={handleCategoryChange} id="category" name="list">
                            <option value="" disabled>Entrez une catégorie</option> 
                            <FlatList list={state.listCategories} renderItem={item=><option value={item.title}>{item.title}</option>}/>
                        </select>
                    </div>

                    <div className="filtres_container">
                        <label htmlFor="category">Chercher les postes dont le service est à faire : </label>
                        <select value={searchDateSpecification}  onChange={handleSearchDateSpecificationChange} id="category" name="list">
                            <option value="B">Avant le</option>
                            <option value="O">Le</option>
                            <option value="A">Après le</option>
                        </select>
                    </div>

                    <div className="filtres_container">
                        <label htmlFor="date">Date</label>
                        <input type="datetime-local" id="date" name="date" value={date} onChange={handleDateChange}></input>
                    </div>
                    <div className="filtres_container">
                        <label htmlFor="lengthService">Durée du service (en heures)</label>
                        <select value={lengthService} onChange={handleLengthServiceChange} id="lengthService" name="lengthService">
                            <option value="" disabled>Entrez une durée</option> 
                            <option value="15">15 mins</option> 
                            <option value="30">30 mins</option> 
                            <option value="45">45 mins</option> 
                            <option value="60">1h</option> 
                            <option value="90">1h30 mins</option> 
                            <option value="120">2h</option> 
                            <option value="150">+ de 2h</option> 
                        </select>
                    </div>

                    <button onClick={handleClick} className="button-blue">Filtrez les annonces</button>
                </form>
            </div>

            <div id="listAnnonces">
                <h2>Liste des annonces</h2>
                <div id="listAnnonces__container">
                    <FlatList list={state.posts}  renderItem={item => 
                        <div className="annonce">
                            <img src="#" alt=""/>
                            <div className="annonce__infos">
                                <h3>{item.title}</h3>

                                <div className="annonce__infos">

                                     <div className="annonce__infosCategorie">
                                        <CategoryIcon style={{ color: '#5BB286', fontSize:30}}/>
                                        <p> {item.category.title}</p>
                                    </div>
                                   

                                    {(() => {
                                        if (item.datetimePost) {
                                            return (
                                                <div className="annonce__infosDate">
                                                <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                                <p>
                                                    {displayDatePost()}
                                                    <Moment format="DD/MM/YYYY">
                                                        {item.datetimePost}
                                                    </Moment>
                                                </p>
                                            </div>
                                            )
                                        }
                                    })()}
                                
                                </div>
                                
                            </div>
                            
                            <div className="annonce_btn">
                                <Link to={`/annonce?id=${item.id}`} className="button-blue">Voir l'annonce</Link>
                                <Link to="/validation" className="button-yellow">Rendre service</Link>
                            </div>
                        </div>           
                    }
                />                    
                </div>
            </div>
        </main>
    );
}

export default ListAnnonces;
