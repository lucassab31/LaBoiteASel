import React, { useState, componentDidUpdate } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import CompteUserProfile from "./CompteUserProfile";
import CompteUserPosts from "./CompteUserPosts";
import CompteUserCandidates from "./CompteUserCandidates";
import EditCompteUser from "./EditCompteUser";
import { Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";


const CompteUser = () => {

    const API_URL = process.env.MIX_APP_URL + 'api/';

    const [resp, setResp] = useState({});
    const [infoId, setInfoId] = useState("");

    //const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        const queryParams = new URLSearchParams(window.location.search);
        let id = queryParams.get('id');
        if (id == null) id = 0;
        const apiUser = await axios.get(API_URL + "users/view/" + id, { headers: { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') } });
        setResp(apiUser.data.data);
        setInfoId(apiUser.data.data.id);
    }

    require("../../../public/css/compteUser.css");

    const ButtonProfile = () => {
        if (resp.hasOwnProperty("phone")) {
            if (resp.role == 'A') {
                return (
                    <span>
                        <Link to="edit" className="">
                            <EditIcon focusable="false" aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Modifier le profil
                        </Link>
                        <Link to="/admin" className="">
                            <AdminPanelSettingsIcon focusable="false" aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Panel admin
                        </Link>
                    </span>
                );
            } else {
                return (
                    <Link to="edit" className="">
                        <EditIcon focusable="false" aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Modifier le profil
                    </Link>
                );
            }
        } else {
            return (
                <Link to="" className="">
                    <ReportProblemIcon focusable="false" aria-hidden="true" style={{ color: '#5BB286', fontSize: 15 }} />Signaler le profil
                </Link>
            );
        }
    }

    return(
        <main>
            <div className="bloc-white">
                <div className="user-image">
                    <h2>{resp.firstName} {resp.lastName}</h2>
                </div>
                <nav className="bloc-menu">
                    <Link to={"myPosts/"}>Voir mes annonces</Link>
                    <Link to="/utilisateur">Mes infos de profil</Link>
                    <Link to={"candidatures/"}> Gérer les candidatures à mes annonces </Link>
                    <ButtonProfile />
                    <Link className="" to="/create"> Créer une nouvelle annonce </Link>
                </nav>
            </div>
            
            <Routes>
                <Route index path="/" element={<CompteUserProfile />} />
                <Route path={"myPosts/"} element={<CompteUserPosts />} /> 
                <Route path={"candidatures/"} element={<CompteUserCandidates />} />
                <Route path={"edit/"} element={<EditCompteUser/>}/>
            </Routes>
        </main>
    );
}

export default CompteUser;