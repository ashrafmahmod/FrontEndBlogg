import axios from "axios";
const request = axios.create({
  // baseURL: "http://localhost:8000", // local host
  baseURL: "https://bloggeryoussef-production.up.railway.app/", // railway server
});

export default request;
