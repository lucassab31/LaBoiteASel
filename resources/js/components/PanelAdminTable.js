import React, { useEffect } from "react";
import NavigationPanelAdmin from './NavigationPanelAdmin';
import PanelAdminHome from './PanelAdminHome';


const PanelAdminTable = () => {
    require ("../../../public/css/panelAdmin.css");
    const API_URL = process.env.MIX_APP_URL +'api/';

    async function fetchInformations() {
        await axios.get(
            API_URL + "stats/", 
            {
                headers: {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')}
            }
        ).then(resp => {console.log(resp.data)});
    }

    useEffect(()=>{
        fetchInformations();
    }, [])

    return(
        <main>
                <table>
                        <caption> Services échangés et reçus par les utilisateurs et utilisatrices </caption>
                        <thead>
                            <tr>
                                <th scope="col">utilisateur/utilisatrice</th>
                                <th scope="col">service reçu</th>
                                <th scope="col">service donné</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        {/*infos.lastests.map
                            (
                                item => ( 
                                    <tr key={item.id}>
                                        <td>{item.category.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.cost}</td>
                                    </tr>
                                )
                            )
                                */}
                        </tbody>
                    </table>
        </main>
    )
}

export default PanelAdminTable;