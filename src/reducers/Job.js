import { JobActionTypes } from "../constants/action-fields";

/**
 *  Reducer class for Job actions
 * @param {*} state - state for job reducers.
 * state :
 *      jobs -        jobs going to render (filtered jobs)
 *      actual jobs - jobs from api
 *      filter -      contains filter values selected in the checkbox
 * @param {*} payload - payload from actions.
 * @returns 
 */

export const Job = (
  state = {
    jobs: [],
    actualJobs: [],
    filter: {
      jobRole: [],
      minExp: [],
      location: [],
      minJdSalary: "",
      companyName: "",
    },
  },
  { type, payload }
) => {
  console.log("Action triggered",type)
  switch (type) {
    case JobActionTypes.GET_JOBS: {
      const actualJobs = [...state.actualJobs, ...payload.actualJobs];
      // Jobs will be filtered during get job action, if filtered is apply.
      const jobs = getFilteredJob(actualJobs, state.filter);
      return { ...state, jobs: jobs, actualJobs };
    }
    case JobActionTypes.FILTER_JOBS: {
      const filterBy = payload.filterBy;
      // Format the filter values from constant
      const filterValue = getFormatFilterValues(filterBy, payload.filterValue);
    
      // set the formated filter values 
      const filter = { ...state.filter, [filterBy]: filterValue };
      // Get the filtered jobs based on filter
      const filterJobs = getFilteredJob(state?.actualJobs, filter);
  
      return { ...state, jobs: filterJobs, filter: filter };
    }
    default: {
      return state;
    }
  }
};

const getFilteredJob = (jobs, filter) => {
  
  return jobs.filter((job) => {
    // role condition- Filters only ,if job role is present in filter value list , 
    // role value from api is not null and role value is present in selected list
    const roleCondition =
      filter.jobRole.length > 0
        ? job?.jobRole != null && filter.jobRole.includes(job?.jobRole)
        : true;

     // experience condition- Filters only,if minimum exp present in filter value list , 
    // minimum experience from api is not null and minimum value is present in selected list in checkbox
    const expCondtion =
      filter.minExp.length > 0
        ? job?.minExp != null && filter.minExp.includes(job?.minExp)
        : true;

    // locationCondition - Filters only , if location is present in filter value list , 
    // for remote and hybrid only hybrid and remote are returned. For in-office , location (delhi-ncr,chennai) is returned
    const locationCondition =
      filter.location.length > 0
        ? job?.location != null &&
          (filter.location.includes(job?.location) ||
            (filter.location.includes("in-office") &&
              job?.location !== "remote" &&
              job?.location !== "hybrid"))
        : true;

    // role condition- Filters the exp greater than actual selected value.
    const salaryConditon =
      filter.minJdSalary !== null && filter.minJdSalary.length > 0
        ? job?.minJdSalary != null &&
          parseInt(filter.minJdSalary.replace("L", "")) <= job?.minJdSalary
        : true;

    // filters the name of the company chose in the input.
    const companyNameCondition =
      filter.companyName.length > 0
        ? job?.companyName != null &&
          job?.companyName
            .toLowerCase()
            .includes(filter.companyName.toLowerCase())
        : true;

    return (
      roleCondition &&
      expCondtion &&
      locationCondition &&
      salaryConditon &&
      companyNameCondition
    );
  });
};

const getFormatFilterValues = (filterBy, filterValues) => {
  switch (filterBy) {
    case "minExp": {
      return Array.from(filterValues, Number);
    }
    case "jobRole": {
      return filterValues.map((role) => role?.name.toLowerCase());
    }
    case "location": {
      return filterValues.map((location) => location.toLowerCase());
    }

    default: {
      return filterValues;
    }
  }
};
