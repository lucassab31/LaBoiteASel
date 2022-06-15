import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <footer>
            <div>
                <div id="reseauxSociaux">
                    <FacebookIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> <span className="visually-hidden"> Lien vers la page Facebook de l' association</span> </FacebookIcon>
                    <EmailIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> <span className="visually-hidden"> Lien vers la page Facebook de l' association</span> </EmailIcon>
                    <YouTubeIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> <span className="visually-hidden"> Lien vers la page Facebook de l' association</span> </YouTubeIcon>
                    <TwitterIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50}}> <span className="visually-hidden"> Lien vers la page Facebook de l' association</span> </TwitterIcon>
                </div>
            </div>


            <p>Tout droits réservés © 2022 La Boîte à Sel, inc.</p>
            <div id="rgpd">
                <a href="#">Mentions Légales</a>
                <span> | </span>
                <a href="#">Politique de confidentialité</a>
            </div>
        </footer>
    );
}

export default Footer;
