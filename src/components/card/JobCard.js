import "./job-card.css";
import checked from "./assets/checked.png";
import thunder from "./assets/thunder.png";
import blr1 from "./assets/blrface1.jpeg";
import blr2 from "./assets/blrface2.jpeg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { debounce } from "../util/Debounce";
import { getJobs } from "../../actions/JobActions";
import { CircularProgress } from "@mui/material";

export default function JobCard() {
  const jobs = useSelector((state) => state.Job.jobs);
  const [expandedCards, setExpandedCards] = useState([]);
  const [offset, setOffset] = useState(-20);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const observerTarget = useRef(null);
  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) => {
      const newExpandedCards = [...prev];
      // If the card is not expanded, expand it
      if (!newExpandedCards[index]) {
        newExpandedCards[index] = true;
      } else {
        // If the card is expanded, collapse it
        newExpandedCards[index] = false;
      }
      return newExpandedCards;
    });
  };
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
                      {isExpanded && (
                        <button
                          className="readmore-button"
                          onClick={() => toggleCardExpansion(index)}
                        >
                          View less
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
        ) : (
          <div></div>
        )}
      </div>
      <div ref={observerTarget}></div>
      <div>{loading ? <CircularProgress /> : <div></div>}</div>
    </div>
  );
}
