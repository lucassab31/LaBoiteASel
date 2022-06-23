import React, { useState } from "react";
import { useEffect } from "react";
import {Helmet} from "react-helmet";
import {useParams, Link} from "react-router-dom";
import Moment from 'react-moment';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CompteUserPosts = () => {

    const API_URL = process.env.MIX_APP_URL + 'api/';

    const [resp, setResp] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    let title = "Mes annonces";

    async function fetchUser() {
        await axios.get(
            API_URL + "users/viewPosts", { 
                headers: { 
                    Authorization: 'Bearer ' + window.sessionStorage.getItem('token') 
                } 
            }
        ).then(resp => {setResp(resp.data.data.posts)});
        
    }

    const ButtonComponent = (compId) => {
        if (compId.compId)
        {
            return <Link to={"/annonce?id="+ compId.compId} className="button-blue"> Voir mon annonce </Link>
        }
        else {
            return null;
        }
    }
    
    if(resp !== undefined) {       
        return (
            <div id="annonces" className="bloc-red">
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                    <h3 className="panel-title"> Mes annonces </h3>
                    <ul className="list-posts bloc-list--annonces">
                        {resp.map(item => {
                            return(
                                <li key={item.id} className="bloc--bg-white">
                                <div className="list-posts--wrapper">
                                    <h4> {item.title} </h4>
                                    <p> {item.description} </p>
                                    {(() => {
                                        if (item.datetimePost) {
                                            return (
                                                <div className="list-posts--date">
                                                    <CalendarMonthIcon style={{ color: '#5BB286', fontSize:30}}/>
                                                <p> 
                                                    <Moment format="DD/MM/YYYY">
                                                        {item.datetimePost}
                                                    </Moment>
                                                </p>
                                            </div>
                                            )
                                        }
                                    })()}
                                </div>
                                    <ButtonComponent compId={item.id ? item.id : "0"}/>
                                </li>
                            )
                        })}
                    </ul>
            </div>
        );
    } 
    else {
        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                <div className="bloc-white">
                    <p> Vous n'avez aucune annonce en cours </p>
                </div>
            </div>
        );
    }

}

export default CompteUserPosts;