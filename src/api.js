import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "";
  // = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
      //What the heck does this mean?
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. */

  static async getCompanies(nameLike) {
    let res = await this.request("companies/", { nameLike });
    return res.companies;
  }

  /** Get all jobs. */

  static async getJobs(title) {
    let res = await this.request("jobs/", { title });
    return res.jobs;
  }

  /** Login a user */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }
  /** Signs up a user */
  static async signUp(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Updates a user  */
  static async updateUser(data, username) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
  /** get user information from API with username argument
   * returns user object like { username, firstName, lastName, isAdmin, jobs }
   */
  static async getUser(user) {
    let res = await this.request(`users/${user}`);
    return res.user;
  }


  /** Apply user to job  */
  static async applyToJob(user, jobId) {
    let res = await this.request(`users/${user}/jobs/${jobId}`, {},"post");
    return res;
  }
}

export default JoblyApi;
