import React from "react";
import FlatList from 'flatlist-react';
import { useState, useEffect } from 'react';
const API_URL = process.env.MIX_APP_URL +'api/'; 

const ListCategories = () => {
    require ("../../../public/css/panelAdmin.css");
    let  baseUrl = API_URL+"posts/"; 

    const [state, setData] = useState({
        listCategories:'',
    });

    // API request to fetch list of users 
    const fetchCategories = async () => {
        const apiCategories = await axios.get(baseUrl+"add");
        console.log(apiCategories);
        
        setData({
            listCategories: await apiCategories.data.data, 
        });
        console.log(apiCategories.data.data);
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);

    return(
        <main>
                <h2> Liste des membres </h2>
                <div className="listUsers">
                <table>
                        <caption> Affichage des informations des membres</caption>
                        <thead>
                            <tr>
                                <th scope="col">Nom de la catégorie</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        <FlatList keyExtractor={(item) => item.id} list={state.listCategories}  renderItem={item => 
                            <tr>
                                <td>{item.title} {item.lastName}</td>
                                <td>{item.description}</td>
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