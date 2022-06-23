import React, { useState } from "react";
import { useEffect } from "react";
import {Helmet} from "react-helmet";
import {useParams, Link} from "react-router-dom";
import Moment from 'react-moment';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CompteUserCandidates = () => {

    const API_URL = process.env.MIX_APP_URL + 'api/';

    const [resp, setResp] = useState([]);
    const [candidates, setCandidates] = useState([{
        candidates : [],
        posts : ''
    }]);
   

    useEffect(() => {
        fetchUser();
        console.log(candidates);
    }, []);

    useEffect(() => {
        console.log(candidates);
    }, [candidates]);


    let title = "Candidatures à mes annonces";

    async function fetchUser() {
        await axios.get(
            API_URL + "users/viewPosts", { 
                headers: { 
                    Authorization: 'Bearer ' + window.sessionStorage.getItem('token') 
                } 
            }
        ).then(resp => {console.log(resp.data.data),setResp(resp.data.data.posts), setCandidates(resp.data.data.posts.map(item=> {return {
            candidates : item.candidates,
            posts : item.id}}))});
        }


    async function validateCandidature(id, post){
        await axios.get(
            API_URL + "posts/progress/" + post , { 
                headers: { 
                    Authorization: 'Bearer ' + window.sessionStorage.getItem('token') 
                } 
            }
        );
    }
    
    if(resp !== undefined) {       
        return (
            <div id="annonces" className="bloc-red">
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                    <h3 className="panel-title"> Candidatures </h3>
                    <table>
                        <tr>
                            <td>
                                <a> Voir le profil </a>
                            </td>
                            <td>
                                <a> Accepter </a>
                            </td>
                        </tr>
                    </table>

                    <ul className="list-posts bloc-list--annonces">
                        {candidates.map(candidatesPost =>
                            {return (
                                <li> 
                                {candidatesPost.posts}
                                {candidatesPost.candidates.map(
                                    item => {return <button className="button-blue" onClick={()=>{validateCandidature(item.id, candidatesPost.posts)}}>valider candidature du profil n° {item.id} </button>}
                                )}
                                </li>)
                            }
                        )} 
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

export default CompteUserCandidates;