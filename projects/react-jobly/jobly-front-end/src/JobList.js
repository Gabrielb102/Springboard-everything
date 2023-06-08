import JoblyApi from "./JoblyApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './resources/List.css';
import JListing from "./JListing";
import JobCard from "./JobCard";

const stockLogo = 'https://www.logolynx.com/images/logolynx/89/89e511869423c1bc0c47e64916c0b633.jpeg'

const List = ({type, username}) => {
    const [list, setList] = useState("loading ...");
    const [n, setN] = useState(0);
    const [pageButtons, setPageButtons] = useState([]);

    useEffect(() => {
        async function generateList() {

            // fetch all jobs, pagifies automatically
            const jobs = await JoblyApi.getAllJobs();

            // Generate page buttons to navigate list
            const buttons = [];
            for (let i = 0; i < jobs.length/10; i++) {
                buttons.push(<button onClick={() => {setN(i)}}>{i + 1}</button>);
            }

            setPageButtons(buttons);

            // Paginate and get company info as well
            const page = jobs.slice(n * 10, (n * 10) + 10);
            const jobsCompanies = await Promise.all(page.map((job) => {
                async function loadComp(job) {
                    const comp = await JoblyApi.getCompany(job.companyHandle);
                    return {job, comp}
                }
                return loadComp(job);
            }))

            // Generate JSX and change list state
            setList(jobsCompanies.map(({job, comp}) => {
                console.log(comp);
                return (
                    <JListing job={job} comp={comp} />
                )
            }))       
        }
        generateList();
    }, [n, type])

    // return the page
    return (
        <>
            <h2 className="List-title">{type.toUpperCase()}</h2>
            <ul className="List">
                {list}
            </ul>
            {pageButtons}
        </> 
    )
}

export default List;