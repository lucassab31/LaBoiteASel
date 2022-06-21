import React, {Link} from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';



const NavigationPanelAdmin = () => {
    require ("../../../public/css/panelAdmin.css");

    return(
        <nav role="navigation" className="bloc-panel bloc--bg-white">
            <h2>Navigation</h2>
            <div className="menu">
                <div className="title-accueil">
                    <p>Accueil</p> 
                    {/* <Link> Accueil </Link> : à ajouter */}
                </div>
                <div className="membres">
                    <div className="title">
                        <GroupsOutlinedIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} />
                        {/* <Link> Membres </Link> : à ajouter */}
                        <KeyboardArrowDownRoundedIcon aria-hidden="true" style={{ color: '#F07C63', fontSize: 20 }} />
                    </div>
                    <div>
                        <a>Liste des membres</a>
                        <a>Ajouter un membre</a>
                    </div>
                </div>
                <div className="statistiques">
                    <div className="title">
                        <QueryStatsIcon aria-hidden="true" style={{ color: '#1F294C', fontSize: 20 }} />
                        {/* <Link> Statistiques </Link> : à ajouter */}
                        <KeyboardArrowDownRoundedIcon aria-hidden="true" style={{ color: '#F07C63', fontSize: 20 }} />
                    </div>
                    <div>
                        <a>Balance des services</a>
                        <a>Volume des échanges</a>
                        <a>Export des données</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationPanelAdmin;