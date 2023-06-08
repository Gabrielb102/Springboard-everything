import uuid from "react-uuid";

const ContribsTopTen = ({receipts}) => {
    let topTen;
    if (receipts) {
        const ordReceipts = Object.keys(receipts).sort((a, b) => receipts[b]['totalContribs'] - receipts[a]['totalContribs']).slice(0,10);
        topTen = (
        <>
            <b>Top 10 Contributions</b>
            <ol>
                {ordReceipts.map(n => <li key={uuid()}>{n} : ${receipts[n]['totalContribs'].toLocaleString("en-US")} </li>)}
            </ol>
        </>
        ) 
    } else {
        topTen = ( <p>No Contributions Data</p> );
    }
    return(
        <div className="info">{ topTen }</div>
    ) 
}

export default ContribsTopTen;