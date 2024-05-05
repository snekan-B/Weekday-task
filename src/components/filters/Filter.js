import {fieldValues} from '../../constants/field-values';
import { GroupedCheckBox,CheckBox } from '../checkbox/CheckBox'; 
import './filter.css'



export default  function Filter(){
    return(
        <div className='filter-component'>
            {
                fieldValues.map(field =>
                    <div key={field.title}>
                         {field?.groupBy?<GroupedCheckBox placeholder={field.title} options={field.options}/>:<CheckBox placeholder={field.title} options={field.options}/>}
                    </div>
            )
            }
        </div>
    )
}