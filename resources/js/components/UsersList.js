import React from "react";
import FlatList from 'flatlist-react';
import { useState, useEffect } from 'react';
const API_URL = process.env.MIX_APP_URL +'api/'; 

const UsersList = () => {
    require ("../../../public/css/panelAdmin.css");

    const [state, setData] = useState({
        listUsers:'',
    });

    // API request to fetch list of users 
    const fetchUsers = async () => {
        const apiUsers = await axios.get(baseUrl);

        setData({
            listUsers: await apiUsers.data.data, 
        });
        //console.log(apiPosts.data.data);
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <main>
                <h2> Liste des membres </h2>
                <div className="block--1-5">
<<<<<<< HEAD
=======

                                
>>>>>>> list users component created
                </div>
    
        </main>
    )
}

export default UsersList;