import {fieldValues} from '../../constants/field-values';
import { GroupedCheckBox,CheckBox } from '../checkbox/CheckBox'; 
import {filterJobs} from '../../actions/JobActions'
import {useDispatch} from 'react-redux'
import {TextField} from '@mui/material'
import './filter.css'



export default  function Filter(){

    const dispatch = useDispatch()

    const dofilter=(filterKey)=>(event,value)=>{
        dispatch(filterJobs(filterKey,value))
    }

    const doCompanySearch=(event)=>{
        console.log("name",event.target.value)
        dispatch(filterJobs("companyName",event.target.value))
    }




    return(
        <div className='filter-component'>
            <div className='checkbox-grp'>
            {
                fieldValues.map(field =>
                    <div key={field.title}>
                         {field?.groupBy?<GroupedCheckBox filterKey={field?.filterKey} placeholder={field.title} options={field.options} onChange={dofilter}/>
                                    :<CheckBox isMultiple={field?.isMultiple} filterKey={field?.filterKey} placeholder={field.title} onChange={dofilter}options={field.options}/>}
                    </div>
            )
            }
            </div>
            <div className='text-field'>
                    <TextField id="outlined-basic" onChange={doCompanySearch} label="search company name"  variant="outlined" />
            </div>
        </div>
    )
}