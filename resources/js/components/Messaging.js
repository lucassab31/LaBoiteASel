import React from "react";
import { BrowserRouter, Link, Routes, Route, Outlet } from "react-router-dom";
import {Helmet} from "react-helmet";
const laptop = 1280;

const Messaging = () => {
    require("../../../public/css/messaging.css");
    
    //mobile version 
    if(window.innerWidth < laptop) {

        const PeopleList = () => {
            const title = "Mes contacts";
            return (
                <main>
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                    <h2> Ma messagerie </h2>
                    <div id="bloc" className="bloc bloc-contacts bloc--bg-white">
                        <div className="bloc-chat">
                            <div className="bloc-profil"> 
                                <img className="bloc-profil__img" alt="" src="../../images/exemple-profile.png"></img>
                                <div className="bloc-profil__infos">
                                    <p className="bloc-infos__name"> Nathalie Sims </p>
                                    <p className="bloc-infos__date"> 25/06/2034 10:34 </p>
                                    <p className="bloc-infos__last"> Mon dernier message... </p>
                                    <Link className="button button-blue" to="messages" aria-label="Voir les messages échangés avec Nathalie Sims"> voir les messages </Link>
                                </div>
                            </div>
                            <div className="bloc-profil"> 
                                <img className="bloc-profil__img" src="../../images/exemple-profile.png"></img>
                                <div className="bloc-profil__infos">
                                    <p className="bloc-infos__name"> Nathalie Sims </p>
                                    <p className="bloc-infos__date"> 25/06/2034 10:34 </p>
                                    <p className="bloc-infos__last"> Mon dernier message </p>
                                    <Link className="button button-blue" to="messages" aria-label="Voir les messages échangés avec Nathalie Sims"> voir les messages </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )
        }

        const MessageList = () => {
            const title = "Mes messages";

            return (
                <main>
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <p role="status" class="visually-hidden"> La Boite à Sel - {title} </p>

                    <div className="bloc-messages"> 
                        <div className="bloc-messages__wrapper">
                        <Link to="/messaging" className="button-blue bloc-messages__contactlist">Voir mes contacts</Link>
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
                            <div class="bloc-messages__wrapper-textarea">
                                <label htmlFor="message"> Entrez votre message </label>
                                <textarea placeholder="Exemple : Bonjour..." id="message"/>
                            </div>
                            <button class="button button-white" type="submit"> Envoyer le message </button>
                        </form>
                    </div>
                </main>
            )
        }

        return (
            <>
            <Routes>
                <Route index element={<PeopleList />} />
                <Route path="messages"  element={<MessageList />} />
                <Route path="/messaging" element={<PeopleList />}/>
            </Routes>

            <Outlet />
            </>
        );

    }
    //desktop version
    else {
        const title = "Ma messagerie";
        return (
            <main>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <p role="status" class="visually-hidden"> La Boite à Sel - {title} </p>
                <h2> Ma messagerie </h2>
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
                            <div class="bloc-messages__wrapper-textarea">
                                <label htmlFor="message"> Entrez votre message </label>
                                <textarea placeholder="Exemple : Bonjour..." id="message"/>
                            </div>
                            <button class="button button-white" type="submit"> Envoyer le message </button>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}

export default Messaging;
