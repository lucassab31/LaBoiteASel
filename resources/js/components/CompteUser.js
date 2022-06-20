import React from "react";
import { Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import "../../../public/css/compteUser.css"
import { useEffect } from "react";

const API_URL = process.env.MIX_APP_URL + '/api/';
console.log(API_URL);

const CompteUser = () => {

    useEffect(() => {
        fetchUser();

    }, []);
    const fetchUser = async () => {
        const response = await axios.get(API_URL + "users/view/5");
        console.log(response.data);
    }

    return (
        <main>
            <div className="bloc-white">
                <img className="bg-image" alt="" src="../../../images/jardin-profile.jpg"></img>
                <div className="user-image"><img alt="" src="../../../images/exemple-profile.png"></img></div>
                <div className="bloc-menu">
                    <p className="menu-option">À propos</p>
                    <Button className="menu-button">
                        <EditIcon aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Modifier le profil
                    </Button>
                    <Button className="menu-button">
                        <ReportProblemIcon aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Signaler le profil
                    </Button>
                </div>
            </div>
            <div className="bloc-red">
                <div className="left-panel">
                    <h3 className="panel-title">Informations</h3>
                    <p>Téléphone :</p>
                    <p>Adresse :</p>
                    <p>Ville :</p>
                    <p>Date d'inscription :</p>
                </div>
                <div className="right-panel">
                    <h3 className="panel-title">Statistiques des services rendus</h3>
                    <p>Nombre de service rendus :</p>
                    <p>Nombre de service postés :</p>
                </div>
            </div>
        </main>
    );
}

export default CompteUser;