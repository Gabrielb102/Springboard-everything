import axios from "axios";
import uuid from "uuid";
import { useState } from "react";

const useAxios = (endpoint) => {
    const [ responses, setResponses ] = useState([]);
    const getNew = async (item) => {

        let URL = endpoint;

        if (typeof(item) === 'string') {
            URL += item;
        }

        const response = await axios.get(URL);
        setResponses([...responses, {...response.data, id: uuid()}]);
    }

    return [ responses, getNew ];
}

export default useAxios;