import React, {Link, useEffect, useState} from "react";
import Helmet from "react-helmet";


const PanelAdminHome = () => {
    const API_URL = process.env.MIX_APP_URL +'api/';
    const title = "Administration du site - Accueil"
    const [infos, setInformations] = useState({
        lastests : 
        [{
            id : "",
            type : "",
            description : "",
            category : { title : ""},
        }],
        postGrap : 
        {

        }
    });
    require ("../../../public/css/panelAdmin.css");

    useEffect(()=>{
        fetchInformations();
    }, []);

    async function fetchInformations() {
        await axios.get(
            API_URL + "stats/", 
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        )
        .then(
            resp=>{
                (console.log(resp),
                setInformations({
                    lastests : resp.data.data.lastestPosts,
                    postsGraph : resp.data.data.postsGraph
                }))
            }
        );
    }

    return(
        <div>
            <Helmet> <title>{title}</title> </Helmet>
            <div>

            </div>
            <div className="bloc--2-2">
                <div className="bloc-bg--white bloc-panel">

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