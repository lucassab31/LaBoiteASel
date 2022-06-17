import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect } from 'react';
import FlatList from 'flatlist-react';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const ListAnnonces = () => {
    require("../../../public/css/listAnnonces.css");
    const title = "Liste des annonces";
    
    //let loading = true; 
    // Fetch data from database to get list of posts and category
    const [state, setData] = useState({
        posts: '', 
        listCategories:''
    });
    const fetchPosts = async () => {
        const apiPosts = await axios.get("http://127.0.0.1:8000/api/posts");
        const apiCategories = await axios.get("http://127.0.0.1:8000/api/posts/add");

       //console.log(apiPosts);
        setData({
            posts: await apiPosts.data.data, 
            listCategories: await apiCategories.data.data
        });

        // find category name for each post
        for (let post of apiPosts.data.data ) {
            //console.log(post);
            //console.log(post.category_id);
            for (let category of apiCategories.data.data) {
                if (category.id === post.category_id ) {
                    post.category_name = category.title;
                    //console.log(post.category_name);
                }
            }
        }
    };
    useEffect(() => {
            fetchPosts();

       }, []);
    //console.log(state.posts);
    //console.log(state.listCategories);
  

    return (
        <section id="annonces">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <p role="status" class="visually-hidden"> La Boite à Sel - {title} </p>

            <div  id="filtres">
                <h2>Filtres</h2>
                <p id="filtres__description">
                    Aidez-vous des filtres afin de repérer les annonces
                    qui peuvent vous intéresser.
                </p>


                {/* form to filter the posts */}
                <form action="#" method="post">
                    <div className="filtres_container">
                        <label htmlFor="category">Catégorie</label>
                        <select id="category" name="list" >
                            <FlatList list={state.listCategories} renderItem={item =>
                            <option value="category">{item.title}</option> }/>
                        </select>
                    </div>

                    <div className="filtres_container">
                        <label htmlFor="date">Date</label>
                        <input type="text" id="date" placeholder="24/06/2022" name="date"/>
                    </div>
                    <div className="filtres_container">
                        <label htmlFor="lengthService">Durée du service (en heures)</label>
                        <select id="lengthService" name="lengthService" >
                            <option value="15">15 mins</option> 
                            <option value="30">30 mins</option> 
                            <option value="45">45 mins</option> 
                            <option value="90">1h30 mins</option> 
                            <option value="120">2h</option> 
                            <option value="150">+ de 2h</option> 
                        </select>
                    </div>

                    <button className="button-blue">Filtrez les annonces</button>
                </form>
            </div>

            <div id="listAnnonces">
                <h2>Liste des annonces</h2>
                <div id="listAnnonces__container">

                <FlatList list={state.posts} renderItem={item => 
                    <div className="annonce">
                        <img src="#" alt=""/>
                        <div className="annonce__infos">

                            <h3>{item.title}</h3>
                            <div className="annonce__infos">
                                <div className="annonce__infosCategorie">
                                    <CategoryIcon style={{ color: '#5BB286', fontSize:30}}/>
                                    <p>Catégorie</p>
                                </div>
                                <div className="annonce__infosDate">
                                    <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                    <p>19/06/2022</p>
                                </div>
                            </div>
                            
                            <div className="annonce_btn">
                                <button className="button-blue"><Link to={`/annonce?id=${item.id}`} className="annonce__link--white">Voir l'annonce</Link></button>
                                <button className="yellowButton"><Link to="/validation" className="annonce__link--blue">Rendre service</Link></button>
                            </div>
                        </div>
                    </div>            
            }
                />                    
                </div>
            </div>
        </section>
    );
}

export default ListAnnonces;
