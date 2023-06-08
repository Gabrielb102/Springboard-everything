import DBFrontendAPI from "./DBFrontendAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import loadSpinner from "./static/Wedges-3s-200px.gif"
import CandidateHeader from "./CandHeader";
import CandidateOverview from "./CandOverview";
import CandidateContribs from "./CandContribs";

import "./static/CandidatePage.css"


const CandidatePage = () => {

    const candidateId = useParams().id;
    const yrParam = useParams().year;
    const initYr = yrParam === 'none' ?  '' : yrParam ;

    const [ year, setYear ] = useState(initYr);
    const [ candidate, setCandidate ] = useState();
    const [ finData, setFinData ] = useState();
    const [ committees, setCommittees ] = useState();

    // Request 1: to get name, election years, office, and party 
    // ^^ simpler to periodically store this data 
    // in the cache than to pass it around local or sessionStorage or state
    useEffect(() => {
        async function loadCandData() {
            setCandidate(await DBFrontendAPI.getCandData(candidateId));
            setFinData(await DBFrontendAPI.getFinData(candidateId));
            setCommittees(await DBFrontendAPI.getCommittees(candidateId));
        }
        loadCandData();
    }, []);
    
    // Load the page
    const header = candidate ? <CandidateHeader candidate={candidate} year={year} setYear={setYear}/> : <img src={loadSpinner}/>;

    // Load overall financial data
    const totals = committees && finData && year ? <CandidateOverview fd={finData} yr={year} cms={committees}/> : '';

    // Load Contribution Data
    const contribs = committees && year ? <CandidateContribs committees={committees} year={year}/> : '';

    return (
        <div className="CandidatePage">
            { header }
            { totals }
            { contribs }
        </div>
    )
}

export default CandidatePage;