import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import JoblyApi from "./JoblyApi";

const Profile = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const [ formData, setFormData ] = useState({ 
        firstName: '', 
        lastName: '',
        email: '', 
        password: ''});

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        await JoblyApi.update(formData);
        history.push('/')
    }

    useEffect(() => {
        async function getUserData(username) {
            const {firstName, lastName, email} = await JoblyApi.getUser(decoded.username);
            setFormData({firstName, lastName, email});
        }
        getUserData(decoded.username);
    }, [])

    return (
        <>
            <h2>EDIT PROFILE</h2>
            <form>
                <label htmlFor="firstName">First Name: </label>
                <input name="firstName" value={formData.firstName} onChange={handleChange}/>
                <label htmlFor="lastName">Last Name: </label>
                <input name="lastName" value={formData.lastName} onChange={handleChange}/>
                <label htmlFor="email">Email: </label>
                <input name="email" value={formData.email} onChange={handleChange}/>
                <label htmlFor="password">Enter Password: </label>
                <input name="password" value={formData.password} onChange={handleChange}/>
                <button onClick={handleSubmit}>Register</button>
            </form>
        </>
    )
}

export default Profile;