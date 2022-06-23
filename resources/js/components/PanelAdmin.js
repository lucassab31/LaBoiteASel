import React from "react";
import NavigationPanelAdmin from './NavigationPanelAdmin';
import PanelAdminHome from './PanelAdminHome';
import FormNewUser from './FormNewUser';
import {Routes, Route } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PanelAdminTable from "./PanelAdminTable";
import NavigationCategories from "./NavigationCategories";
import NavigationUser from "./NavigationUser";


const PanelAdmin = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <main>
            <h2 className="panelAdmin__title">
                <AdminPanelSettingsIcon  style={{ color: '#5BB286', fontSize:40 }} />
                 <span>Administration du site</span>
            </h2>
            <div className="block--1-5">
                <NavigationPanelAdmin/>

                <Routes>
                    <Route index path="/" element={<PanelAdminHome />} />
                    <Route path="addMembers" element={<FormNewUser/>}/>
                    <Route path="listMembers/*" element={<NavigationUser/>} />
                    <Route path="adminTable" element={<PanelAdminTable/>} />
                    <Route path="listCategories/*" element={<NavigationCategories/>} />
                </Routes>
            </div>
        </main>
    )
}

export default PanelAdmin;