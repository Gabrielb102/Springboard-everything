import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = localStorage.getItem('token') || '';

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      console.log(params);
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // COMPANY METHODS

  // Get A list of all companies
  static async getAllCompanies(data = {}) {
    let res = await this.request(`companies`, data);
    return res.companies;
  }

  // Get details on a company by handle. 
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Post a new Company - admin only
  static async postCompany( handle, name, description, numEmployees, logoUrl ) {
    let res = await this.request(`companies`, {handle, name, description, numEmployees, logoUrl}, 'post');
    return res.company;
  }

  // Edit a Company - admin only
  static async editCompany(handle, changeObject) {
    let res = await this.request(`companies/${handle}`, changeObject, 'post');
    return res.company;
  }

  // Delete a Company - admin only
  static async deleteCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, 'delete');
    if (res.deleted) {
      return true;
    }
    return false;
  }

  // JOBS METHODS

  // Get a list of all Jobs 
  static async getAllJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  // Get details on a Job by handle. 
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  // Post a new Job - admin only
  static async postJob( title, salary, equity, companyHandle ) {
    let res = await this.request(`jobs`, {title, salary, equity, companyHandle}, 'post');
    return res.job;
  }

  // Edit a Job - admin only
  static async editJob(id, changeObject) {
    let res = await this.request(`jobs/${id}`, changeObject, 'post');
    return res.job;
  }

  // Delete a Job - admin only
  static async deleteJob(id) {
    let res = await this.request(`jobs/${id}`, {}, 'delete');
    if (res.deleted) {
      return true;
    }
    return false;
  }

  // AUTH ROUTES

  // Login to account - for /login
  static async login(username, password) {
    let res = await this.request(`auth/token`, {username, password}, 'post');
    return res.token;
  }

  // Register new user - for /signup
  static async register( username, password, firstName, lastName, email ) {
    const data = { username, password, firstName, lastName, email }
    const res = await this.request(`auth/register`, data, 'post');
    return res.token;
  }

  // USER ROUTES

  // Update User
  static async update({ firstName, lastName, email, password }) {
    const decoded = jwt_decode(this.token);
    const data = { firstName, lastName, email, password }
    const res = await this.request(`users/${decoded.username}`, data, 'patch');
    if (res.user) {
      return true;
    }
    return false;
  }

  // Get particular User
  static async getUser(username) {
    const data = { username }
    const res = await this.request(`users/${username}`, data, 'get');
    return res.user;
  }

  // Apply for a job, like I need to
  static async apply(username, jobId) {
    const data = {}
    const res = await this.request(`users/${username}/jobs/${jobId}`, data, 'post');
    return res.applied === jobId;
  }

  static async checkIfapplied(username, jobId) {
    const data = {}
    const res = await this.request(`jobs/applied/${jobId}/${username}`, data, 'get');
    return res.result;
  }


  // obviously, you'll add a lot here ...
}

export default JoblyApi;