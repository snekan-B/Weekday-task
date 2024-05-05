import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function CheckBox({placeholder,options}) {
    return(
        <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
          />
        )}
      />
    )
}


export function GroupedCheckBox({placeholder,options}) {
    return(
        <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
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