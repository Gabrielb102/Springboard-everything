import stockLogo from "./resources/logoLink";
import './resources/Listing.css'
import { useState } from "react";
import JobCard from "./JobCard";

const JListing = ({job, comp, username}) => {

    const [jobCard, setJobCard] = useState();

    const showCard = (job, comp) => {
        const x = () => {
            setJobCard('');
        }
        setJobCard(<JobCard job={job} comp={comp} x={x}/>)
    }

    return (
        <>
            {jobCard}
            <li className="Listing" onClick={() => showCard(job,comp)}>
                <img src={comp.logoUrl || stockLogo}/>
                <b>{job.title}</b>
                <p>{comp.name}</p>
            </li>    
        </>
    )
}

export default JListing;