import axios from "axios";

// export const baseURL = 'http://13.232.233.207:4400';

export const baseURL = 'http://localhost:4400';

const Axios = axios.create({
    baseURL : `${baseURL}/api` ,
});

export default Axios;