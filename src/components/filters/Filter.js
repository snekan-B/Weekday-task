import { fieldValues } from "../../constants/field-values";
import { GroupedCheckBox, CheckBox } from "../checkbox/CheckBox";
import { filterJobs } from "../../actions/JobActions";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { debounce } from "../util/Debounce";
import "./filter.css";


/**
 * Filter component
 */
export default function Filter() {
  const dispatch = useDispatch();

  const dofilter = (filterKey) => (event, value) => {
    dispatch(filterJobs(filterKey, value));
  };

  /**
   * Function for search company name
   * Used debounce to trigger state update
   * Avoid state update for each input value change.
   */
  const doCompanySearch = debounce((event) => {
    dispatch(filterJobs("companyName", event.target.value))
  },1000
)

  return (
    <div className="filter-component">
      <div className="checkbox-grp">
        {fieldValues.map((field) => (
          <div className="filter-box" key={field.title}>
            {field?.groupBy ? (
              <GroupedCheckBox
                filterKey={field?.filterKey}
                placeholder={field.title}
                options={field.options}
                onChange={dofilter}
              />
            ) : (
              <CheckBox
                isMultiple={field?.isMultiple}
                filterKey={field?.filterKey}
                placeholder={field.title}
                onChange={dofilter}
                options={field.options}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-field">
        <TextField
          id="outlined-basic"
          onChange={doCompanySearch}
          label="search company name"
          variant="outlined"
        />
      </div>
    </div>
  );
}
