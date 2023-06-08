import { useEffect, useState } from "react";
import loadSpinner from "./static/Wedges-3s-200px.gif"
import ContribsTopTen from "./ContribsTopTen";
import ContribChart from "./ContribChart";
import DBFrontendAPI from "./DBFrontendAPI";

const CandidateContribs = ({committees, year }) => {

    const [ receipts, setReceipts ] = useState();

    useEffect(() => {
        async function loadCommData() {
            const relevantCommittees = committees.filter(committee => committee.cycles.includes(year));
            // Loading Top 20 donors/committee, for now
            const receiptsPromises = relevantCommittees.map(comm => DBFrontendAPI.getCommContributions(comm.committee_id, year));
            const receiptsResolved = await Promise.all(receiptsPromises);
            const recs = {};
            for (let recArr of receiptsResolved) {
                for (let rec of recArr) {
                    if (!recs[rec.contributor_name]) {
                        recs[rec.contributor_name] = {
                            totalContribs : rec.contribution_receipt_amount,
                            occupation : rec.contributor_occupation
                        };
                    } else {
                        recs[rec.contributor_name]['totalContribs'] += rec.contribution_receipt_amount;
                    }
                }
            };
            setReceipts(recs);
        }
        if (committees && year) loadCommData();
    }, [year]);

    const topTen = receipts ? <ContribsTopTen receipts={receipts} /> :  <img src={loadSpinner} /> ;

    const chart = receipts ? <ContribChart receipts={receipts} /> : <img src={loadSpinner} />;

    return (
        <>
            <div className="Contrib">
                { topTen }
            </div>
            <div className="Contrib">
                { chart }
            </div>
        </>
    );
}

export default CandidateContribs;