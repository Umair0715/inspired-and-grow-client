import axios from "axios";

export const baseURL = 'http://13.233.206.176:4400';
// export const baseURL = 'http://localhost:4400';



const Axios = axios.create({
    baseURL : `${baseURL}/api` ,
});

export default Axios;