import React from "react";
import FlatList from 'flatlist-react';
import { useState, useEffect } from 'react';
import {Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
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

    const handleUserDelete = async (id) => {
        const deleteUser = await axios.get(baseUrl+"delete/"+id);
        console.log(deleteUser);
        fetchUsers();
     };

    return(
        <main>
            <h2 className="adminPanelList_title"> Liste des membres </h2>
            <Link className="button-blue" to="addMembers">Ajouter un membre</Link>

            <div className="listUsers">
                <table>
                    <caption> Affichage des informations des membres</caption>
                    <thead>
                        <tr>
                            <th scope="col">Nom & Prénom</th>
                            <th scope="col">Adresse mail</th>
                            <th scope="col">Grains de sels restants</th>
                            <th scope="col">Statut de cet utilisateur</th>
                            <th scope="col">Modifier le statut de cet utilisateur</th>
                            <th scope="col">Supprimer l'utilisateur</th>                   
                        </tr>
                    </thead>
                    <tbody>
                    <FlatList keyExtractor={(item) => item.id} list={state.listUsers}  renderItem={item => 
                        <tr>
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.money}</td>
                            <td>{item.role}</td>
                            <td><Link to={"editMember/"+parseInt(item.id)}> Mettre à jour le statut de cet utilisateur</Link></td>
                            <td onClick={() => handleUserDelete(item.id)}><DeleteIcon style={{ color: '#5bb385', fontSize:28 }}/> Supprimer</td>
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