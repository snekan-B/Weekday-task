import axios from 'axios';

export const jobApi =(headers) =>{
    return axios.create({
        baseURL:"https://api.weekday.technology/adhoc",
        headers
    })
}