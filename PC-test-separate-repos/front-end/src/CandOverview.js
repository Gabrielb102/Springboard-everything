import uuid from "react-uuid";
import "./static/CandOverview.css";

const CandidateOverview = ({fd, yr, cms}) => {

    const yearFinData = fd.find(entry => entry.cycle === yr);
    const netContributions = yearFinData ? yearFinData.net_contributions.toLocaleString("en-US") : "No Information Found";
    const relevantCommittees = cms.filter(committee => committee.cycles.includes(yr));

    return (
        <>
            <h3>Overview for {yr} Election Cycle</h3>
            <p>Net Contributions: ${netContributions}</p>
            <div className="info">
                <b>Relevant Committees</b>
                <ul>
                    {relevantCommittees.map(comm => <li key={uuid()}>{comm.name}</li>)}
                </ul>
            </div>
        </>
    )
}

export default CandidateOverview;