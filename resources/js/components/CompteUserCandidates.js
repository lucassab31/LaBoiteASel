import React, { useState } from "react";
import { useEffect } from "react";
import {Helmet} from "react-helmet";
import {useParams, Link, useNavigate} from "react-router-dom";
import Moment from 'react-moment';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CompteUserCandidates = () => {
    let navigate = useNavigate();

    require("../../../public/css/compteUser.css");

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
            posts : item.title}}))});
        }


    async function validateCandidature(id){
        await axios.get(
            API_URL + "posts/progress/" + id , { 
                headers: { 
                    Authorization: 'Bearer ' + window.sessionStorage.getItem('token') 
                } 
            }
        )
    }

    async function voirProfil(id){
        navigate("/utilisateur?id=" + id);
    }

    const LinkProfil = (item) =>{
       return <td><button className="button-blue" onClick={()=>{voirProfil(item.item.user.id)}}>voir le profil de {item.item.user.firstName} {item.item.user.lastName} </button></td>
    }
    
    if(resp !== undefined) {       
        return (
            <div id="annonces" className="bloc-red">
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <p role="status" className="visually-hidden"> La Boite à Sel - {title} </p>
                    <h3 className="panel-title"> Candidatures </h3>

                    <div className="list--tables">
                        {candidates.map(candidatesPost =>
                            {return (
                                <div className="table--wrapper">
                                    <h4>  {candidatesPost.posts}</h4>
                                    <table  className="table--candidates">
                                        <thead> 
                                            <tr>
                                                <th> Voir le profil </th>
                                                <th> Accepter la demande </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {candidatesPost.candidates.map(
                                                item => {return (
                                                    <tr>
                                                        <LinkProfil item={item}/>
                                                        <td><button className="button-blue" onClick={()=>{validateCandidature(item.id, candidatesPost.posts)}}>valider la candidature de {item.user.firstName} {item.user.lastName} </button></td>
                                                    </tr>
                                                )}
                                            )}
                                        </tbody>   
                                    </table>
                                </div>
                            )
                        }
                    )
                }
                </div>
            </div>
            )
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