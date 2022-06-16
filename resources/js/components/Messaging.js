import React from "react";
import css from "../../../public/css/messaging.css"

const Messaging = () => {

    return (
        <main>
            <h1> Ma messagerie </h1>
            <div id="bloc" className="bloc bloc-messaging bloc--1-3">
                <div className="bloc-chat">
                    <div className="bloc-profil"> 
                        <img className="bloc-profil__img" src="../../images/exemple-profile.png"></img>
                        <div className="bloc-profil__infos">
                            <p className="bloc-infos__name"> Nathalie Sims </p>
                            <p className="bloc-infos__last"> Mon dernier message </p>
                            <p className="bloc-infos__date"> 25/06/2034 10:34 </p>
                        </div>
                    </div>
                </div>
                <div className="bloc-messages"> 
                    <div className="bloc-messages__wrapper">
                        <div className="bloc-message bloc-message--send">
                            <p className="bloc-message__text"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.  
                            </p>
                            <p className="bloc-message__date"> 25/06/2034 10:34 </p>
                        </div>
                        <div className="bloc-message bloc-message--received">
                            <p className="bloc-message__text"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.  
                            </p>
                            <p className="bloc-message__date"> 25/06/2034 10:34 </p>
                        </div>
                        <div className="bloc-message bloc-message--send">
                            <p className="bloc-message__text"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.  
                            </p>
                            <p className="bloc-message__date"> 25/06/2034 10:34 </p>
                        </div>
                    </div>
                    <form className="bloc-messages__content bloc--bg-blue">
                    <label htmlFor="message"> Entrez votre message </label>
                    <textarea placeholder="Exemple : Bonjour..." id="message"/>
                    <button class="button button-white" type="submit"> Envoyer le message </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Messaging;
