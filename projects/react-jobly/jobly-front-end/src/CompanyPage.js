import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JListing from "./JListing";
import JoblyApi from "./JoblyApi";
import './resources/CompanyPage.css';

const CompanyPage = () => {
    const {handle} = useParams();
    const [company, setCompany] = useState({
        handle,
        name : undefined,
        num_employees : undefined,
        description : undefined,
        logoUrl : undefined,
        jobs : []
    })

    useEffect(() => {
        async function fetch(handle) {
            const comp = await JoblyApi.getCompany(handle)
            console.log(comp);
            setCompany(comp);
        }
        fetch(company.handle);
    }, [])

    return (
        <div className="CompanyPage">
            <img className="CompanyPage-image" src={company.logoUrl || "https://www.logolynx.com/images/logolynx/89/89e511869423c1bc0c47e64916c0b633.jpeg"}/>
            <h1>{company.name || "loading..."}</h1>
            <b>{company.numEmployees || "loading..."} Employees</b>
            <p>{company.description || "loading..."}</p>
            {company.jobs.length ? <b>More Jobs by Employer</b> : null}
            <ul className="List">
                {company.jobs.map(job => <JListing job={job} comp={company} />)}
            </ul>
        </div>
    )
}

export default CompanyPage;