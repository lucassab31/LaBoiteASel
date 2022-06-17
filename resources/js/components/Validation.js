import React from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Validation = () => {
    require("../../../public/css/validation.css");
    return (
        <main className="main-validation">
            <div className="bloc--icon"><ThumbUpAltIcon  aria-hidden="true" style={{ color: '#5BB286', fontSize:80}}/></div>
            <div className="bloc-yellow">
                <h2 className="bloc-title">Votre demande bien été envoyée à Nathalie Sims !</h2>
                <p>Vous recevrez une réponse dès que possible.</p>
            </div>
        </main>
    );
}

export default Validation;