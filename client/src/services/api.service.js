import axios from "axios";
import { TokenService } from "./token.service";

const ApiService = {
  init(baseURL = "http://localhost:9000") {
    axios.defaults.baseURL = baseURL;
  },
  setHeader() {
    axios.defaults.headers.common["x-auth-token"] = `${TokenService.getToken()}`;
  },
  removeHeader() {
    axios.defaults.headers.common["x-auth-token"] = {};
  },
  get(resource) {
    if (TokenService.getToken()) {
      this.setHeader();
    }
    return axios.get(resource);
  },
  async getByUrl(url, config) {
    return await axios.get(url, config);
  },

  async post(resource, data) {
    return await axios.post(resource, data);
  },
  put(resource, data) {
    return axios.put(resource, data);
  },
  delete(resource) {
    return axios.delete(resource);
  },
  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
  }
  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   **/
};

export default ApiService;
