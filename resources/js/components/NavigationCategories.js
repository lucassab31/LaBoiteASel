import React from "react";

import {Routes, Route } from "react-router-dom";
import ListCategories from "./ListCategories";
import FormNewCategory from "./FormNewCategory";
import FormEditCategory from "./FormEditCategory";


const PanelAdmin = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <main>
            <Routes>
                <Route index path="/" element={<ListCategories/>} />
                <Route path="addCategory" element={<FormNewCategory/>} />
                <Route path="editCategory/:id" element={<FormEditCategory/>} />
            </Routes>
        </main>
    )
}

export default PanelAdmin;