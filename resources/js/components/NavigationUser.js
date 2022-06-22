
import React from "react";
import {Routes, Route } from "react-router-dom";
import UsersList from "./UsersList";
import FormEditUser from "./FormEditUser";
import FormNewUser from "./FormNewUser";

const NavigationUser = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <main>
            <Routes>
                <Route index path="/" element={<UsersList/>}/>
                <Route path="addMembers" element={<FormNewUser/>} />
                <Route path="editMember/:id" element={<FormEditUser/>} />
            </Routes>
        </main>
    )
}

export default NavigationUser;