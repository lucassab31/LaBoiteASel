import React, { useState } from "react";
import { Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import "../../../public/css/compteUser.css"
import { useEffect } from "react";


const CompteUser = () => {

    const API_URL = process.env.MIX_APP_URL + '/api/';
    console.log(API_URL);

    const [resp, setResp] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);
    async function fetchUser() {
        const apiUser = await axios.get(API_URL + "users/view/5");
        setResp(apiUser.data.data);
    }

    return (
        <main>
            <div className="bloc-white">
                <img className="bg-image" alt="" src="../../../images/jardin-profile.jpg"></img>
                <div className="user-image"><img alt="" src="../../../images/exemple-profile.png"></img><p>{resp.firstName} {resp.lastName}</p></div>
                <div className="bloc-menu">
                    <Link className="menu-option" to="">Mes annonces</Link>
                    <Link className="menu-option" to="">À propos</Link>
                    <Button className="menu-button">
                        <EditIcon aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Modifier le profil
                    </Button>
                    {/* <Button className="menu-button">
                        <ReportProblemIcon aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Signaler le profil
                    </Button> */}
                </div>
            </div>
            <div className="bloc-red">
                <div className="left-panel">
                    <h3 className="panel-title">Informations</h3>
                    <p>Téléphone : {resp.phone}</p>
                    <p>Adresse : {resp.address}</p>
                    <p>Ville : {resp.city}</p>
                </div>
                <div className="right-panel">
                    <h3 className="panel-title">Statistiques des services rendus</h3>
                    <p>Nombre de service rendus :</p>
                    <p>Nombre de service postés : {resp.post_count}</p>
                </div>
            </div>
        </main>
    );
}

export default CompteUser;