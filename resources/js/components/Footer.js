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
                    <a href="https://fr-fr.facebook.com/"><FacebookIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> <span className="visually-hidden">Lien vers la page Facebook de l' association</span> </FacebookIcon></a>
                    <a href="mailto:laboiteaseladmin@example.com"><EmailIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> <span className="visually-hidden"> Email de la l'association</span> </EmailIcon></a>
                    <a href="https://www.youtube.com/?hl=FR"><YouTubeIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> <span className="visually-hidden"> Lien vers la page Youtube de l' association</span> </YouTubeIcon></a>
                    <a href="https://twitter.com/home?lang=fr"><TwitterIcon className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50}}> <span className="visually-hidden"> Lien vers la page Twitter de l' association</span> </TwitterIcon></a>
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
