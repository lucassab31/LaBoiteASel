import React from "react";
import FlatList from 'flatlist-react';
import { useState, useEffect } from 'react';
import {Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {Routes, Route } from "react-router-dom";
import FormNewCategory from "./FormNewCategory";
import FormEditCategory from "./FormEditCategory";
const API_URL = process.env.MIX_APP_URL +'api/'; 

const ListCategories = () => {
    require ("../../../public/css/panelAdmin.css");
    let  baseUrl = API_URL+"admin/categories/"; 

    const [state, setData] = useState({
        listCategories:'',
    });

    // API request to fetch list of users 
    const fetchCategories = async () => {
        const apiCategories = await axios.get(baseUrl);
        //console.log(apiCategories);
    
        setData({
            listCategories: await apiCategories.data.data, 
        });
        console.log(apiCategories.data.data);
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryDelete = async (id) => {
       await axios.get(baseUrl+"delete/"+id);
       fetchCategories();
    };

    return(
        <main>

            <h2 className="adminPanelList_title"> Liste des catégories </h2>
            <div className="listCategories">
                <Link className="button-blue" to="addCategory">Ajouter une catégorie</Link>
                <table>
                    <caption> Affichage des informations des catégories</caption>
                    <thead>
                        <tr>
                            <th scope="col">Nom de la catégorie</th>
                            <th scope="col">Description</th>
                            <th scope="col">Modifier la catégorie</th>
                            <th scope="col">Supprimer la catégorie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <FlatList keyExtractor={(item) => item.id} list={state.listCategories}  renderItem={item => 
                            <tr>
                                <td>{item.title} {item.lastName}</td>
                                <td>{item.description}</td>
                                {/*to={`/validation?id=${state.dataPost.user_id}`} {"/editCategory/:"+item.id}*/}
                                <td><Link to={"editCategory/"+parseInt(item.id)}> Mettre à jour la catégorie</Link></td>
                                <td onClick={() => handleCategoryDelete(item.id)}><DeleteIcon style={{ color: '#5bb385', fontSize:28 }}/> Supprimer</td>
                            </tr>          
                            }
                        />  
                    </tbody>
                </table>       
            </div>
        </main>
    )
}

export default ListCategories;