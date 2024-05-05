import {JobActionTypes} from '../constants/action-fields';


export const Job = (state={jobs:[],filterBy:"",filterValue:""},{type,payload})=>{
    switch(type) {
        case JobActionTypes.GET_JOBS :{
            console.log("ion state",payload)
            return {...state,jobs:payload.jobs}
        }
        case JobActionTypes.FILTER_JOBS :{
            if(payload.filterValue === 'object') {
                payload.filterValue = payload.filterValue.map(value => value.name);
            }

            console.log("Going to filter...",payload.filterValue)
            const filterJobs=  getFilteredJob(payload.jobs,payload.filterBy,payload.filterValue)
            console.log("filteredJobs",filterJobs)
            return {...state,jobs:filterJobs}
        }
        default : {
            return state;
        }
    }
}


const getFilteredJob = (jobs,filterBy,filterValue) =>{
    filterValue = getCorrectFilterValues(filterBy,filterValue)
    return jobs.filter(job =>{
        return (
            job.hasOwnProperty(filterBy) && job[filterBy] != null && filterValue.includes(job[filterBy])
        )
    });
}


const getCorrectFilterValues=(filterBy,filterValues) => {
    switch(filterBy) {
        case "minExp":{
            return Array.from(filterValues,Number);
        }
        default :{
            return filterValues;
        }
    }
}

