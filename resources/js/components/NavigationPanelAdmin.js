import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {Routes, Route, Link } from "react-router-dom";


const NavigationPanelAdmin = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <nav role="navigation" className="bloc-panel bloc--bg-white">
            <h2>Navigation</h2>
            <div className="adminPanel_menu">
                <div className="title-accueil">
                    {/*<p>Accueil</p> */}
                    <Link to="/admin"> Accueil </Link>
                </div>
                <div className="membres">
                    <div> {/* className="title" */}
                        {/*<GroupsOutlinedIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} /> */}
                        {/* <Link> Membres </Link> : à ajouter */}
                        {/*<KeyboardArrowDownRoundedIcon aria-hidden="true" style={{ color: '#F07C63', fontSize: 20 }} /> */}
                    </div>
                    <div>
                        <Link to="listMembers">Gestion des membres</Link>
                    </div>

                    <div>
                        <Link to="listCategories">Gestion des catégories</Link>
                    </div>
                </div>
                <div className="statistiques">
                    <div> {/* className="title" */}
                        {/*<QueryStatsIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} */}
                        {/* <Link> Statistiques </Link> : à ajouter */}
                        {/*<KeyboardArrowDownRoundedIcon aria-hidden="true" style={{ color: '#F07C63', fontSize: 20 }} /> */}
                    </div>
                    <div>
                        <Link to="adminTable">Balance des services et volume des échanges </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationPanelAdmin;