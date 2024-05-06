import "./job-card.css";
import checked from "./assets/checked.png";
import thunder from "./assets/thunder.png";
import blr1 from "./assets/blrface1.jpeg";
import blr2 from "./assets/blrface2.jpeg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getJobs } from "../../actions/JobActions";
import { CircularProgress ,Snackbar} from "@mui/material";

/**
 * Job Card component
 */

export default function JobCard() {

  // actual filtered jobs in redux-state to render
  const jobs = useSelector((state) => state.Job.jobs);
  const [expandedCards, setExpandedCards] = useState([]);

  const [offset, setOffset] = useState(-20);

  // state for loader open/close
  const [loading, setLoading] = useState(false);
  // state for snackbar open/close
  const [open,setOpen] =useState(false)

  const dispatch = useDispatch();

  // Reference for a div , which was present in the last of this component.
  const observerTarget = useRef(null);

  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) => {
      const newExpandedCards = [...prev];
      newExpandedCards[index] = !newExpandedCards[index];
      return newExpandedCards;
    });
  };

  // Intersection observer used for infinite scrolling
  // If the ref isIntesecting (i.e) , If visible the fetch jobs will be tiggered
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchJobs();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  /**
   * use effect to fetch jobs when offset changes
   */
  useEffect(() => {
    if (offset >= 0) {
      dispatch(getJobs(offset, 20));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [offset]);


  /**
   * Use effect for snack bar open/close
   * Snack bar opens only if no jobs returned.
   */
  useEffect(()=>{
    if(jobs.length<=0) {
      setOpen(true)
    } else{
      setOpen(false)
    }
  },[jobs])

  
  const fetchJobs = () => {
    setLoading(true);
    setOffset((prevOffset) => prevOffset + 20);
  };


  return (
    <div className="card-grp">
      <div>
        {jobs ? (
          jobs.map((selector, index) => {
            const jobDescription = selector?.jobDetailsFromCompany || "";
            const isExpanded = expandedCards[index];
            const truncatedDescription = isExpanded
              ? jobDescription
              : jobDescription.slice(0, 460);
            return (
              <div key={index} className="card-component">
                <div className="company-component">
                  <img alt="sample" src={selector?.logoUrl} />
                  <div className="company">
                    {selector?.companyName != null && (
                      <div className="company-name">
                        {selector?.companyName}
                      </div>
                    )}
                    {selector?.jobRole != null && (
                      <div className="company-role">{selector?.jobRole}</div>
                    )}
                    {selector?.location != null && (
                      <p className="company-location">{selector?.location}</p>
                    )}
                  </div>
                </div>
                {selector?.minJdSalary != null && selector?.maxJdSalary && (
                  <div className="salary">
                    Estimated Salary : $ {selector?.minJdSalary}-{" "}
                    {selector?.maxJdSalary} LPA
                    <img
                      className="check-image"
                      src={checked}
                      alt="check-mark"
                    ></img>
                  </div>
                )}

                {selector?.jobDetailsFromCompany != null && (
                  <div className="about-company">
                    <h4>About Company:</h4>
                    <h5>About us</h5>
                    <p className="about-paragraph">
                      {truncatedDescription}
                      {!isExpanded && jobDescription.length > 150 && (
                        <button
                          className="readmore-button"
                          onClick={() => toggleCardExpansion(index)}
                        >
                          View Job
                        </button>
                      )}
                    </p>
                  </div>
                )}
                {selector?.minExp != null && (
                  <div className="experience">
                    <h5 className="min-experience">Minimum Experience</h5>
                    <div>{selector?.minExp} years</div>
                  </div>
                )}
                <div className="job-btn-grp">
                  <button className="apply-button">
                    <img
                      className="thunder-img"
                      src={thunder}
                      alt="thunder"
                    ></img>
                    Easy Apply
                  </button>
                  <br></br>
                  <button className="referal-button">
                    <img
                      className="blurred1"
                      src={blr1}
                      alt="blurred image"
                    ></img>
                    <img
                      className="blurred2"
                      src={blr2}
                      alt="blurred image"
                    ></img>
                    Unlock referal asks
                  </button>
                </div>
              </div>
            );
          })
        ) :(
          <div></div>
        )}
      </div>
      <div ref={observerTarget}></div>
      <div>{loading ? <CircularProgress /> : <div></div>}</div>
      <div> <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={()=>setOpen(false)}
        autoHideDuration={1000}
        open={open}
        message="No Results found!!"
      /></div>
    </div>
  );
}
