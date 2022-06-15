import React from "react";
import css from "../../../public/css/home.css"

const Home = () => {
 
    return (
        <main>
        <div id="bloc1" className="bloc bloc-home bloc--bg-red bloc--2-columns">
            <div className="bloc-text">
                <h2 className="bloc-text-title"> La Boîte à Sel, qu'est ce que c'est ?</h2>
                <p> La Boite à Sel, c’est une association qui a pour objectif de créer de l’entraide entre nous, habitants d’un même quartier ou d’une même ville. </p>
                <p> Vous cherchez quelqu’un pour vous dépanner et garder vos enfants aujourd’hui ? Ou pour vous aider à porter vos courses ? Vous êtes prêts à donner de votre temps pour aider ceux qui habitent à côté de chez vous ?</p>
                <p> La Boîte à Sel est faite pour ça, inscrivez-vous et vous pourrez proposer et accepter des services. </p>
                <a className="button" href="#">Voir comment s'inscrire</a>
            </div>
            <div>
                <img alt="" src="../../../images/hands_accueil.webp"/>
            </div>
        </div>
         <div id="bloc2" className="bloc bloc-home bloc--bg-yellow bloc--2-columns">
            <div>
                <img alt="" src="../../../images/saliere_accueil.webp"/>
            </div>
            <div className="bloc-text">
                <h2 className="bloc-text-title"> Créer une dynamique d’entraide </h2>
                <p>La Boîte à Sel à pour ambition de créer une véritable dynamique d’entraide, c’est pour cette raison que nous souhaitons que chacun puisse bénéficier de l’aide de ses voisins et en proposer à son tour. </p>
                <p>Notre objectif n’est pas de concurrencer les entreprises mais de proposer une aide ponctuelle et mesurée sur des petits travaux. </p>
                <p>Vous obtiendrez des grains de sel à chaque service rendu, et en utiliserez à votre tour pour demander un service.</p>
                <a className="button" href="#">Découvrez les annonces</a>
            </div>
         </div>
         </main>
    );
}

export default Home;