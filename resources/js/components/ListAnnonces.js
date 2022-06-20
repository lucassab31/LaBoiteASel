import React from "react";
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect } from 'react';
import FlatList from 'flatlist-react';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
const API_URL = process.env.MIX_APP_URL +'api/'; 

const ListAnnonces = () => {
    require("../../../public/css/listAnnonces.css");
    const title = "Liste des annonces";
    
    // Display posts 
    // Fetch data from database to get list of posts and category
    let  baseUrl = API_URL+"posts/"; 
    const [state, setData] = useState({
        posts: '', 
        listCategories:'',
    });

    const fetchPosts = async () => {
        const apiPosts = await axios.get(baseUrl);
        const apiCategories = await axios.get(baseUrl+"add");

        setData({
            posts: await apiPosts.data.data, 
            listCategories: await apiCategories.data.data
        });
       // console.log(apiPosts.data.data);
    };
    
    useEffect(() => {
            fetchPosts();
    }, []);


    // Filter part - form 
    const [category, setCategory] = useState("Jardinerie"); 
    const [lengthService, setLenghtService] = useState("15"); 
    const [date, setDate] = useState(""); 

    const handleCategoryChange = event => {
        setCategory(event.target.value);
       // console.log('The value of category is :', event.target.value);
    };
    const handleDateChange = event => {
        setDate(event.target.value);
        //console.log('The date is :', event.target.value);
    };
    const handleLengthServiceChange = event => {
        setLenghtService(event.target.value);
        //console.log('The value of category is :', event.target.value);
    };
    const handleClick = event => {
        event.preventDefault();
        console.log('-- result of the form --')
        console.log('category ', category);
        console.log('length of the service ', lengthService);
        console.log('date limit is ', date);
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
                        <select value={category}  onChange={handleCategoryChange} id="category" name="list" >
                            <FlatList list={state.listCategories} renderItem={item =>
                            <option value={item.title}>{item.title}</option> }/>
                        </select>
                    </div>

                    <div className="filtres_container">
                        <label htmlFor="date">Date</label>
                        <input type="datetime-local" id="date" name="date" value={date} onChange={handleDateChange}></input>
                    </div>
                    <div className="filtres_container">
                        <label htmlFor="lengthService">Durée du service (en heures)</label>
                        <select value={lengthService} onChange={handleLengthServiceChange} id="lengthService" name="lengthService" >
                            <option value="15">15 mins</option> 
                            <option value="30">30 mins</option> 
                            <option value="45">45 mins</option> 
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
