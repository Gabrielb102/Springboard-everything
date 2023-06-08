import JoblyApi from "./JoblyApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './resources/List.css';
import CListing from "./CListing";

const stockLogo = 'https://www.logolynx.com/images/logolynx/89/89e511869423c1bc0c47e64916c0b633.jpeg'

//this was originally one "List" Component 
//but there wasn't enough shared code to justify the complexity so I split it up
//However the stucture's so similar they still same the same css file

const CompList = () => {
    const [list, setList] = useState(["loading ..."]);
    const [n, setN] = useState(0);
    const [data, setData] = useState({});
    const [pageButtons, setPageButtons] = useState([]);

    const search = async (evt) => {
        evt.preventDefault();
        setN(0);
        const input = document.querySelector('input').value;
        if (input === '') {
            setData({});
        } else {
            setData({name : input});
        }
    }


    // discern which type of list it will be
    useEffect(() => {
        async function generateList(data) {

            // Fetch all companies, pagifies automatically on the front end
            const companies = await JoblyApi.getAllCompanies(data);

            // Generate page buttons to navigate list
            const buttons = [];
            for (let i = 0; i < companies.length/10; i++) {
                buttons.push(<button onClick={() => {setN(i)}}>{i + 1}</button>);
            }

            setPageButtons(buttons);

            // Generate JSX for page of companies
            const page = companies.slice(n * 10, (n * 10) + 10);
            setList(page.map(comp => {
                const path = `/companies/${comp.handle}`;
                return (
                <CListing comp={comp}/>)
            }))
        }
        generateList(data);
    }, [data, n])

    // return the page
    return (
        <>
            <h2 className="List-title">COMPANIES</h2>
            <form className="List-form" onSubmit={search}>
                <input name="searchbar" placeholder="Search"/>
                <button onClick={search}>Search</button>
            </form>
            <ul className="List">
                {list}
            </ul>
            {pageButtons}
        </> 
    )

}

export default CompList;