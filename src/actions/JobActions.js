import { JobActionTypes } from '../constants/action-fields'
import {jobApi} from '../api/Api'


export const getJobs =(offset,limit) =>{
    console.log("offset in APi",offset,"limit",limit)
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
    console.log("hiiiiii",response?.data?.jdList)
    dispatch({type:JobActionTypes.GET_JOBS,payload:{actualJobs:response?.data?.jdList}})
    }
}

export const filterJobs=(filterBy,filterValue)=> {
    return ({type:JobActionTypes.FILTER_JOBS,payload:{filterBy,filterValue}})
}