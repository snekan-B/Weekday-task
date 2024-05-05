import {JobActionTypes} from '../constants/action-fields';


export const Job = (state=[],{type,payload})=>{
    switch(type) {
        case JobActionTypes.GET_JOBS :{
            console.log("ion state",payload)
            return payload
        }
        default : {
            return state;
        }
    }
}