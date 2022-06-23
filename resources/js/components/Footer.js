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
                    <a href="https://fr-fr.facebook.com/"><FacebookIcon aria-hidden="true" focusable="false" className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}>  </FacebookIcon> <span className="visually-hidden"> Page Facebook de l'association la boite à sel</span></a>
                    <a href="mailto:laboiteaseladmin@example.com"><EmailIcon aria-hidden="true" focusable="false" className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}>  </EmailIcon> <span className="visually-hidden"> Email de la l'association la boite à sel</span></a>
                    <a href="https://www.youtube.com/?hl=FR"><YouTubeIcon aria-hidden="true" focusable="false" className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50 }}> </YouTubeIcon> <span className="visually-hidden"> Page Youtube de l'association la boite à sel</span> </a>
                    <a href="https://twitter.com/home?lang=fr"><TwitterIcon aria-hidden="true" focusable="false" className="reseauxSociaux__icon" style={{ color: 'white', fontSize:50}}> </TwitterIcon> <span className="visually-hidden"> Twitter de l'association la boite à sel</span> </a>
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
