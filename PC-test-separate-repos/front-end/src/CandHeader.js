import { useEffect, useState } from "react";
import BackendAPI from "./BackendAPI";
import jwtDecode from "jwt-decode";
import FlashMessage from "react-flash-message";

const CandidateHeader = ({candidate, year, setYear}) => {
    
    const [ favorites, setFavorites ] = useState([]);
    const [ favButton, setFavButton ] = useState();
    const [ flash, setFlash ] = useState('');

    const officeDes = {
        P : 'PRESIDENT',
        H : 'HOUSE',
        S : 'SENATE'
    };
    
    // Election nav bar
    let elections = [];
    for (let cycle of candidate.election_years) {
    
        let match = (cycle === year) ? true : false;
    
        const id = `yr${cycle}`;

        function selectYear() {
            setYear(cycle);
            const yr = document.querySelector(`#${id}`);
            const current = document.querySelector('.current');
            yr.classList.toggle('current');
            if (current) current.classList.toggle('current');
        }

        elections.push(<li key={cycle} id={id} className={match ? 'current' : ''} onClick={selectYear}>{cycle}</li>);
    }

    const token = localStorage.getItem('token');
    const username = token ? jwtDecode(token).username : null;
    const notFavd = <button id="faveButton" onClick={fav} className="CandidatePage-favorite">&#9734;</button>;
    const favd = <button id="faveButton" onClick={unFav} className="CandidatePage-favorite">&#9733;</button>;
    if (favorites) console.log("favorites: ", favorites);

    async function fav() {
        if (!username) {
            setFlash(
                <FlashMessage duration={5000} persistOnHover={true}>
                    <div id="CandidatePage-flash"><p>Sign in or sign up to favorite queries!</p></div>
                </FlashMessage>)
            return;
        }
        const added = await BackendAPI.addFave(username, candidate.candidate_id, year, candidate.name, candidate.office);
        if (favButton !== favd) setFavButton(favd);
    }    

    async function unFav() {
        const removed = await BackendAPI.removeFave(username, candidate.candidate_id, year);
        if (favButton !== notFavd) setFavButton(notFavd);
    }    

    useEffect(() => {
        async function checkIfFave (candidate, year) {
            const token = localStorage.getItem('token');
            let isFavorite = false;
            if (token) {
                const user = jwtDecode(token);
                setFavorites(await BackendAPI.getFaves(user.username));
                isFavorite = favorites.find(favorite => favorite.candidate_id === candidate.candidate_id && favorite.year === year);
            }
            setFavButton(isFavorite ? favd : notFavd);
        } checkIfFave(candidate, year);
    }, [year]);

    return (      
        <div id="CandPage-Header">        
            <h1 className="CandidatePage-name">{candidate.name}'S CAMPAIGNS FOR {officeDes[candidate.office]}</h1>
            <div id="CandidatePage-list"><ul className="CandidatePage-years">{elections}</ul> {favButton}{flash}</div>
            
        </div>
    )    
}

export default CandidateHeader;

