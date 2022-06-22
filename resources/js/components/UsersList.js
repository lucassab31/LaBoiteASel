import React from "react";
import NavigationPanelAdmin from './NavigationPanelAdmin';
import PanelAdminHome from './PanelAdminHome';
import {Routes, Route } from "react-router-dom";


const UsersList = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <main>
                <h2> Administration du site </h2>
                <div className="block--1-5">

                    <Routes>
                        <Route index path="/" element={<PanelAdminHome />} />
                        {/* <Route path="/members/list" element={<Component/>} /> */}
                        {/* <Route path="/members/add" element={<Component />} /> */}
                    </Routes>
                </div>
        </main>
    )
}

export default UsersList;