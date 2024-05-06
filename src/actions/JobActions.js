import { JobActionTypes } from '../constants/action-fields'
import {jobApi} from '../api/Api'

/**
 * Redux action for job Actions
 */

/**
 * Action for get jobs from api
 * dispatch the action after retrival
 * @param {*} offset - offset
 * @param {*} limit  - limit
 */

export const getJobs =(offset,limit) =>{
    return async function(dispatch) {

    const relativePath = "/getSampleJdJSON"
    const headers = {
        'Content-Type': 'application/json'
      };
      const requestBody = {
       offset,
       limit
      };
    const response = await jobApi(headers).post(relativePath,requestBody)
    console.log("------Api call is succeeded-----")
    dispatch({type:JobActionTypes.GET_JOBS,payload:{actualJobs:response?.data?.jdList}})
    }
}

/**
 * Filter action for filtering the job based on filter values selected in the checkbox
 * @param {*} filterBy -> Which filter
 * @param {*} filterValue  -> list of filter values
 * @returns 
 */
export const filterJobs=(filterBy,filterValue)=> {
    return ({type:JobActionTypes.FILTER_JOBS,payload:{filterBy,filterValue}})
}