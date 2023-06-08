import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    localStorage.clear()
    history.push('/');

    return null
}

export default Logout;