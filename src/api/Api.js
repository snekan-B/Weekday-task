import axios from 'axios';

/**
 * Api class for declaring apis
 */

/**
 * Job api Declaration
 * @param {*} headers - headers
 * @returns 
 */
export const jobApi =(headers) =>{
    return axios.create({
        baseURL:"https://api.weekday.technology/adhoc",
        headers
    })
}