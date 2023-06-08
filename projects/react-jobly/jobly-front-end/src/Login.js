import joblyApi from "./JoblyApi";
import { useHistory } from "react-router-dom";

const Login = ({setUser}) => {
    const history = useHistory();

    // I left this uncontrolled so that the password wouldn't be touched by the javascript, is that paranoid?
    let err = ''
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const token = await joblyApi.login(username, password);
        if (token) {
            localStorage.setItem('token', token);
            setUser(username);
            history.push(`/`);
        } else {
            err = 'Incorrect Username or Password';
        }
    }

    return (
        <div className="Login">
            {err}
            <form onSubmit={handleSubmit}>
                <h3>Welcome Back!</h3>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username"/>
                <label htmlFor="password">Password: </label>
                <input id="password" name="password"/>
                <button onClick={handleSubmit}>Log In</button>
            </form>
        </div>
    )
}

export default Login;