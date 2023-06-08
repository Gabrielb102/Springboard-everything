import { Link } from 'react-router-dom';
import "./resources/JobCard.css"
import CListing from './CListing';
import JoblyApi from './JoblyApi';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

// title, salary, equity, company handle

// used state value tunneling since context was losing value after one rerender
const JobCard = ({job, comp, x }) => {

    const [applied, setApplied] = useState(false);
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token);
    const apply = async () => {
        await JoblyApi.apply(decode.username, job.id)
        setApplied(true);
    }

    const [applyButton, setApplyButton] = useState(<button id="apply-btn" onClick={apply}>Apply Now</button>)

    useEffect(() => {
        async function check () {
            const applied = await JoblyApi.checkIfapplied(decode.username, job.id)
            console.log('applied: ', applied);
            if (applied) {
                setApplyButton(<div id='apply-btn'>Applied</div>)
            }
        }
        check();
    }, [applied])

    return (
        <>
            <div className="JobCard-background" onClick={x}>
            </div>
            <div className="JobCard">
                <h2>{job.title}</h2>
                <button id="JobCard-x" onClick={x}>&#215;</button>
                <p>Salary: {job.salary}</p>
                <p>Equity: {job.equity}</p>
                <CListing comp={comp} />
                {applyButton}
            </div>
        </>
    )
}

export default JobCard;