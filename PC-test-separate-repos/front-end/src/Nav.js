import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <Link className="Nav-Link" to="/">HOME</Link>
            <Link className="Nav-Link" to="/favorites">FAVORITES</Link>
            <Link className="Nav-Link" to="/">{log}</Link>
            <Link className="Nav-Link" to="/">Register</Link>
        </nav>
    )
}