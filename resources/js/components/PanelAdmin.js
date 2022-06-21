import React, {Link} from "react";
import NavigationPanelAdmin from './NavigationPanelAdmin';
import PanelAdminHome from './PanelAdminHome';
import {Routes, Route } from "react-router-dom";


const PanelAdmin = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <main className="block--1-5">
                {/*<Helmet titleTemplate="La Boîte à sel | %s">
                </Helmet> */}
                {/* possible de les mettre dans des components */}

                <NavigationPanelAdmin/>

                <Routes>
                    <Route index path="/" element={<PanelAdminHome />} />
                    {/* <Route path="/members/list" element={<Component/>} /> */}
                    {/* <Route path="/members/add" element={<Component />} /> */}
                </Routes>

        </main>
    )
}

export default PanelAdmin;