import { JobActionTypes } from '../constants/action-fields'
import {jobApi} from '../api/Api'


export const getJobs =(offset,limit) =>{
    return async function(dispatch) {

    console.log("calling Api....")
    const relativePath = "/getSampleJdJSON"
    const headers = {
        'Content-Type': 'application/json'
      };
      const requestBody = {
       offset,
       limit
      };
    const response = await jobApi(headers).post(relativePath,requestBody)
    dispatch({type:JobActionTypes.GET_JOBS,payload:response?.data?.jdList})
    }
}