import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import "../../../public/css/navigationPanelAdmin.css"

const NavigationPanelAdmin = () => {
    <main>
        <div className="bloc-white">
            <h2>Navigation</h2>
            <div className="menu">
                <h1 className="title-accueil">
                    <HomeRoundedIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} />Accueil
                </h1>
                <div className="membres">
                    <h3 className="title">
                        <GroupsOutlinedIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} />
                        Membres
                        <KeyboardArrowDownRoundedIcon aria-hidden="true" style={{ color: '#F07C63', fontSize: 20 }} />
                    </h3>
                    <link>Liste des membres</link>
                    <link>Ajouter un membre</link>
                </div>
                <div className="statistiques">
                    <h3 className="title">
                        <QueryStatsIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} />
                        Statistiques
                        <KeyboardArrowDownRoundedIcon aria-hidden="true" style={{ color: '#F07C63', fontSize: 20 }} />
                    </h3>
                    <link>Balance des services</link>
                    <link>Volume des échanges</link>
                    <link>Export des données</link>
                </div>
            </div>
        </div>
    </main>
}

export default NavigationPanelAdmin;