import {fieldValues} from '../../constants/field-values';
import { GroupedCheckBox,CheckBox } from '../checkbox/CheckBox'; 
import {filterJobs} from '../../actions/JobActions'
import {useDispatch,useSelector} from 'react-redux'
import {TextField} from '@mui/material'
import './filter.css'



export default  function Filter(){

    const jobs = useSelector(state=>state.Job.jobs)
    const dispatch = useDispatch()

    const dofilter=(filterKey)=>(event,value)=>{
        dispatch(filterJobs(jobs,filterKey,value))
    }




    return(
        <div className='filter-component'>
            <div className='checkbox-grp'>
            {
                fieldValues.map(field =>
                    <div key={field.title}>
                         {field?.groupBy?<GroupedCheckBox filterKey={field?.filterKey} placeholder={field.title} options={field.options} onChange={dofilter}/>
                                    :<CheckBox filterKey={field?.filterKey} placeholder={field.title} onChange={dofilter}options={field.options}/>}
                    </div>
            )
            }
            </div>
            <div className='text-field'>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
        </div>
    )
}