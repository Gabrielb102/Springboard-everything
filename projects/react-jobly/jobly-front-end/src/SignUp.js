import { useHistory } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import "./resources/form.css";

const SignUp = ({setUser}) => {
    const history = useHistory();

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const firstName = document.querySelector("#first_name").value;
        const lastName = document.querySelector("#last_name").value;
        const email = document.querySelector("#email").value;
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const token = await JoblyApi.register(username, password, firstName, lastName, email);
        if (token) {
            localStorage.setItem('token', token);
            setUser(username);
            history.push(`/profile`);
        }
    }

    return (
        <form>
            <h3>Sign Up! Get a Life! Be Somebody!</h3>
            <label htmlFor="first_name">First Name: </label>
            <input id="first_name" name="first_name"/>
            <label htmlFor="last_name">Last Name: </label>
            <input id="last_name" name="last_name"/>
            <label htmlFor="email">Email: </label>
            <input id="email" name="email"/>
            <label htmlFor="username">Username: </label>
            <input id="username" name="username"/>
            <label htmlFor="password">Password: </label>
            <input id="password" name="password"/>
            <button onClick={handleSubmit}>Register</button>
        </form>
    )
}

export default SignUp;
