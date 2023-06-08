import BackendAPI from "./BackendAPI";
import { useNavigate } from "react-router-dom";
import "./static/Login.css"

const Signup = ({setUser}) => {
    const navigate = useNavigate();

    // I left this uncontrolled so that the password wouldn't be touched by the javascript, is that paranoid?
    let err = ''
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const firstName = document.querySelector("#firstname").value;
        const lastName = document.querySelector("#lastname").value;
        const email = document.querySelector("#email").value;
        const username = document.querySelectorAll("#username")[1].value;
        const password = document.querySelectorAll("#password")[1].value;
        const token = await BackendAPI.registerNew(firstName, lastName, username, password, email);
        console.log('token: ', token);
        // write out the token creation, ^^ = placeholder
        if (token) {
            localStorage.setItem('token', token);
            setUser(username);
            navigate(`/`);
        } else {
            err = 'New user data not valid';
        }
    }

    return (
        <div className="Login">
            {err}
            <form onSubmit={handleSubmit}>
                <h3>Sign up! Get infomed!</h3>
                <label htmlFor="firstname">First Name: </label>
                <input id="firstname" name="firstname"/>
                <label htmlFor="lastname">Last Name: </label>
                <input id="lastname" name="lastname"/>
                <label htmlFor="email">Email: </label>
                <input id="email" name="email"/>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username"/>
                <label htmlFor="password">Password: </label>
                <input id="password" name="password"/>
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}
export default Signup;