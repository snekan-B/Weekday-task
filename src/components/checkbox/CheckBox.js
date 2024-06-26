import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


/**
 * Normal checkBox component.
 */
export function CheckBox({placeholder,options,onChange,filterKey,isMultiple}) {
    return(
        <Autocomplete
        multiple={isMultiple}
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option}
        onChange={onChange(filterKey)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
          />
        )}
      />
    )
}

/**
 * CheckBox compoent with group. 
 */

export function GroupedCheckBox({placeholder,options,onChange,filterKey}) {
    return(
        <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
        onChange={onChange(filterKey)}
        getOptionLabel={(option) => option?.name}
        groupBy={(option) =>option?.group}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
          />
        )}
      />
    )
}