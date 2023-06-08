import axios from "axios";
import API_URL from "./config";

const BASE_URL = process.env.REACT_APP_BASE_URL || API_URL;

class BackendAPI {
    // the token for interactive with the API will be stored here.
    static token = localStorage.getItem('token') || '';

    static async request(endpoint, data = {}, method = "get") {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BackendAPI.token}` };
        const params = (method === "get") ? data : {};
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getAllUsers() {
        const res = await this.request(`users`);
        return res.users;
    }

    static async registerNew(firstName, lastName, username, password, email) {
        const res = await this.request('users', {firstName, lastName, username, password, email}, 'post');
        console.log('res: ', res);
        return res.token;
    }

    static async login(username, password) {
        try {
            const res = await this.request('users/login', {username, password}, 'post');
            return res.token;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async addFave(username, candidateId, year, candidateName, candidateOffice) {
        const res = await this.request('favorites', {username, candidateId, year, candidateName, candidateOffice}, 'post');
        return res;
    }

    static async getFaves(username) {
        const res = await this.request('favorites', {username});
        return res;
    }

    static async removeFave(username, candidateId, year) {
        const res = await this.request('favorites', {username, candidateId, year}, 'delete');
        return res;
    }

    static async checkFave(username, candidateId, year) {
        const res = await this.request('favorites/check', {username, candidateId, year});
        return res;
    }

}  

export default BackendAPI;