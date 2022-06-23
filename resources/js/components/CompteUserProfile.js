import React, { useState } from "react";
import { useEffect } from "react";
import {Helmet} from "react-helmet";

const CompteUserProfile = () => {

    const API_URL = process.env.MIX_APP_URL + 'api/';

    const [resp, setResp] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);

    let title = "Mon profil";

    async function fetchUser() {
        const queryParams = new URLSearchParams(window.location.search);
        let id = queryParams.get('id');
        if (id == null) id = 0;
        const apiUser = await axios.get(API_URL + "users/view/0", { headers: { Authorization: 'Bearer ' + window.sessionStorage.getItem('token') } });
        setResp(apiUser.data.data);
    }
    
    if(resp !== undefined) {       
        return (
                <div className="bloc-red">
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                    <div className="left-panel">
                        <h3 className="panel-title">Informations</h3>
                        <p style={{ fontWeight: "bold", color: '#1F294C' }}>Téléphone : {resp.phone}</p>
                        <p style={{ fontWeight: "bold", color: '#1F294C' }}>Adresse : {resp.address}</p>
                        <p style={{ fontWeight: "bold", color: '#1F294C' }}>Ville : {resp.city}</p>
                    </div>
                    <div className="right-panel">
                        <h3 className="panel-title">Statistiques des services rendus</h3>
                        <p style={{ fontWeight: "bold", color: '#1F294C' }}>Nombre de service rendus : {resp.posts_maker_count}</p>
                        <p style={{ fontWeight: "bold", color: '#1F294C' }}>Nombre de service demandés : {resp.posts_count}</p>
                    </div>
                </div>
        );
    } else {
        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                <div className="bloc-white">
                    <img className="bg-image" alt="" src="../../../images/jardin-profile.jpg"></img>
                    <div className="user-image"><img alt="" src="../../../images/exemple-profile.png"></img><p></p></div>
                </div>
                <div className="bloc-red">
                    <div className="left-panel">
                        <h3 className="panel-title">Informations</h3>
                        <p>Aucun profil ne correspond à votre demande</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default CompteUserProfile;