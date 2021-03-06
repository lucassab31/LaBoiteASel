import React, { useEffect, useState } from "react";


const PanelAdminTable = () => {
    require ("../../../public/css/panelAdmin.css");
    const API_URL = process.env.MIX_APP_URL +'api/';
    const [dates, setDates] = useState({
        dateDebut : "",
        dateFin : ""
    });

    const [values, setValues] = useState({
        first : "",
        last : "",
    })

    const [results, setResults] = useState([{
        name : "",
        posts_count : "",
        posts_maker_count : "",
        total : "",
    }])

    async function getInformations(e) {
        e.preventDefault();

        //if(dates) {console.log(dates)};
        let max = 0; 
        let min = 0;
        let listValues = [];

        await axios.post(
            API_URL + "admin/stats/balance", 
            dates,
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        ).then(resp => {
            listValues = resp.data.data.map(item => { return parseInt(item.posts_count) + parseInt(item.posts_maker_count) }),
            max = resp.data.data.filter(item => { return Math.max(...listValues) == item.posts_count + item.posts_maker_count})[0],
            min = resp.data.data.filter(item => { return Math.min(...listValues) == item.posts_count + item.posts_maker_count})[0],
            setResults(
                resp.data.data.map(
                    item => {
                        return {
                            name : item.firstName + " " + item.lastName,
                            posts_count : item.posts_count,
                            posts_maker_count : item.posts_maker_count,
                            total : parseInt(item.posts_count) + parseInt(item.posts_maker_count),
                        }
                    }
                )
            ),
            setValues(
                {
                    first : max,
                    last : min,
                })
            }
        );
        if(results){
            //console.log(values);
        }
    }

    async function downloadInformations(e) {
        e.preventDefault();

        await axios.post(
            API_URL + "admin/stats/export", 
            dates,
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        ).then(resp => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.csv');
            document.body.appendChild(link);
            link.click();
            }
        );
    }

    /*useEffect(()=>{
        getInformations();
    }, [])*/

    const Table = () => {
        if(results.length > 1){
            return(
                <>
                    <table>
                            <caption> Services ??chang??s et re??us par les utilisateurs et utilisatrices </caption>
                            <thead>
                                <tr>
                                    <th scope="col">utilisateur/utilisatrice</th>
                                    <th scope="col">service re??u</th>
                                    <th scope="col">service donn??</th>
                                    <th scope="col">total de services rendus et donn??s</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((item, i)=>
                                    {
                                        return (
                                            <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.posts_count}</td>
                                            <td>{item.posts_maker_count}</td>
                                            <td>{item.total}</td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                    </table>
                    <button className="button-blue" onClick={downloadInformations}>Exporter les donn??es</button>
                </>
            )
        }
        else 
        {
            return <p> Remplissez les champs dates pour voir le tableau des 
                    activit??s des utilisateurs au cours de cette p??riode </p>
        }
    }

    const InfosValues = () => {
        if(values.first !== "") {
            return (
            <>
            <p> Membre ayant le plus contribu?? : {values.first.firstName + " " + values.first.lastName} </p>
            <p> Membre ayant le moins contribu?? : {values.last.firstName + " " + values.last.lastName} </p>
            </> 
            ) 
        }
        else {
            return <p> Remplissez les champs dates pour voir appara??tre les utilisateurs 
                    ayant le plus et le moins particip?? au cours de la p??riode.</p>
        };
    }

    return(
        <main>
            <div className="bloc--3-1">
                <div className="bloc-panel">
                    <h3> Statistiques des membres </h3>
                    <form className="bloc--3-columns" onSubmit={getInformations}>
                        <div className="field--wrapper">
                            <label htmlFor="dateDebut">Date de d??but</label>
                            <input 
                                aria-required="true" 
                                data-name="dateDebut" 
                                value={dates.dateDebut} onChange={(e) => (setDates({...dates, dateDebut : e.target.value}))}
                                id="dateDebut" 
                                type="date"
                                placeholder="Date de d??but"
                            />
                        </div>
                        <div className="field--wrapper">
                            <label htmlFor="dateFin">Date de fin</label>
                            <input 
                                aria-required="true" 
                                data-name="dateFin" 
                                value={dates.dateFin} onChange={(e) => (setDates({...dates, dateFin : e.target.value}))}
                                id="dateFin" 
                                type="date"
                                placeholder="Date de fin"
                            />
                        </div>
                        <button className="button-blue" type="submit"> Envoyer </button>
                    </form>
                    <Table/>
                </div>
                <div className="bloc-panel">
                    <h3> Membre ayant le plus et le moins d'activit?? sur le site.</h3>
                    <InfosValues/>
                </div>
            </div>
        </main>
    )
}

export default PanelAdminTable;