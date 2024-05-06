import JobCard from "../card/JobCard";
import Filter from "../filters/Filter";

/**
 * Home component for App.
 */
export default function Home(){
    return(
        <div>
        <Filter/>
        <JobCard/>
        </div>
    )
}