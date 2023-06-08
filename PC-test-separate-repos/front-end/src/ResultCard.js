import "./static/ResultCard.css";
import { useNavigate } from "react-router-dom";

const ResultCard = ({data}) => {

    //Function to route to candidate page
    const navigate = useNavigate();
    
    function goToCandidatePage(candidateId) {
        navigate({ pathname: `/candidates/${candidateId}/none` })
    }

    // Generate Strings for Each office
    let office;
    if (data.office === "P") {
        office = "Presidential Candidate";
    }
    if (data.office === "H") {
        office = "Candidate for Representative";
    }
    if (data.office === "S") {
        office = "Candidate for Senator";
    }

    // Format Election Years
    let elections = '';
    for (let cycle of data.election_years) {
        elections = elections + ' ' + cycle;
    }

    // Format party colors
    let partyClass = "ResultCard-party";
    if (data.party === 'REP') {
        partyClass = partyClass + ' ' + "rep";
    }

    if (data.party === 'DEM') {
        partyClass = partyClass + ' ' + "dem";
    }

    return (
        <div onClick={() => goToCandidatePage(data.candidate_id)} className="ResultCard">
            <h5 className="ResultCard-name">{data.name}</h5>
            <p className="ResultCard-party"> {data.party}</p>
            <p className="ResultCard-office">{office}</p>
            <p className="ResultCard-years">Elections: {elections}</p>
        </div>
    )
}

export default ResultCard;
