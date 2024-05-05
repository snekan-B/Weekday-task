import JobCard from "../card/JobCard";
import Filter from "../filters/Filter";

export default function Home(){
    return(
        <div>
        <Filter/>
        <JobCard/>
        </div>
    )
}