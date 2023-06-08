import BackendAPI from "./BackendAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "react-flash-message";
import "./static/Login.css"

const Login = ({setUser}) => {
    const navigate = useNavigate();
    const [ flash, setFlash ] = useState('');

    // I left this uncontrolled so that the password wouldn't be touched by the javascript, is that paranoid?
    let err = ''
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const token = await BackendAPI.login(username, password);
        console.log('token: ', token);
        if (token) {
            localStorage.setItem('token', token);
            setUser(username);
            navigate(`/`);
        } else {
            setFlash(
                <FlashMessage duration={5000} persistOnHover={true}>
                    <div id="Login-flash"><p>Incorrect username or password</p></div>
                </FlashMessage>
                );
        }
    }

    return (
        <div className="Login">
            {err}
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                { flash }
                <label htmlFor="username">Username: </label>
                <input id="username" name="username"/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password"/>
                <button onClick={handleSubmit}>Log In</button>
            </form>
        </div>
    )
}
export default Login;