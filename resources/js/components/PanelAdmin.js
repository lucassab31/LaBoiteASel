import React from "react";
import NavigationPanelAdmin from './NavigationPanelAdmin';
import PanelAdminHome from './PanelAdminHome';
import FormNewUser from './FormNewUser';
import {Routes, Route } from "react-router-dom";
import FormNewUser from "./FormNewUser";
import PanelAdminTable from "./PanelAdminTable";
import UsersList from "./UsersList";


const PanelAdmin = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <main>
                <h2> Administration du site </h2>
                <div className="block--1-5">
                    <NavigationPanelAdmin/>

                    <Routes>
                        <Route index path="/" element={<PanelAdminHome />} />
                        <Route path="addMembers" element={<FormNewUser/>}/>
                        <Route path="listMembers" element={<UsersList/>} />
                        <Route path="adminTable" element={<PanelAdminTable/>} />
                        {/* <Route path="/members/add" element={<Component />} /> */}
                    </Routes>
                </div>
        </main>
    )
}

export default PanelAdmin;