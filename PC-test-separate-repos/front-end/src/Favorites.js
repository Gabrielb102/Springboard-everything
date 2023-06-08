import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackendAPI from "./BackendAPI";

const Favorites = () => {
    const user = jwtDecode(localStorage.getItem('token'));
    const [ favsList, setFavsList ] = useState();

    function makeOfficeLbl(office) {
        if (office === 'H') return 'HOUSE';
        if (office === 'S') return 'SENATE';
        if (office === 'P') return 'PRESIDENT';
    }

    useEffect(() => {
        async function loadFavs() {
            const favorites = await BackendAPI.getFaves(user.username);
            setFavsList(favorites.map(fav => {
                const yrParam = fav.year ? fav.year : 'none' ;
                const address = (`/candidates/${fav.candidate_id}/${yrParam}`)
                return (
                    <li>
                        <Link to={address}>{fav.candidate_name}'S {fav.year} RUN FOR {makeOfficeLbl(fav.candidate_office)}</Link>
                    </li>
                )
            }));
        } loadFavs();
    }, []);

    return (
        <ul>Favorites
            {favsList}
        </ul>
    )
}

export default Favorites;