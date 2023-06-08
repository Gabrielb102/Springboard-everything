import "./static/Home.css"
import SearchForm from "./SearchForm";
import ResultsList from "./ResultsList.js";

const Home = ({ results, setResults }) => {
    
    return (
        <div id="Home">  
            <SearchForm setResults={setResults}/>
            <ResultsList searchResults={results}/>
        </div>
    )
}

export default Home;