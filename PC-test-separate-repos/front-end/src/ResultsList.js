import ResultCard from "./ResultCard.js";
import uuid from "react-uuid";
import "./static/ResultsList.css"

const ResultsList = ({searchResults}) => {

    const list = []

    for (let result of searchResults) {
        const card = <ResultCard key={uuid()} data={result} idx={searchResults.indexOf(result)}/>
        list.push(card);
    }

    const welcomeMessage = (
        <>
            <h3>Welcome to Pollitically Correct!</h3> 
            <p>Look up the biggest contributors to your favorite or least favorite political candidate's campaign, depending on the year.</p>
            <p>If you are confused about any aspects of the election process or rules, find resources on the left of the page.</p>
            <p>For more information on American elections, please visit fec.gov.</p>
        </>
        );
    const display = list.length ? <ul>{ list }</ul> : welcomeMessage ;

    return (
        <div id="ResultsList">
            { display }
        </div>
    )
}

export default ResultsList;