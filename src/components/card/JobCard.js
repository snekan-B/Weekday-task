import "./job-card.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { debounce } from "../util/Debounce";
import { getJobs } from "../../actions/JobActions";
import { CircularProgress } from "@mui/material";

export default function JobCard() {
  const jobs = useSelector((state) => state.Job.jobs);
  const [offset, setOffset] = useState(-20);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("reached!!!!!");
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

  useEffect(() => {
    if (offset >= 0) {
      dispatch(getJobs(offset, 20));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [offset]);

  const fetchJobs = () => {
    setLoading(true);
    setOffset((prevOffset) => prevOffset + 20);
  };

  return (
    <div className="card-grp">
      <div>
        {jobs ? (
          jobs.map((selector, index) => {
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
                  </div>
                )}

                {selector?.jobDetailsFromCompany != null && (
                  <div className="about-company">
                    <h4>About Company:</h4>
                    <h5>About us</h5>
                    <p>{selector?.jobDetailsFromCompany}</p>
                  </div>
                )}
                {selector?.minExp != null && (
                  <div className="experience">
                    <h5 className="min-experience">Minimum Experience</h5>
                    <div>{selector?.minExp} years</div>
                  </div>
                )}
                <div className="job-btn-grp">
                  <button className="apply-button">Easy Apply</button>
                  <br></br>
                  <button className="referal-button">
                    Unlock referal asks
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <div ref={observerTarget}></div>
      <div>{loading ? <CircularProgress /> : <div></div>}</div>
    </div>
  );
}
