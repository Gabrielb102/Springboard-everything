import { Link } from "react-router-dom";
import stockLogo from "./resources/logoLink";
import './resources/Listing.css'

const CListing = ({comp}) => {
    const path = `/companies/${comp.handle}`
    return (
        <li>
            <Link to={path}>
                <div className="Listing">
                    <img src={comp.logoUrl || stockLogo}/>
                    <h5>{comp.name}</h5>        
                </div>
            </Link>
        </li>
    )
}

export default CListing;