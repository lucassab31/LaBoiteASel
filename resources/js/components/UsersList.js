import React from "react";
import FlatList from 'flatlist-react';
import { useState, useEffect } from 'react';
const API_URL = process.env.MIX_APP_URL +'api/'; 

const UsersList = () => {
    require ("../../../public/css/panelAdmin.css");
    let  baseUrl = API_URL+"admin/users/"; 

    const [state, setData] = useState({
        listUsers:'',
    });

    // API request to fetch list of users 
    const fetchUsers = async () => {
        const apiUsers = await axios.get(baseUrl);
        
        setData({
            listUsers: await apiUsers.data.data, 
        });
        console.log(apiUsers.data.data);
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <main>
                <h2> Liste des membres </h2>

                <div className="listUsers">
                <table>
                        <caption> Affichage des informations des membres</caption>
                        <thead>
                            <tr>
                                <th scope="col">Nom & Prénom</th>
                                <th scope="col">Adresse mail</th>
                                <th scope="col">Grains de sels restants</th>
                            </tr>
                        </thead>
                        <tbody>
                        <FlatList keyExtractor={(item) => item.id} list={state.listUsers}  renderItem={item => 
                            <tr>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.money}</td>
                            </tr>          
                            }
                        />  
                        </tbody>
                    </table>       
                </div>
        </main>
    )
}

export default UsersList;