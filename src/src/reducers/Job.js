import {JobActionTypes} from '../constants/action-fields';


export const Job = (state={jobs:[],actualJobs:[],filter:{jobRole:[],minExp:[],location:[],minJdSalary:[],companyName:""}},{type,payload})=>{
    switch(type) {
        case JobActionTypes.GET_JOBS :{
            console.log("pay",payload)
            const actualJobs = [...state.actualJobs,...payload.actualJobs];
            const jobs = getFilteredJob(actualJobs,state.filter)
            return {...state,jobs:jobs,actualJobs}
        }
        case JobActionTypes.FILTER_JOBS :{
            const filterBy = payload.filterBy;
            const filterValue = getFormatFilterValues(filterBy,payload.filterValue);
            console.log("updated filter12",filterBy,filterValue)
            const filter = {...state.filter,[filterBy]:filterValue};
            console.log("updated filter",filter)
            const filterJobs=  getFilteredJob(state?.actualJobs,filter)
            console.log("filteredJobs",filterJobs)
            return {...state,jobs:filterJobs,filter:filter}
        }
        default : {
            return state;
        }
    }
}


const getFilteredJob = (jobs,filter) =>{
    console.log("hhh",filter)
    return jobs.filter(job =>{
        const roleCondition = filter.jobRole.length>0 ? job?.jobRole !=null && filter.jobRole.includes(job?.jobRole) :true;
        const expCondtion =  filter.minExp.length>0 ? job?.minExp !=null && filter.minExp.includes(job?.minExp) :true;
        const locationCondition = filter.location.length>0 ? job?.location !=null  && 
                                (filter.location.includes(job?.location) || (job?.location !== 'remote' && job?.location!=='hybrid')):true

        const salaryConditon = filter.minJdSalary.length>0 ? job?.minJdSalary !=null && filter.minJdSalary.includes(job?.minJdSalary) :true

        const companyNameCondition = filter.companyName.length >0? job?.companyName != null && job?.companyName.includes(filter.companyName):true

        console.log("roleCondition",roleCondition,"expCondtion",expCondtion,"locationCondition",locationCondition,"salaryConditon",salaryConditon,"com",companyNameCondition)
        return roleCondition && expCondtion && locationCondition && salaryConditon && companyNameCondition
    });
}


const getFormatFilterValues=(filterBy,filterValues) => {
    switch(filterBy) {
        case "minExp":{
            return Array.from(filterValues,Number);
        }
        case "jobRole" :{
            return filterValues.map((role)=>role?.name.toLowerCase());
        }
        case "location" :{
            return filterValues.map(location => location.toLowerCase())
        }
        
        default :{
            return filterValues;
        }
    }
}

