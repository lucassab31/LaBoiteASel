import React from "react";
import { Button } from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import "../../../public/css/compteUser.css"

const CompteUser = () => {

    useEffect(() => {
        fetchPosts();

    }, []);
    const userForm = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/utilisateur");
        if (response.data.success) navigate("/");
        else {
            // afficher l'erreur "response.data.error"
            let error = document.getElementById("error");
            error.textContent = response.data.error;
        }
    }

    return (
        <main>
            <div className="bloc-white">
                <img className="bg-image" alt="" src="../../../images/jardin-profile.jpg"></img>
                <div className="user-image">Prénom <img alt="" src="../../../images/exemple-profile.png"></img> Nom</div>
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
                </div>
                <div className="right-panel">
                    <h3 className="panel-title">Statistiques des services rendus</h3>
                </div>
            </div>
        </main>
    );
}

export default CompteUser;