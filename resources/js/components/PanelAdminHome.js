import React, {Link, useEffect, useState} from "react";
import Helmet from "react-helmet";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';
  

const PanelAdminHome = () => {
    const API_URL = process.env.MIX_APP_URL +'api/';
    const title = "Administration du site - Accueil";
    const [infos, setInformations] = useState({
        lastests : 
        [{
            id : "",
            type : "",
            description : "",
            category : { title : ""},
        }],
        postsGraph : 
            {
                labels : [],
                datas : []
            }
    });
    require ("../../../public/css/panelAdmin.css");

    useEffect(()=>{
        fetchInformations();
    }, []);

    async function fetchInformations() {
        await axios.get(
            API_URL + "admin/stats/", 
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        )
        .then(
            resp=>
            {
                setInformations({
                    lastests : resp.data.data.lastestPosts,
                    postsGraph : 
                        {
                            labels : 
                            resp.data.data.postsGraph.map(
                                item => {return item.Date ? item.Date : ""}
                            ),
                            datas : 
                            {
                                created : resp.data.data.postsGraph.map(item =>  {return item.Created ? item.Created : "0"}),
                                progress : resp.data.data.postsGraph.map(item =>  {return item.Progress ? item.Progress : "0"}),
                                finished : resp.data.data.postsGraph.map(item =>  {return item.Finished ? item.Finished : "0"})
                            }
                            
                        }

                })
            }
        );
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = 
    {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Annonces et changements de statuts par date',
        },
        },
    };

    const labels = infos.postsGraph.labels ? infos.postsGraph.labels : [""];
    const created = infos.postsGraph.datas.created ? infos.postsGraph.datas.created : ["0"];
    const finished = infos.postsGraph.datas.finished ? infos.postsGraph.datas.finished : ["0"];
    const progress = infos.postsGraph.datas.progress ? infos.postsGraph.datas.progress : ["0"];

    const data = {
    labels,
    datasets: [
        {
            label: 'Nombres de posts crées à cette date',
            data: created,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Nombre de posts ayant reçu une réponse à cette date',
            data: progress,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Nombre de posts fermés à cette date',
            data: finished,
            borderColor: 'rgba(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
    };

    const Graph = () => {
        const [desc, setDesc] = useState(false);

        const InfosDesc = () => {
           const visibilityClass = desc === true ? "is-visible" : "visually-hidden";
            return (
            <div className={visibilityClass} id="desc">
                <p> Indication des changements de status des annonces par date.</p>
                <ul>
                {labels.map(
                    (item, i) => {
                        return (
                            <li key={i}> Le {translate(item)} il y avait : 
                                <ul>
                                    <li> {created[i]} annonces crées à cette date.</li>
                                    <li> {progress[i]} annonces dont le statut a été changé de "crée" à en "cours" à cette date. </li>
                                    <li> {finished[i]} annonces dont le statut a été changé de "en cours" à "finalisé" à cette date.</li>
                                </ul>
                            </li>
                        )
                    })
                } 
                </ul>
            </div> 
            );
        }

        function translate(item){
            let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
            return new Date(item).toLocaleDateString("fr-FR", options);
        }
        return (
            <div>
                <h2 id="title-infos"> Changements de status par date (mensuel) </h2>
                <Line aria-labelledby="title-infos" aria-describedby="desc" options={options} data={data}/>
                <button className="button-blue charts-btnDescription" onClick={()=>{setDesc(desc === true ? false : true)}}> {desc === false ? "Connaitre les informations de changements de status" : "Fermer la description des changements de status"} </button>
                <InfosDesc/>
            </div>
        );
    }

    return(
        <div>
            <Helmet> <title>{title}</title> </Helmet>
            <div>

            </div>
            <div className="bloc--2-2">
                <div className="bloc-bg--white bloc-panel">
                    <Graph/>
                </div>
                <div className="block--table bloc-panel">
                    <h3> Dernières annonces </h3>
                    <table>
                        <caption> Affichage des dix dernières annonces postées </caption>
                        <thead>
                            <tr>
                                <th scope="col">Catégorie</th>
                                <th scope="col">Description</th>
                                <th scope="col">Grains de sel</th>
                            </tr>
                        </thead>
                        <tbody>
                        {infos.lastests.map
                            (
                                item => ( 
                                    <tr key={item.id}>
                                        <td>{item.category.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.cost}</td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
       </div>
    )
}

export default PanelAdminHome;